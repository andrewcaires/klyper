import sucrase from "@rollup/plugin-sucrase";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import dts from "unplugin-dts/rollup";

const rootDir = dirname(fileURLToPath(import.meta.url));
const packagesDir = join(rootDir, "packages");

const packages = readdirSync(packagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {

    const packageName = entry.name;
    const packageDir = join(packagesDir, packageName);

    if (
      existsSync(join(packageDir, "package.json")) &&
      existsSync(join(packageDir, "src", "index.ts")) &&
      existsSync(join(packageDir, "tsconfig.json"))
    ) {

      const manifestPath = join(packageDir, "package.json");
      const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

      return {
        dir: packageDir,
        manifest,
        name: manifest.name,
      };
    }

    return null;
  })
  .filter(Boolean);

const packagesByName = new Map(packages.map((pkg) => [pkg.name, pkg]));

const orderedPackages = [];
const visitedPackages = new Set();

function createBanner(manifest) {

  const author =
    typeof manifest.author === "string"
      ? manifest.author
      : manifest.author?.name ?? "";

  return `/*!
 * ${manifest.name} v${manifest.version}
 * ${manifest.description}
 * (c) ${new Date().getFullYear()} ${author}
 * @license: ${manifest.license}
 */`;
}

function visitPackage(pkg) {

  if (visitedPackages.has(pkg.name)) {

    return;
  }

  visitedPackages.add(pkg.name);

  Object.keys(pkg.manifest.dependencies ?? {})
    .filter((dependencyName) => packagesByName.has(dependencyName))
    .forEach((dependencyName) => {
      visitPackage(packagesByName.get(dependencyName));
    });

  orderedPackages.push(pkg);
}

packages.forEach(visitPackage);

export default orderedPackages.map((pkg) => {

  const dependencyNames = Object.keys(pkg.manifest.dependencies ?? {});
  const banner = createBanner(pkg.manifest);

  return {
    input: join(pkg.dir, "src", "index.ts"),
    external: dependencyNames,
    plugins: [
      sucrase({
        transforms: ["typescript"]
      }),
      dts({
        root: pkg.dir,
        tsconfigPath: join(pkg.dir, "tsconfig.json"),
        entryRoot: "src",
        outDir: "dist",
        beforeWriteFile(filePath, content) {

          return {
            filePath,
            content: `${banner}\n${content}`
          };
        }
      })
    ],
    output: [
      {
        file: join(pkg.dir, "dist", "index.js"),
        format: "esm",
        banner
      },
      {
        file: join(pkg.dir, "dist", "index.cjs"),
        format: "cjs",
        exports: "named",
        banner
      }
    ]
  };
});

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const blacklist = require('./blacklist.json');

const DEPENDENCY_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies'
];

module.exports = audit;

function audit() {
  const packages = getPackages();
  packages.forEach(auditPackage);
  console.log(
    chalk.dim('audited ') +
    chalk.bold.green(packages.length) +
    chalk.dim(' packages')
  );
}

function auditPackage(pkg) {
  DEPENDENCY_FIELDS.forEach(function (field) {
    const dependencies = pkg.content[field];

    if (!dependencies) {
      return;
    }

    blacklist.forEach(function (dependency) {
      if (Object.prototype.hasOwnProperty.call(dependencies, dependency)) {
        console.log(
          chalk.bold.red('Malicious dependency detected') +
          '\n   Package: ' +
          chalk.bold.red(dependency) +
          '\n   File: ' +
          chalk.yellow(pkg.file) +
          '\n   For more information, visit ' +
          chalk.underline.cyan('https://github.com/jshanson7/npm-audit')
        );
      }
    });
  });
}

function getPackages(fromDir) {
  if (!fromDir) {
    fromDir = __dirname;
  }

  if (fromDir === '/') {
    return [];
  }

  const nodeModulesPackages = getPackagesDownward(path.join(fromDir, 'node_modules'));
  const nextPackagesAbove = getPackages(path.dirname(fromDir));
  const nextPackages = nodeModulesPackages.concat(nextPackagesAbove);

  const pkg = readPackage(path.join(fromDir, 'package.json'));

  if (pkg) {
    return [pkg].concat(nextPackages);
  }

  return nextPackages;
}

function getPackagesDownward(fromDir) {
  const isDirectory = (
    fs.existsSync(fromDir) &&
    fs.statSync(fromDir).isDirectory()
  );

  if (!isDirectory) {
    return [];
  }

  const children = fs.readdirSync(fromDir);
  const childPaths = children.map(function (child) {
    return path.join(fromDir, child);
  });

  const packagesByChild = childPaths.map(getPackagesDownward);
  const childPackages = Array.prototype.concat.apply([], packagesByChild);
  const pkg = readPackage(path.join(fromDir, 'package.json'));

  if (pkg) {
    return [pkg].concat(childPackages);
  }

  return childPackages;
}

function readPackage(packageFile) {
  let packageContent;

  try {
    packageContent = require(packageFile);
  } catch (error) {}

  if (packageContent) {
    return {
      content: packageContent,
      file: packageFile
    };
  }

  return null;
}

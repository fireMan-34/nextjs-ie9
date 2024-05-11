try {
  const { execSync } = require('child_process');
  const chalk = require('chalk');

  const root = process.cwd();

  execSync('pwsh.exe --Command \"if (Test-Path ./.next) { Remove-Item -Path ./.next -Recurse -Force }\" ', { cwd: root, stdio: [process.stdin, process.stdout, process.stderr] });
  execSync("yarn cross-env NODE_ENV=preview && yarn nodemon --config ./preview.nodemon.json", { cwd: root, stdio: [process.stdin, process.stdout, process.stderr] });

} catch (error) {
  console.log(`catcher ${chalk.red(__filename)} error`);
  console.error(error);
  process.exit(1)
} finally {
  console.log(chalk.blue('next12 ie9+'), 'support is running');
}


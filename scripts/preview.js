
try {
  const { join } = require('path');
  const { execSync } = require('child_process');
  const { loadEnvConfig, } = require('@next/env');

  loadEnvConfig(join(__dirname, './preview'));

  const root = process.cwd();

  execSync("yarn nodemon --config ./preview.nodemon.json", { cwd: root, stdio: [process.stdin, process.stdout, process.stderr] });

} catch (error) {
  console.log(`catcher ${'__filename'} error`);
  console.error(error);
  process.exit(1)
} finally {
  console.log('next12 ie9+', 'support is running');
}


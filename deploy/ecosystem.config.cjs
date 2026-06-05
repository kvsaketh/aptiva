// PM2 process config. Usage (from the app dir):
//   pm2 start deploy/ecosystem.config.cjs
//   pm2 save && pm2 startup     # restart on reboot
module.exports = {
  apps: [
    {
      name: 'aptiva',
      script: 'dist/boot.js',
      cwd: __dirname + '/..',
      instances: 1,
      exec_mode: 'fork',
      // env comes from the .env file (loaded via dotenv in the app); PORT here
      // is a fallback in case .env omits it.
      env: { NODE_ENV: 'production', PORT: '3000' },
      max_memory_restart: '600M',
      autorestart: true,
      time: true,
    },
  ],
}

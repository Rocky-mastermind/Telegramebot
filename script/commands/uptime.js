module.exports = {
  name: 'uptime',
  author: 'ArYAN',
  version: '0.0.2',
  description: 'Displays detailed bot uptime with system info.',
  usage: 'uptime',
  category: 'UTILITY',
  async xyz({ chat }) {
    const os = require('os');

    const uptimeInSeconds = process.uptime();
    const seconds = Math.floor(uptimeInSeconds % 60);
    const minutes = Math.floor((uptimeInSeconds / 60) % 60);
    const hours = Math.floor((uptimeInSeconds / (60 * 60)) % 24);
    const days = Math.floor(uptimeInSeconds / (60 * 60 * 24));

    const formatTime = (value, unit) => `${value} ${unit}${value !== 1 ? 's' : ''}`;

    const cpuModel = os.cpus()[0].model;
    const cpuCores = os.cpus().length;
    const totalMemMB = (os.totalmem() / 1024 / 1024).toFixed(2);
    const freeMemMB = (os.freemem() / 1024 / 1024).toFixed(2);
    const usedMemMB = (totalMemMB - freeMemMB).toFixed(2);
    const platform = os.platform();
    const nodeVersion = process.version;
    const loadAvg = os.loadavg().map(avg => avg.toFixed(2)).join(', ');

    const uptimeMessage =
`🤖 Bot Uptime Report 🤖

⏳ Uptime:
- ${formatTime(days, 'day')}
- ${formatTime(hours, 'hour')}
- ${formatTime(minutes, 'minute')}
- ${formatTime(seconds, 'second')}

💻 System Info:
- CPU: ${cpuModel} (${cpuCores} cores)
- Load Average: ${loadAvg}
- OS Platform: ${platform}
- Node.js Version: ${nodeVersion}

📦 Memory:
- Total: ${totalMemMB} MB
- Used: ${usedMemMB} MB
- Free: ${freeMemMB} MB

🚀 Status: Running smoothly ✅`;

    await chat.reply(uptimeMessage);
  }
};

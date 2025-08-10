const { alldown } = require('aryan-videos-downloader');

module.exports = {
  name: "downloader",
  aliases: [],
  prefix: false,
  admin: false,
  vip: false,
  author: "ArYAN",
  version: "0.0.2",
  description: "Auto-detect URL and download video.",
  
  async xyz({ chat, msg }) { 
    const text = msg.text || "";
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const match = text.match(urlRegex);
    if (!match) return;
    const inputLink = match[0];
    const waitMsg = await chat.reply('⏳ Processing your link...');
    try {
      const apis = await alldown(inputLink);
      if (!apis || !apis.data || !apis.data.high || !apis.data.title) {
        throw new Error("Invalid response from downloader API.");
      }
      const { high, title } = apis.data;
      await chat.sendVideo(
        { 
          video: high,
          caption: `🎬 *Title:* ${title}`,
          parse_mode: 'Markdown',
        },
        { 
          reply_to_message_id: msg.message_id
        }
      );
    } catch (error) {
      console.error('Downloader error:', error.message);
      await chat.reply('❌ Could not download this link. Please try another.');
    } finally {
      if (waitMsg?.message_id) {
        await chat.xyz(waitMsg);
      }
    }
  },
};

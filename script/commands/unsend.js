module.exports = {
  name: 'unsend',
  aliases: ['uns', 'u'],
  prefix: true,
  admin: false,
  vip: false,
  author: 'ArYAN',
  version: '1.0.1',

  async xyz({ chat, msg, bot, chatId }) {
    if (!msg.reply_to_message) {
      return chat.reply('Please reply to one of my messages to unsend it.');
    }

    if (msg.reply_to_message.from.id !== bot.botInfo.id) {
      return chat.reply('I can only unsend my own messages.');
    }

    const messageToDeleteId = msg.reply_to_message.message_id;

    try {
      await bot.deleteMessage(chatId, messageToDeleteId);
      await bot.deleteMessage(chatId, msg.message_id).catch(() => {});
    } catch (error) {
      if (error.message.includes('MESSAGE_CANT_BE_DELETED')) {
        await chat.reply('I cannot delete this message. It might be too old, or I might not have permission.');
      } else if (error.message.includes('MESSAGE_NOT_FOUND')) {
        await chat.reply('That message was not found. It may already be deleted.');
      } else {
        await chat.reply(`Error while trying to unsend: ${error.message}`);
      }
    }
  }
};

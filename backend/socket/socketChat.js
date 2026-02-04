const Chat = require('../models/chatschema');

module.exports = (io) => {
  io.on('connection', (socket) => {
    // Join a room for this user (by phone)
    socket.on('join', (userPhone) => {
      socket.join(userPhone);
    });

    // Start or get chat between two users
    socket.on('startChat', async ({ user1, user2 }, callback) => {
      let chat = await Chat.findOne({ users: { $all: [user1, user2] } });
      if (!chat) {
        chat = new Chat({ users: [user1, user2], messages: [], unreadCount: { [user1]: 0, [user2]: 0 } });
        await chat.save();
      }
      callback({ chatId: chat._id });
    });

    // Get chat list for a user
    socket.on('getChatList', async (userPhone, callback) => {
      const chats = await Chat.find({ users: userPhone }).sort({ 'lastMessage.timestamp': -1 });
      const chatList = chats.map(chat => {
        const otherUser = chat.users.find(u => u !== userPhone);
        return {
          _id: chat._id,
          users: chat.users,
          otherUserName: otherUser, // TODO: Join with user collection for name if needed
          lastMessage: chat.lastMessage,
          unreadCount: chat.unreadCount.get(userPhone) || 0
        };
      });
      callback(chatList);
    });

    // Get messages for a chat
    socket.on('getMessages', async (chatId, callback) => {
      const chat = await Chat.findById(chatId);
      callback(chat ? chat.messages : []);
    });

    // Send a message
    socket.on('sendMessage', async (msg, callback) => {
      // msg: { chatId, sender, receiver, text }
      const chat = await Chat.findById(msg.chatId);
      if (!chat) return;
      const message = {
        sender: msg.sender,
        receiver: msg.receiver,
        text: msg.text,
        timestamp: new Date(),
        status: 'sent'
      };
      chat.messages.push(message);
      chat.lastMessage = {
        text: msg.text,
        timestamp: message.timestamp,
        sender: msg.sender,
        status: 'sent'
      };
      chat.unreadCount.set(msg.receiver, (chat.unreadCount.get(msg.receiver) || 0) + 1);
      await chat.save();
      // Emit to receiver
      io.to(msg.receiver).emit('receiveMessage', { ...message, chatId: msg.chatId });
      // Optionally, emit to sender for confirmation
      callback(message);
    });

    // Mark messages as read
    socket.on('markAsRead', async ({ chatId, userPhone }) => {
      const chat = await Chat.findById(chatId);
      if (!chat) return;
      chat.messages.forEach(msg => {
        if (msg.receiver === userPhone && msg.status !== 'read') {
          msg.status = 'read';
        }
      });
      chat.unreadCount.set(userPhone, 0);
      await chat.save();
    });

    // Get unread badge count
    socket.on('getUnreadCount', async (userPhone, callback) => {
      const chats = await Chat.find({ users: userPhone });
      const count = chats.filter(chat => (chat.unreadCount.get(userPhone) || 0) > 0).length;
      callback(count);
    });
  });
};
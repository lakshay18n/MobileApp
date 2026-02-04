
// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // ⬅️ Needed for socket.io
const { Server } = require('socket.io')
const Message= require('./models/chatschema')

const app = express();
const port = 3000;

// ⬅️ Create HTTP server for socket.io
const server = http.createServer(app);

// ⬅️ Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect('mongodb://localhost:27017/Matrimony')
  .then(() => console.log('🟢 MongoDB connected successfully'))
  .catch((err) => console.error('🔴 MongoDB connection error:', err));

// ✅ Your routes
const accountRoutes = require('./routes/Account');
const addProfileRoutes = require('./routes/Profiles');
const getRoutes = require('./routes/Datafetch');
const getMessage= require('./routes/Chat')

app.use('/api/account', accountRoutes);
app.use('/api/add', addProfileRoutes);
app.use('/api/getdata', getRoutes);
// app.use('/api/chatfetch', getMessage)

// Add this route to fetch full message conversation between two users
app.get('/api/messages/conv/:user1/:user2', async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    // Find all messages where (sender=user1 AND receiver=user2) OR (sender=user2 AND receiver=user1)
    const conversation = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 }); // Sort ascending by time (oldest first)
    console.log("the retrive is the ", conversation)
    res.json(conversation); // Send back the array of messages
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

// server.js
const Profile = require('./models/DetailsSchema.js');

app.get('/apis/getResources/:number', async (req, res) => {
  try {
    const { number } = req.params;
    const profiles = await Profile.find({ createdByUserPhone: number });
    res.json(profiles);
  } catch (err) {
    console.error("Error fetching resources:", err);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});


app.get('/api/chat/list/:userPhone', async (req, res) => {
  try {
    const { userPhone } = req.params;
    
    // Find all unique users this user has chatted with
    const chatUsers = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: userPhone },
            { receiver: userPhone }
          ]
        }
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userPhone] },
              then: "$receiver",
              else: "$sender"
            }
          },
          lastMessage: { $last: "$text" },
          lastTimestamp: { $last: "$timestamp" }
        }
      },
      {
        $sort: { lastTimestamp: -1 } // Most recent chats first
      }
    ]);
    
    res.json({
      success: true,
      chatUsers: chatUsers
    });
    
  } catch (error) {
    console.error('Error fetching chat list:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chat list'
    });
  }
});

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Matrimony server!');
});

// ✅ Socket.IO logic
io.on('connection', (socket) => {
  console.log('🟢 New client connected');

  socket.on('join_room', ({ userPhone }) => {
    socket.join(userPhone);
    console.log(`🔗 User joined room: ${userPhone}`);
  });

  socket.on('send_message', async(data) => {
    console.log(`📤 Message from ${data.senderPhone} to ${data.receiverPhone}: ${data.message}`);

     try {
      // ✅ Save message to MongoDB
      const newMessage = new Message({
        sender: data.senderPhone,
        receiver: data.receiverPhone,
        text: data.message,
        timestamp: new Date()

      });
      
      await newMessage.save();
      console.log('✅ Message saved to database');
      
    } catch (error) {
      console.error('❌ Error saving message to database:', error);
    }  
    io.to(data.receiverPhone).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected');
  });
});

// ✅ Start server with Socket.IO
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
















// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');

// // Import Message model
// const Message = require('./models/Message'); // ⬅️ Add this line

// const app = express();
// const port = 3000;

// // Create HTTP server for socket.io
// const server = http.createServer(app);

// // Initialize Socket.IO server
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/Matrimony')
//   .then(() => console.log('🟢 MongoDB connected successfully'))
//   .catch((err) => console.error('🔴 MongoDB connection error:', err));

// // Your existing routes
// const accountRoutes = require('./routes/Account');
// const addProfileRoutes = require('./routes/Profiles');
// const getRoutes = require('./routes/Datafetch');

// app.use('/api/account', accountRoutes);
// app.use('/api/add', addProfileRoutes);
// app.use('/api/getdata', getRoutes);

// // ✅ NEW: Chat message routes
// app.get('/api/messages/:senderPhone/:receiverPhone', async (req, res) => {
//   try {
//     const { senderPhone, receiverPhone } = req.params;
    
//     const messages = await Message.find({
//       $or: [
//         { senderPhone, receiverPhone },
//         { senderPhone: receiverPhone, receiverPhone: senderPhone }
//       ]
//     }).sort({ timestamp: 1 }); // Oldest first for chat display
    
//     res.json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ error: 'Failed to fetch messages' });
//   }
// });

// // ✅ NEW: Get chat list for a user
// app.get('/api/chats/:userPhone', async (req, res) => {
//   try {
//     const { userPhone } = req.params;
    
//     // Get all messages where user is sender or receiver
//     const messages = await Message.aggregate([
//       {
//         $match: {
//           $or: [
//             { senderPhone: userPhone },
//             { receiverPhone: userPhone }
//           ]
//         }
//       },
//       {
//         $addFields: {
//           otherPhone: {
//             $cond: {
//               if: { $eq: ['$senderPhone', userPhone] },
//               then: '$receiverPhone',
//               else: '$senderPhone'
//             }
//           }
//         }
//       },
//       {
//         $sort: { timestamp: -1 }
//       },
//       {
//         $group: {
//           _id: '$otherPhone',
//           lastMessage: { $first: '$message' },
//           timestamp: { $first: '$timestamp' },
//           isRead: { $first: '$isRead' },
//           unreadCount: {
//             $sum: {
//               $cond: {
//                 if: {
//                   $and: [
//                     { $eq: ['$receiverPhone', userPhone] },
//                     { $eq: ['$isRead', false] }
//                   ]
//                 },
//                 then: 1,
//                 else: 0
//               }
//             }
//           }
//         }
//       },
//       {
//         $project: {
//           phoneNumber: '$_id',
//           lastMessage: 1,
//           timestamp: 1,
//           isRead: 1,
//           unreadCount: 1,
//           _id: 0
//         }
//       },
//       {
//         $sort: { timestamp: -1 }
//       }
//     ]);
    
//     res.json(messages);
//   } catch (error) {
//     console.error('Error fetching chat list:', error);
//     res.status(500).json({ error: 'Failed to fetch chat list' });
//   }
// });

// // ✅ NEW: Mark messages as read
// app.put('/api/messages/read', async (req, res) => {
//   try {
//     const { senderPhone, receiverPhone } = req.body;
    
//     await Message.updateMany(
//       {
//         senderPhone: receiverPhone,
//         receiverPhone: senderPhone,
//         isRead: false
//       },
//       { isRead: true }
//     );
    
//     res.json({ success: true });
//   } catch (error) {
//     console.error('Error marking messages as read:', error);
//     res.status(500).json({ error: 'Failed to mark messages as read' });
//   }
// });

// // Test route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Matrimony server!');
// });

// // ✅ UPDATED: Socket.IO logic with database integration
// io.on('connection', (socket) => {
//   console.log('🟢 New client connected');

//   socket.on('join_room', ({ userPhone }) => {
//     socket.join(userPhone);
//     console.log(`🔗 User joined room: ${userPhone}`);
//   });

//   socket.on('send_message', async (data) => {
//     console.log(`📤 Message from ${data.senderPhone} to ${data.receiverPhone}: ${data.message}`);
    
//     try {
//       // ✅ Save message to database
//       const newMessage = new Message({
//         senderPhone: data.senderPhone,
//         receiverPhone: data.receiverPhone,
//         message: data.message,
//         timestamp: new Date(),
//         isRead: false
//       });
      
//       const savedMessage = await newMessage.save();
      
//       // ✅ Emit to receiver's room
//       io.to(data.receiverPhone).emit('receive_message', {
//         _id: savedMessage._id.toString(),
//         senderPhone: savedMessage.senderPhone,
//         receiverPhone: savedMessage.receiverPhone,
//         message: savedMessage.message,
//         timestamp: savedMessage.timestamp.toISOString(),
//         isRead: savedMessage.isRead
//       });
      
//       console.log('✅ Message saved to database and sent to receiver');
//     } catch (error) {
//       console.error('❌ Error saving message:', error);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('🔴 Client disconnected');
//   });
// });

// // Start server
// server.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });




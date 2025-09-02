const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const http = require('http'); 
const cors = require('cors');
const socketio = require('socket.io'); 
require('./models/User');
require('./models/Post'); 
require('./models/Forum');
require('./services/passport');
require('./models/Specialist');
require('./models/Review');
require('./models/Comment');
require('./models/Message');
require('./models/Conversation');

const Message = mongoose.model('messages');
const Conversation = mongoose.model('conversations');

mongoose.connect(keys.mongoURI);

const app = express();
const server = http.createServer(app);
const io = socketio(server, { 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app); 
require('./routes/postRoutes.js')(app);
require('./routes/forumRoutes')(app);
require('./routes/specialistRoutes')(app);
require('./routes/inboxRoutes')(app);
require('./routes/commentRoutes')(app);
require('./routes/chatRoutes')(app);

io.on('connection', socket => {
    console.log('A new user connected via WebSocket:', socket.id);

    socket.on('join_conversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`User ${socket.id} joined room ${conversationId}`);
    });

    socket.on('send_message', async (data) => {
        const { conversationId, senderId, senderName, content } = data;

        const message = new Message({
            _conversation: conversationId,
            _sender: senderId,
            senderName,
            content
        });
        await message.save();

        await Conversation.findByIdAndUpdate(conversationId, { lastMessageAt: Date.now() });

        io.to(conversationId).emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
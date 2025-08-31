const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/Post'); 
require('./models/Forum');
require('./services/passport');
require('./models/Specialist');
require('./models/Review');
require('./models/Comment');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(express.json());

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

const PORT = process.env.PORT || 5000
app.listen(PORT);
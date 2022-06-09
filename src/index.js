require('./services/dbConnect.service');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const storyRouter = require('./routes/story.routes');
const fileRouter = require('./routes/file.routes');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
app.use('/story', storyRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/', (req, res) => {
  res.send('Home Page');
});

app.listen(port, () => console.log(`Listening on ${port}`));

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./database/schema');
const postRouter = require('./routes/postRouter')
const userRouter = require('./routes/userRouter')
require('dotenv').config()
const port = process.env.PORT 

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)

app.db = db



app.listen(port, () => console.log(`App listening on port ${port}`));

const express = require('express')
const app = express()
const schema = require('./database/schema');
require('dotenv').config()
const port = process.env.PORT 

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

schema.sync().then(() => {
    console.log('Connection successful with sqlite3')
}).catch(err => {
    console.log('Connection failed with sqlite3 error: ' + err)
})



app.listen(port, () => console.log(`App listening on port ${port}`));

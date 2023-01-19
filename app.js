const express = require('express');
require('dotenv').config();
const cors = require('cors')
const taskRoutes = require('./controllers/task');
const middlewares = require('./middlewares/mid.js');
const app = express();

const port = 8080

app.use(express.json())
app.use(cors())


app.use(middlewares);


app.use('/tasks', taskRoutes)


app.listen(port, () => {
    console.log('Services are running...')
})



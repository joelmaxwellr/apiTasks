const express = require('express')
const taskRouter = require('./routers/task')
// Conección BD
require('./db/dbconnection')


const app = express()
const port = 3000

app.use(express.json())
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server running... http://localhost:' + port)
})
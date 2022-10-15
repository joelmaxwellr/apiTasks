const express = require('express')
const taskRouter = require('./routers/task')
const userRouter = require('./routers/user')
// Conección BD
require('./db/dbconnection')


const app = express()
const port = 3000

/* app.use((req, res, next)=>{
    if (req.method == "GET") {
        res.send("El metodo GET esta fuera de servicio")
    } else{
        next()
    }
}) */


/* app.use((req, res, next)=>{
    if (req.method) {
        res.send("Este Webside esta fuera de servicio!!")
    } 
})
 */
app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log('Server running... http://localhost:' + port)
})
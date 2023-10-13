let { port } = require('../config/config')
const express = require('express')
const app = express()
const authController = require('../controller/AuthController')


//body will not be handled and not visible if below code is not done, in case of text use express.text()
app.use(express.json())
app.use('/api/auth', authController)

// listen on provided port on all network interfaces. this will only listen to http not https
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

app.use("/api/auth/", authController)

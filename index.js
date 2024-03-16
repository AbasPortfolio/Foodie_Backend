const express = require('express')
const { connect } = require('mongoose')
const cors = require('cors')
require ('dotenv').config()

const UserRoutes = require('./Routes/userRoutes')
const PostsRoutes = require('./Routes/postsRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')


const app = express();
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors({credentials: true, origin: "foodie-frontend-rjp7jj4v7-abas-projects-194c8cc8.vercel.app"}))

app.use('/api/users', UserRoutes)
app.use('/api/posts', PostsRoutes)

app.use(notFound)
app.use(errorHandler)


connect(process.env.MONGO_URL).then(
    app.listen(5000,()=>{
        console.log(`app is listening on port ${process.env.PORT}`)
    })
).catch(error=>{console.log(error)})

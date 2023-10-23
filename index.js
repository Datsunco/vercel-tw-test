require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const pg = require('./db')
const router = require('./pgRoutes/index')


const POPT = process.env.PORT || 5000 
const app = express()


app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.get('/', (req, res) => {
    console.log('works')
    res.status(200).json({message: 'working'})
})

const start = async () =>{
    try{
        await pg.connect((err) => {
            if (err) throw err
            console.log("Connect to PostgreSQL successfully!")
        })
        app.listen(POPT, () => console.log(`server startted on port ${POPT}`))
    } catch (e){
        console.log(e)
    }
}

start()
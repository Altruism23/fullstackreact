const express = require('express')
const cors = require("cors")
const {
    PrismaClient
} = require("@prisma/client")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const app = express()
const PORT = 8000
const prisma = new PrismaClient()
const secret = "oi8yw45oihjnkdrlgu"

app.use(cors({
    credentials : true,
    methods : ["GET", "POST", "PUT", "DELETE"],
    origin : "http://localhost:5173"
}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/register", async (req, res) => {
    const {
        email,
        password
    } = req.body
    try {
        const userData = await prisma.user.create({
            data: {
                email: email,
                password: bcrypt.hashSync(password, 10)
            }
        })
        res.json(userData)
    } catch (err) {
        res.json(err)
    }
})

app.post("/login", async(req, res) => {
    const {email, password} = req.body
    try {
        const loginUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (loginUser) {
            const passOK = bcrypt.compareSync(password, loginUser.password)
            if (passOK) {
                jwt.sign({
                    email: loginUser.email
                }, secret, {}, (err, token) => {
                    if (err) throw err
                    res.json(token)
                })
            }
        }
    } catch (error) {
        res.json(error)
    }
})

app.get("/profile", (req, res) => {
    const token = req?.headers?.authorization
    if (token) {
        jwt.verify(token, secret, {}, async (err, userData) => {
            if (err) throw err
            const {id, email} = await prisma.user.findUnique({
                where: {
                    email: userData.email
                }
            })
            res.json({id, email})
        })
    }
    else {
        res.json(null)
    }
})

app.listen(PORT, () => {
    console.log(`[API] : http://localhost:${PORT}`)
})
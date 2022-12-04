import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import { loginValidator, postCreateValidator, registerValidator } from "./validations/validation.js"
import { handleValidationErrors, checkAuth } from "./utils/index.js"
import { UserController, PostController } from "./controllers/index.js"

import config  from "dotenv"
config.config()

mongoose.
  connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('Database Connected!'))
  .catch(err => console.log('DB error: ' + err))


const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.send('Hi, there!')
})

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get('/posts', PostController.getAll)
app.post('/posts', checkAuth, postCreateValidator, handleValidationErrors, PostController.create)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidator, handleValidationErrors, PostController.update)

app.listen(4444, err => {
  if (err) {
    return err
  }

  console.log('Server OK')
})

import express from 'express';
const app = express();
import { configDotenv } from 'dotenv';

configDotenv();


import connectDB from './config/mongoDB.js';
import authRouter from './routes/auth.router.js';

const port = 6969;
app.use(express.json());



connectDB();
app.listen(port,() => {
    console.log(`http://localhost:${port}/`);
})

app.use("/api/auth",authRouter)


import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());


import userRouter from './routes/user.routes.js'
import accountRouter from './routes/accounts.routes.js';

app.use("/api/v1/user",userRouter);

// secure routes
app.use("/api/v1/accounts",accountRouter);

export default app;
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRoutes";
import errorHandler from "./middleware/errorHandler";
import adminRouter from "./routes/adminRoutes";
import userRouter from "./routes/userRoutes";

const port = 3000;
const app = express();

//@dev: Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//@dev: Routes
app.use('/api/auth', authRouter);
app.use('/api/admin',adminRouter);
app.use('/api/user',userRouter)

//@dev: Global Error Handling Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


import express from "express";
import { authRouter } from "./routes/authRoutes";
import errorHandler from "./middleware/errorHandler";

const port = 3000;
const app = express();

//@dev: Middlewares
app.use(express.json());

//@dev: Routes
app.use('/api/auth', authRouter);

//@dev: Global Error Handling Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


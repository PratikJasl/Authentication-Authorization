import express from "express";
import errorHandler from "./middleware/errorHandler";

const port = 3000;
const app = express();

app.use('/api/auth')

//@dev: Global Error Handling Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = require("./routes/authRoutes");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const port = 3000;
const app = (0, express_1.default)();
//@dev: Middlewares
app.use(express_1.default.json());
//@dev: Routes
app.use('/api/auth', authRoutes_1.authRouter);
//@dev: Global Error Handling Middleware
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

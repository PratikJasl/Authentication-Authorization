"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = require("./routes/authRoutes");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const port = 3000;
const app = (0, express_1.default)();
//@dev: Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
//@dev: Routes
app.use('/api/auth', authRoutes_1.authRouter);
//@dev: Global Error Handling Middleware
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

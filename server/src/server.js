"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const sequelize_1 = __importDefault(require("./sequelize"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
app.use("/api", routes_1.default);
app.use("*", (req, res) => {
    if (process.env.NODE_ENV !== "production") {
        console.error(`Route not matched: ${req.method} ${req.originalUrl}`);
    }
    res.status(404).json({ message: "Route not Found" });
});
if (process.env.NODE_ENV !== "production") {
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            console.log(`Route: ${middleware.route.path} - Methods: ${Object.keys(middleware.route.methods).join(", ")}`);
        }
        else if (middleware.name === "router") {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    console.log(`Route: ${handler.route.path} - Methods: ${Object.keys(handler.route.methods).join(", ")}`);
                }
            });
        }
    });
}
sequelize_1.default
    .sync({ alter: true, logging: false })
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error syncing database:", error);
});

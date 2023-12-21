"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.injectMetadata = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const uuid_1 = require("uuid");
const requestId = (0, uuid_1.v4)();
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })),
    defaultMeta: { requestId },
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
        }),
        new winston_1.default.transports.File({ filename: 'app.log' })
    ]
});
exports.logger = logger;
const injectMetadata = (additionalMetadata) => {
    return winston_1.default.format((info) => {
        info.metadata = Object.assign(Object.assign({}, info.metadata), additionalMetadata);
        return info;
    })();
};
exports.injectMetadata = injectMetadata;
const errorMiddleware = (err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500).json({ error: err.message, requestId });
};
exports.errorMiddleware = errorMiddleware;

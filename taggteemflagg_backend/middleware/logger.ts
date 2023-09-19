import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: `logs/error_${new Date().toISOString().replace(/\T.+/, '').replace(/-/g, '')}.log`, level: 'error' }),
        new transports.File({ filename: `logs/combined_${new Date().toISOString().replace(/\T.+/, '').replace(/-/g, '')}.log` }),
    ]
});

// If we're not in production, log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

export default logger;

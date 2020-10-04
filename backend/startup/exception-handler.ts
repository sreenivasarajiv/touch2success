import * as winston from 'winston';

export function exceptionHandler() {

    winston.add(new winston.transports.File({ filename: 'debug.log' }));
    winston.add(new winston.transports.Console({ format: winston.format.simple() }));

    // handle global unhandled promise rejections
    process.on('unhandledRejection', ex => {
        console.log('WE GOT AN UNHANDLED REJECTED PROMISED:', ex);
        winston.error((ex as any).message, ex);
    });

    // handle global unhandled exceptions
    winston.exceptions.handle(...[
        new winston.transports.File({ filename: 'unhandledExceptions.log' }),
        new winston.transports.Console()
    ]);
}
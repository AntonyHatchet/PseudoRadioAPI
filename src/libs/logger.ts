// Common logger instance
//
// Use it instead of console.log
// Minimum level is set by LOGGER_LEVEL environment variable.
// Call example: logger.info("Get message", message)
// See https://www.npmjs.com/package/winston
//
// Levels:
// error: You need to wake at 2AM to fix it
// warn: You need to check it on the next day
// info: it's what you want to see in production
// debug: useful for troubleshooting

import * as winston from "winston";
import { format } from "winston";
import * as path from "path";
import * as fs from "fs";
import { inspect } from "util"; // JSON.stringify, Converting circular structure to JSON

interface ILogger {
  debug: (...params: any[]) => void;
  info: (...params: any[]) => void;
  warn: (...params: any[]) => void;
  error: (...params: any[]) => void;
  level: string;
}

function formatter(info) {
  // Return string will be passed to logger.
  // You can use for debug here: JSON.stringify(info, null, 4)
  let line: string = "[" + new Date().toISOString() + "] ";
  line +=
    winston.format.colorize().colorize(info.level, info.level.toUpperCase()) +
    " ";
  if (info.message) {
    if (Array.isArray(info.message)) {
      for (let msgPart of info.message) {
        line +=
          typeof msgPart === "string"
            ? msgPart
            : inspect(msgPart, { depth: Infinity });
        line += " ";
      }
    } else {
      line +=
        typeof info.message === "string"
          ? info.message
          : inspect(info.message, { depth: Infinity });
    }
  }
  if (info.meta && Object.keys(info.meta).length) {
    line += "\n" + inspect(info.meta, { depth: Infinity });
  }
  return line;
}

const loggerFormat = format.combine(
  // for multiple arguments support
  format.splat(),
  format.printf(info => formatter(info))
);

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL || "info",
  transports: [
    new winston.transports.Console({
      name: "console",
      format: loggerFormat
    })
  ]
});

const logFilename = process.env.LOG_FILENAME || "./app.log";

/**
 * Set different logging output depends on environment variables LOG_WRITE_TO_FILE & LOG_WRITE_TO_CONSOLE
 * @param loggerInstance Logger instance
 */
function setupLoggerTransports(loggerInstance: winston.Logger) {
  // by default - do not write to file
  const logWriteToFile =
    process.env.LOG_WRITE_TO_FILE === undefined
      ? false
      : process.env.LOG_WRITE_TO_FILE === "true";
  // by default - write to console
  let logWriteToConsole =
    process.env.LOG_WRITE_TO_CONSOLE === undefined
      ? true
      : process.env.LOG_WRITE_TO_CONSOLE === "true";
  if (logWriteToFile) {
    let winstonTransportFile = new winston.transports.File({
      name: "file",
      filename: logFilename,
      format: loggerFormat
    });
    loggerInstance.add(winstonTransportFile);
    reopenTransportOnHupSignal(winstonTransportFile, loggerInstance);
  }
  if (!logWriteToConsole) {
    const winstonTransportConsole = logger.transports.find(
      transport => transport["name"] === "console"
    );
    if (winstonTransportConsole !== undefined) {
      loggerInstance.remove(winstonTransportConsole);
    } else {
      throw new Error(`Can't find logger console transport`);
    }
  }
  let info = `Setup logger transports. logWriteToFile=${logWriteToFile} logWriteToConsole=${logWriteToConsole}. `;
  if (logWriteToFile && logWriteToConsole) {
    info += `File ${logFilename} + Console`;
  } else if (logWriteToFile && !logWriteToConsole) {
    info += `File ${logFilename} only`;
  } else if (!logWriteToFile && logWriteToConsole) {
    info += `Console only`;
  } else {
    info += `Logs don't write to any output!`;
  }
  loggerInstance.info(info);
}

function reopenTransportOnHupSignal(fileTransport, loggerInstance) {
  process.on("SIGHUP", () => {
    loggerInstance.info("SIGHUP signal received");
    let fullname = path.join(
      fileTransport.dirname,
      fileTransport._getFile(false)
    );

    function reopen() {
      if (fileTransport._stream) {
        fileTransport._stream.end();
      }
      let stream = fs.createWriteStream(fullname, fileTransport.options);
      stream.setMaxListeners(Infinity);
      fileTransport._size = 0;
      fileTransport._stream = stream;
      fileTransport.once("flush", () => {
        fileTransport.opening = false;
        fileTransport.emit("open", fullname);
      });
    }

    fs.stat(fullname, err => {
      if (err && err.code === "ENOENT") {
        loggerInstance.info(`Reopen file ${fullname} cause SIGHUP received`);
        return reopen();
      }
    });
  });
}

setupLoggerTransports(logger);

const exportLogger = logger as ILogger;
export { exportLogger as logger, ILogger, logFilename };

export default exportLogger;

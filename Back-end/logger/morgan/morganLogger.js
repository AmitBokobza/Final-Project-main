const morgan = require("morgan");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const currentTime = require("../../utils/createTime");
const logDirectory = path.join(__dirname, "../../logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const morganLogger = morgan(function (tokens, req, res) {
  const { year, month, day, hour, minute, second } = currentTime();

  const date = `${year}-${month}-${day}`;
  const logFilePath = path.join(logDirectory, `${date}.log`);

  let message = [
    `[${date} ${hour}:${minute}:${second}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "--",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  if (res.statusCode >= 400){
    const plainMessage = message + "\n";
    fs.appendFileSync(logFilePath, plainMessage);

    return chalk.redBright(message);
  } else return chalk.greenBright(message)
});

module.exports = morganLogger;
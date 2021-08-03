import winston from 'winston';
var SplunkStreamEvent = require('winston-splunk-httplogger');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

let splunkSettings = {
    token: process.env.REACT_APP_SPLUNK_TOKEN,
    host: process.env.REACT_APP_SPLUNK_HOST || 'localhost'
};

const level = process.env.REACT_APP_NODE_ENV === 'development' ? 'debug' : 'warn';

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)
const transports: winston.transport[] = [];

if(splunkSettings.token !== ''){
    transports.push(
        new winston.transports.Console(),  
        new SplunkStreamEvent({ splunk: splunkSettings })
    )
}else{
    transports.push(
        new winston.transports.Console(),         
    )
}

const Logger = winston.createLogger({
  level,
  levels,
  format,
  transports,
})

export default Logger
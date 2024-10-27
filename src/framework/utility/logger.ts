import winston, { format } from 'winston'

export const logger = winston.createLogger({
  level: 'debug',
  transports: [new winston.transports.Console()],
  format: format.combine(
    format.splat(),
    format.timestamp(),
    format.printf(({ timestamp, message }) => {
      return `[${timestamp}]: ${message}`
    }),
    format.colorize({ all: true })
  )
})
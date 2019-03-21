// NPM酷库：log4js JavaScript日志框架:https://segmentfault.com/a/1190000012726340

var log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'debug' // 等级以上就出来了
logger.trace('Entering cheese testing') // 这个不会打印出来
logger.debug('Got cheese.')
logger.info('Cheese is Comté.')
logger.warn('Cheese is quite smelly.')
logger.error('Cheese is too ripe!')
logger.fatal('Cheese was breeding ground for listeria.')
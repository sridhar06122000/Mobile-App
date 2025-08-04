import MysqlLibrary from '../models/mysqlLibrary.js';
import config from './config.js';

const database = new MysqlLibrary({
    db          : config?.mysqlDatabase,
    host        : config.mysqlHost,
	port        : config.mysqlPort,
	user        : config.mysqlUser,
	passwd      : config.mysqlPassword,
    timezone    : 'Z'
});

export default database;
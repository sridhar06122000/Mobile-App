import mysql2 from 'mysql2';

export default class MysqlLibrary {
    constructor(database) {
        
        if (!database || !database.db || !database.host || !database.port || !database.user || !database.passwd || !database.timezone) {
            throw new Error('Database configuration is incomplete');
        }

        this.poolConnection = mysql2.createPool({
            database          : database.db,
            host              : database.host,
            port              : database.port,
            user              : database.user,
            password          : database.passwd,
            waitForConnections: true,
            connectionLimit   : 100,
            queueLimit        : 0,
            idleTimeout       : 60000,
            timezone          : database.timezone,
            decimalNumbers    : true
        });
    }

    executeQuery(query, params) {

        return new Promise((resolve, reject) => {

            this.poolConnection.query(query, params, (error, results, fields) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    closePool() {
        this.poolConnection.end();
    }
}

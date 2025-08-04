import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { join } from 'path';

if(!process?.env?.NODE_ENV) {
    dotenv?.config();
}

let config = {};

config.host = process?.env?.HOST;
config.port = process?.env?.PORT;
config.nodeEnv = process?.env?.NODE_ENV;

config.mysqlHost = process?.env?.MYSQL_MASTER_HOST;
config.mysqlPort = process?.env?.MYSQL_MASTER_PORT;
config.mysqlUser = process?.env?.MYSQL_MASTER_USER;
config.mysqlPassword = process?.env?.MYSQL_MASTER_PASSWORD;
config.mysqlDatabase = process?.env?.MYSQL_MASTER_DATABASE;

config.secretKey = process?.env?.SECRET_KEY;

config.transporter = nodemailer?.createTransport({
    service: process?.env?.SERVICE,
    auth: {
        user: process?.env?.USERNAME,
        pass: process?.env?.PASSWORD
    }
});

config.dirname = process?.cwd();

config.uploadDir = join(config?.dirname, 'uploads');

export default config;
import { createConnection } from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'fivem_refund_db',
};

const connection = createConnection(dbConfig);

export default connection;
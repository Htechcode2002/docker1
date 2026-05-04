import mysql from 'mysql2/promise';

export async function query(sql: string, params: any[] = []) {
    const dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'myuser',
        password: process.env.DB_PASSWORD || 'mypassword',
        database: process.env.DB_NAME || 'myapp_db',
    };

    const connection = await mysql.createConnection(dbConfig);
    try {
        const [results] = await connection.execute(sql, params);
        return results;
    } finally {
        await connection.end();
    }
}

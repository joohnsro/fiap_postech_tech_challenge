import mariadb from "mariadb"

export default async () => await mariadb.createConnection({
    host: process.env.NODE_ENV ? 'localhost' : process.env.MARIADB_HOST,
    port: parseInt(String(process.env.MARIADB_PORT)),
    database: process.env.MARIADB_DATABASE,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    insertIdAsNumber: true
});
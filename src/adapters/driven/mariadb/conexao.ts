const mariadb = require("mariadb")

export default async () => await mariadb.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'classroom_manager',
    user: 'admin',
    password: 'OTIsxb71HcC0WyA1UPNIzcvuMJ1Xu6NJ',
    insertIdAsNumber: true
});
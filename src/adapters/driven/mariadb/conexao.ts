import mariadb from "mariadb"

export default async () => await mariadb.createConnection({
    host: process.env.NODE_ENV ? 'localhost' : 'mariadb',
    port: 3306,
    database: 'tech_challenge',
    user: 'admin',
    password: 'OTIsxb71HcC0WyA1UPNIzcvuMJ1Xu6NJ',
    insertIdAsNumber: true
});
import mysql from "mysql2";
import dotenv from "dotenv";
import path from 'path';
dotenv.config();
import fs from "fs";
// Usa import.meta.url per ottenere il percorso corrente
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Converti il percorso da file:// a un formato compatibile con il sistema operativo
const __dirnameCorrected = __dirname.startsWith('/') ? __dirname.slice(1) : __dirname;
const caCertificate = fs.readFileSync(path.join(__dirnameCorrected, 'ca.pem'));
/* Creo la connessione al database a cui passo i dati del mio host, la porta, l'user e la password del database e il nome del database */
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,

    port: 11623,               // Porta di default per MySQL è 3306
    ssl: {
        ca: caCertificate,
        rejectUnauthorized: true  // Assicurati che la connessione sia sicura
    }
});
// Mi connetto al database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');

})

export default connection;





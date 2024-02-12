const db = require('./db/connection');
const axios = require('axios');

let clientNumber = 1;

const createClient = () => {
    axios.get('https://randomuser.me/api/')
        .then((response) => {
            const { name } = response.data.results[0];
            const sql = `INSERT INTO clients (name,last_name, created_at) VALUES ('${name.first}','${name.last}', '2024-02-01 19:07:41')`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                console.log('Cliente creado!');
                clientNumber++;
                /*const sql = `INSERT INTO logs (description, time_stamp) VALUES ('Cliente creado', NOW())`;
                db.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log('Log creado!');
                });*/
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

const names = ["Max", "Bella", "Charlie", "Lucy", "Cooper", "Luna", "Rocky", "Daisy", "Buddy", "Molly"]
const types = ["Perro", "Gato", "Conejo", "Pájaro", "Hurón", "Tortuga", "Hamster", "Cobaya", "Iguana", "Cerdo vietnamita"]


const createPet = () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const sql = `INSERT INTO pets (name, type, client_id, created_at) VALUES ('${name}','${type}', '${clientNumber}', '2024-02-11 19:07:41')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Mascota creada!');
    });
}


setInterval(createClient,5000);
setInterval(createPet,6000);
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000; // Utilizza la porta specificata nell'ambiente o la porta 3000 se non è definita
const app = express();
const photosRouter = require('./routers/photos');

// Middleware per consentire a qualsiasi dominio di accedere alle API (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Consenti a qualsiasi dominio
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Metodi consentiti
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Intestazioni consentite
    next();
});

// Middleware per il parsing del body
app.use(express.json());

// Definizione rotte
app.use('/photos', photosRouter);

// Avvia il server
app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta ${port}`);
});

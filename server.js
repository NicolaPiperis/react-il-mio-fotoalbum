const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000; // Utilizza la porta specificata nell'ambiente o la porta 3000 se non è definita
const app = express();



app.use((req,  res) => {
    res.send("Hello world!")
    console.log("Server.js risponde correttamente");
});


// Avvia il server
app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta ${port}`);
});

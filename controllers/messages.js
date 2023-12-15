const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// libreria per validazione
// const Joi = require('@hapi/joi');

// Funzione di validazione con Joi
// const validatePhotoData = (data) => {
//     const schema = Joi.object({
//       content: Joi.string().required(),
//     });
  
//     return schema.validate(data);
//   };

// Crea una colonna foto
async function store(req, res) {
      // Validazione dei dati della foto
    //   const { error } = validatePhotoData(req.body);
    //   if (error) {
    //     return res.status(400).json({ error: error.details[0].message });
    //   }
  
      const messageData = req.body;
      
      const newMessage = await prisma.message.create({
        data: {
          email: messageData.email,
          content: messageData.content
        }
      });
  
      return res.json(newMessage);
    
  }

// Visualizza le colonne photo, con filtro se necessarrio
async function index (req, res) {
    const queryfilters = {};
    const {content, email} = req.query;

    if(content) {
        queryfilters.content = {
            contains: content
        }
    }
    if(email) {
      queryfilters.email = {
          contains: email
      }
  }

    const data = await prisma.message.findMany({
      where:
      queryfilters
    })

    return res.json(data);

};

// Visualizza la colonna foto desiderata, attraverso un parametro(id)
async function show (req, res) {
    const idParams = req.params.id;
    const data = await prisma.message.findUnique({
        where: {
            id: parseInt(idParams)
        }
    })
    if(!data) {
        res.send("Messaggio non trovato, aggiorna il server")
    }
    
    return res.json(data);
};


// aggiorna colonna photo, attraverso parametro(id)
async function destroy (req, res) { 
    const idParams = req.params.id;
    const idParamsInt = parseInt(idParams);

    const deletedData = await prisma.message.delete({
        where: {
            id: idParamsInt
        }
    })

    return res.json(`Il messaggio con id: ${deletedData.id} è stato eliminato correttamente`);
}

module.exports = {
    store,
    index,
    show,
    destroy
}
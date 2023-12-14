const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// libreria per validazione
const Joi = require('@hapi/joi');

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
          content: messageData.content
        }
      });
  
      return res.json(newMessage);
    
  }

// Visualizza le colonne photo, con filtro se necessarrio
async function index (req, res) {
    // const queryfilters = {};
    // const {title, published} = req.query;

    // if(title) {
    //     queryfilters.title = {
    //         contains: title
    //     }
    // }
    // if(published) {
    //     queryfilters.published = {
    //         equals: published === "true"
    //     }
    // }

    // const data = await prisma.photo.findMany({
    //     where: 
    //     queryfilters,
    //     include: {
    //         categories: true
    //     }
        
    // });

    // return res.json(data);

};

// Visualizza la colonna foto desiderata, attraverso un parametro(id)
async function show (req, res) {
    // const idParams = req.params.id;
    // const data = await prisma.photo.findUnique({
    //     where: {
    //         id: parseInt(idParams)
    //     },
    //     include: {
    //         categories: true
    //     }
    // })
    // if(!data) {
    //     res.send("Photo non trovata, aggiorna il server")
    // }
    
    // return res.json(data);
};


// aggiorna colonna photo, attraverso parametro(id)
async function destroy (req, res) { 
    // const idParams = req.params.id;
    // const idParamsInt = parseInt(idParams);

    // const deletedData = await prisma.photo.delete({
    //     where: {
    //         id: idParamsInt
    //     },
    //     include: {
    //         categories: true
    //     }
    // })

    // return res.json(`La photo con id: ${deletedData.id} e intitolata "${deletedData.title}" è stata eliminata correttamente`);
}

module.exports = {
    store,
    index,
    show,
    destroy
}
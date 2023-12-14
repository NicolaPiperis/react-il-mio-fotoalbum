const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// libreria per validazione
const Joi = require('@hapi/joi');

// Funzione di validazione con Joi
const validatePhotoData = (data) => {
    const schema = Joi.object({
      name: Joi.string().required()
    });
  
    return schema.validate(data);
  };

// Crea una colonna foto
async function store (req, res) {
    try {
        // Validazione dei dati della foto
        const { error } = validatePhotoData(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }

    const categoryData = req.body;
    const newCategory = await prisma.category.create({
        data:{
            name: categoryData.name
        }
    })

    return res.json(newCategory);
    }catch(error){
        console.error("Errore durante la creazione della foto:", error);
        return res.status(500).json({ error: "Errore durante l'elaborazione della richiesta" });
    }
};

// Visualizza le colonne photo, con filtro se necessarrio
async function index (req, res) {
    const queryfilters = {};
    const {name} = req.query;

    if(name) {
        queryfilters.name = {
            contains: name
        }
    }

    const data = await prisma.category.findMany({
        where: 
        queryfilters
    });

    return res.json(data);

};

// Visualizza la colonna foto desiderata, attraverso un parametro(id)
async function show (req, res) {
    const idParams = req.params.id;
    const data = await prisma.category.findUnique({
        where: {
            id: parseInt(idParams)
        }
    })
    if(!data) {
        res.send("Category non trovata, aggiorna il server")
    }
    
    return res.json(data);
};


// aggiorna colonna photo, attraverso parametro(id)
async function update(req, res) {
    // Validazione dei dati della foto
    const { error } = validatePhotoData(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const idParams = req.params.id;
    const idParamsInt = parseInt(idParams);
    const dataInComing = req.body;

    const updateCategory = await prisma.category.update({
        data: {
            ...dataInComing
        },
        where: {
            id: idParamsInt
        }
    });

    return res.json(updateCategory);
}; 

// aggiorna colonna photo, attraverso parametro(id)
async function destroy (req, res) { 
    const idParams = req.params.id;
    const idParamsInt = parseInt(idParams);

    const deletedData = await prisma.category.delete({
        where: {
            id: idParamsInt
        }
    })

    return res.json(`La categoria con id: ${deletedData.id}, intitolata "${deletedData.name}" (creata ${deletedData.createdAt}) è stata eliminata correttamente`);
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}
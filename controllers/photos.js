const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// libreria per validazione
const Joi = require('@hapi/joi');

// Funzione di validazione con Joi
const validatePhotoData = (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
      published: Joi.boolean().required(),
      categories: Joi.array().items(Joi.number().integer()).required(),
    });
  
    return schema.validate(data);
  };

// Crea una colonna foto
async function store(req, res) {
    try {
      // Validazione dei dati della foto
      const { error } = validatePhotoData(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const photoData = req.body;
      const newPhoto = await prisma.photo.create({
        data: {
          title: photoData.title,
          description: photoData.description,
          image: photoData.image,
          published: photoData.published,
          categories: {
            connect: photoData.categories.map(
              idCategory => ({ id: idCategory })
            )
          }
        },
        include: {
          categories: true
        }
      });
  
      return res.json(newPhoto);
    } catch (error) {
      console.error("Errore durante la creazione della foto:", error);
      return res.status(500).json({ error: "Errore durante l'elaborazione della richiesta" });
    }
  }

// Visualizza le colonne photo, con filtro se necessarrio
async function index (req, res) {
    const queryfilters = {};
    const {title, published} = req.query;

    if(title) {
        queryfilters.title = {
            contains: title
        }
    }
    if(published) {
        queryfilters.published = {
            equals: published === "true"
        }
    }

    const data = await prisma.photo.findMany({
        where: 
        queryfilters,
        include: {
            categories: true
        }
        
    });

    return res.json(data);

};

// Visualizza la colonna foto desiderata, attraverso un parametro(id)
async function show (req, res) {
    const idParams = req.params.id;
    const data = await prisma.photo.findUnique({
        where: {
            id: parseInt(idParams)
        },
        include: {
            categories: true
        }
    })
    if(!data) {
        res.send("Photo non trovata, aggiorna il server")
    }
    
    return res.json(data);
};


// aggiorna colonna photo, attraverso parametro(id)
async function update(req, res) {
    
    try {
        // Validazione dei dati della foto
        const { error } = validatePhotoData(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        const idParams = req.params.id;
        const idParamsInt = parseInt(idParams);
        const dataInComing = req.body;
    
        const updatePhoto = await prisma.photo.update({
            data: {
                ...dataInComing,
                categories: {
                    connect: dataInComing.categories.map(
                        idCategory => ({id : idCategory})
                    )
                }
            },
            where: {
                id: idParamsInt
            },
            include: {
                categories: true    
            }
        });
    
        return res.json(updatePhoto);
        
    } catch (error) {
        console.error("Errore durante la creazione della foto:", error);
        return res.status(500).json({ error: "Errore durante l'elaborazione della richiesta" });
    }
}; 

// aggiorna colonna photo, attraverso parametro(id)
async function destroy (req, res) { 
    const idParams = req.params.id;
    const idParamsInt = parseInt(idParams);

    const deletedData = await prisma.photo.delete({
        where: {
            id: idParamsInt
        },
        include: {
            categories: true
        }
    })

    return res.json(`La photo con id: ${deletedData.id} e intitolata "${deletedData.title}" è stata eliminata correttamente`);
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}
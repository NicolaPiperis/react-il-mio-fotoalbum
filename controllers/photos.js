const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Crea una colonna foto
async function store (req, res) {
    const photoData = req.body;
    const newPhoto = await prisma.photo.create({
        data:{
            title: photoData.title,
            description: photoData.description,
            image: photoData.image,
            published: photoData.published
        }
    })

    return res.json(newPhoto);
};

// Visualizza le colonne photo
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

    const data = await prisma.photo.findMany({where: queryfilters});

    return res.json(data);

};

// Visualizza la colonna foto desiderata, attraverso un parametro(id)
async function show (req, res) {
    const idParams = req.params.id;
    const data = await prisma.photo.findUnique({
        where: {
            id: parseInt(idParams)
        }
    })
    if(!data) {
        res.send("Photo non trovata, aggiorna il server")
    }
    
    return res.json(data);
};


// aggiorna colonna photo, attraverso parametro(id)
async function update(req, res) {
    const idParams = req.params.id;
    const idParamsInt = parseInt(idParams);
    const dataInComing = req.body;

    const updatePhoto = await prisma.photo.update({
        data: {
            ...dataInComing
        },
        where: {
            id: idParamsInt
        }
    });

    return res.json(updatePhoto);
}; 

// aggiorna colonna photo, attraverso parametro(id)
async function destroy (req, res) { 
    const idParams = req.params.id;
    const idParamsInt = parseInt(idParams);

    const deletedData = await prisma.photo.delete({
        where: {
            id: idParamsInt
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
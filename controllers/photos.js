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

// Visualizza le colonne foto
async function index (req, res) {
    const data = await prisma.photo.findMany();

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

async function update(req, res) {
    const idParams = req.params.id;
    const idParamsInt = parseInt(idParams);
    const dataInComing = req.body;

    const photo = await prisma.photo.findUnique({
        where: {
            id: idParamsInt
        }
    })
    if(!photo) {
        res.send("Photo non trovata, aggiorna il server")
    }

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

async function destroy (req, res) { 
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}
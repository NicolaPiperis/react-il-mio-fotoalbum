const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

async function index (req, res) {
    const data = await prisma.photo.findMany();
    
    res.json(data);
};

async function show (req, res) {

};

async function update(req, res) {

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
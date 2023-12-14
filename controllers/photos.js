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
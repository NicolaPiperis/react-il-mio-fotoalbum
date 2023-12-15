const express = require ("express");
const router = express.Router();

const photosController = require('../controllers/photos');
const authHandler = require('../middleware/authHandler')

// POST / photo
// Crea una foto
router.post('/', authHandler, photosController.store);

// GET / photo
// Ottieni le foto
router.get('/', photosController.index);

// GET / photo/:id
// Ottieni una foto
router.get('/:id', photosController.show);

// PUT / photo/:id
// Modifica una foto
router.put('/:id', authHandler, photosController.update);

// DELETE / photo/:id
// Cancella una foto
router.delete('/:id', authHandler, photosController.destroy);

module.exports = router;
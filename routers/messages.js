const express = require ("express");
const router = express.Router();

const messagesController = require('../controllers/messages');

// POST / photo
// Crea una foto
router.post('/', messagesController.store);

// GET / photo
// Ottieni le foto
router.get('/', messagesController.index);

// GET / photo/:id
// Ottieni una foto
router.get('/:id', messagesController.show);

// DELETE / photo/:id
// Cancella una foto
router.delete('/:id',/* authHandler,*/ messagesController.destroy);

module.exports = router;
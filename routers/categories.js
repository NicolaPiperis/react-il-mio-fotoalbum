const express = require ("express");
const router = express.Router();

const categoriesController = require('../controllers/categories');

// POST / category
// Crea una category
router.post('/', categoriesController.store);

// GET / category
// Ottieni le categories
router.get('/', categoriesController.index);

// GET / category/:id
// Ottieni una category
router.get('/:id', categoriesController.show);

// PUT / category/:id
// Modifica una category
router.put('/:id', /*authHandler,*/categoriesController.update);

// DELETE / category/:id
// Cancella una category
router.delete('/:id',/* authHandler,*/ categoriesController.destroy);

module.exports = router;
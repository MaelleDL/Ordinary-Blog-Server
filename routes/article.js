const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/article');
const auth = require('../middleware/auth');

router.get('/', stuffCtrl.getAllArticles);
router.get('/:id', stuffCtrl.getOneArticle);
router.post('/', auth, stuffCtrl.createArticle);
router.put('/:id', auth, stuffCtrl.modifyArticle);
router.delete('/:id', auth, stuffCtrl.deleteArticle);

module.exports = router;
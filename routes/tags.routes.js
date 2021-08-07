const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tags.controller');

router.get('/all/:id', tagsController.getTags);
router.get('/:id', tagsController.getTag);
router.get('/details/:id', tagsController.getTagDetails);
router.post('/', tagsController.postTag);
router.post('/insert/tag', tagsController.insertTag);
router.put('/:id', tagsController.putTag);
router.put('/delete/:id', tagsController.deleteTag);




module.exports = router;
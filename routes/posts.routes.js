const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts.controller');

router.get('/',postController.getPosts);
router.get('/:id',postController.getPost);
router.post('/',postController.postPost);
router.put('/:id',postController.putPost);
router.put('/like/:id',postController.putPostLike);
router.put('/delete/:id',postController.deletePost);

module.exports = router;
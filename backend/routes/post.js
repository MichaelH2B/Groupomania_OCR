const express = require('express');

const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const ctrlPost = require('../controllers/post');

router.post('/', auth, multer, ctrlPost.createPost);
router.get('/', auth, ctrlPost.getAllPosts);
router.put('/:id', auth, multer, ctrlPost.modifyPost);
router.delete('/:id', auth, multer, ctrlPost.deletePost);
router.post('/like/:id', auth, ctrlPost.likePost);

module.exports = router;
import express from 'express';
import { getPosts, handleVote, addComment } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/:id/vote', handleVote);
router.post('/:id/comments', addComment);

export default router;

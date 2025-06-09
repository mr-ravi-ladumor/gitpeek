import express from 'express';
import { handleRepos, handleRepoById } from '../controllers/github.js';

const router = express.Router();

router.get('/repos', handleRepos);
router.get('/repo/:id', handleRepoById);

export default router;
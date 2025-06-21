import express from 'express';
import { handleRepos, handleRepoById } from '../controllers/github.js';

const router = express.Router();

router.route('/repos').get(handleRepos);
router.route('/repo/:id').get(handleRepoById);

export default router;
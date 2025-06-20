import express from 'express';
import { handleRepos, handleRepoById } from '../controllers/github.js';

const router = express.Router();

router.route('/repos').post(handleRepos);
router.route('/repo/:id').post(handleRepoById);

export default router;
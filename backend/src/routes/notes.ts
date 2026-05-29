import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { createNote, getStories, updateStory, publishStory } from '../controllers/notesController';

const router = Router();

router.use(requireAuth);

router.post('/', createNote);
router.get('/stories', getStories);
router.put('/stories/:id', updateStory);
router.post('/stories/:id/publish', publishStory);

export default router;

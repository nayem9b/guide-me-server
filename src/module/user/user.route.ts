import express from 'express';

const router = express.Router();

router.get('/user/me', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

export const userRoutes = router
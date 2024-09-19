import express from 'express';

const router= express.Router();

router.get('/chat/me', (req, res) => {
    res.json({
        id: '123',
        name: 'John Doe',
        avatar: 'https://example.com/johndoe.jpg',
    });
});

export const chatRoutes= router
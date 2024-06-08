const express = require('express');
const router = express.Router();
const { Comment } = require('../model');

router.get('/:boardId', async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { boardId: req.params.boardId } });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { boardId, writer, content } = req.body;
        const comment = await Comment.create({ boardId, writer, content });
        res.json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Comment.destroy({ where: { id: req.params.id } });
        res.json({ result: 'success' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

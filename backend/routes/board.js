const express = require('express');
const router = express.Router();
const { Board } = global.models;  // 전역 객체에서 Board 모델을 가져옴

// 게시글 생성
router.post('/', async (req, res) => {
    try {
        const { title, content, latitude, longitude, marker_latitude, marker_longitude } = req.body;
        const board = await Board.create({
            title,
            content,
            latitude,
            longitude,
            marker_latitude,
            marker_longitude,
        });
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create board' });
    }
});

// 게시글 조회
router.get('/:id', async (req, res) => {
    try {
        const board = await Board.findByPk(req.params.id);
        if (board) {
            res.status(200).json(board);
        } else {
            res.status(404).json({ error: 'Board not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch board' });
    }
});

module.exports = router;

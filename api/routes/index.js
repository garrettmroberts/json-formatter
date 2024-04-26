const express = require('express');
const sampleTodos = require('../data/sampleTodos.json');

const router = express.Router();

router.get('/api/sample-json', (req, res) => {
  try {
    res.type('json');
    res.status(200);
    if (req.query.size === 'large') {
      res.json(sampleTodos);
    } else {
      res.json(sampleTodos.slice(0, 10));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

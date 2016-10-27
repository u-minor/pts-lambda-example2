var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    users: []
  });
});

router.get('/:userId', function(req, res, next) {
  res.json({
    user: {
      id: parseInt(req.params.userId),
      name: 'test user'
    }
  });
});

router.get('/:userId/items', function(req, res, next) {
  res.json({
    items: []
  });
});

router.get('/:userId/items/:itemId', function(req, res, next) {
  res.json({
    item: {
      id: parseInt(req.params.itemId),
      name: 'test item'
    }
  });
});

module.exports = router;

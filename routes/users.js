const router = require('express').Router();
const {
  getUsers, getUserById, addUser, editUserData, editUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', addUser);
router.patch('/me/avatar', editUserAvatar);
router.patch('/me', editUserData);

module.exports = router;

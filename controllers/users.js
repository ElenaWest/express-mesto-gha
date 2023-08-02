const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const {
  BAD_REQUEST_STATUS, NOT_FOUND_STATUS, INTERNAL_SERVER_STATUS, CREATED_STATUS,
} = require('../utils/constants');

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_STATUS).send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_STATUS).send({ message: 'Указан некорректный id пользователя' });
      } else {
        res.status(INTERNAL_SERVER_STATUS).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER_STATUS).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_STATUS).send({ message: 'Указан некорректный id пользователя' });
      } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND_STATUS).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(INTERNAL_SERVER_STATUS).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.editUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST_STATUS).send({ message: 'Указан неверный id пользователя' });
      } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND_STATUS).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(INTERNAL_SERVER_STATUS).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.editUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST_STATUS).send({ message: 'Указан неверный id пользователя' });
      } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND_STATUS).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(INTERNAL_SERVER_STATUS).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

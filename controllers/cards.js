const { default: mongoose } = require('mongoose');
const Card = require('../models/card');
const {
  CREATED_STATUS, NOT_FOUND_STATUS, BAD_REQUEST_STATUS, INTERNAL_SERVER_STATUS,
} = require('../utils/constants');

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((data) => res.status(CREATED_STATUS).send(data))
        .catch(() => res.status(NOT_FOUND_STATUS).send({ message: 'Запрашиваемая карточка не найдена' }));
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_STATUS).send({ message: 'Некорректные данные карточки' });
      } else {
        res.status(INTERNAL_SERVER_STATUS).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .orFail()
    .then((cards) => res.send(cards))
    .catch(() => res.status(INTERNAL_SERVER_STATUS).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((cards) => res.send(cards))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST_STATUS).send({ message: 'Некорректные данные карточки' });
      } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND_STATUS).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.send({ message: 'Карточка удалена' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_STATUS).send({ message: 'Некорректные данные карточки' });
      } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND_STATUS).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER_STATUS).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_STATUS).send({ message: 'Некорректные данные карточки' });
      } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND_STATUS).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER_STATUS).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');
const { emailRegular } = require('../utils/constants');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().pattern(emailRegular),
    password: Joi.string().required().min(3),
  }),
}), login);

module.exports = router;

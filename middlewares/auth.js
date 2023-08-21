const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

// Спасибо большое за подробное ревью, немного не согласна с throw, но да ладно.
// Можно лучше подправлю к 15 ПР, в данный момент ограничена во времени, а хочется не отставать
// (обычно стараюсь исправлять сразу). Вы отличный ревью и с вами приятно учиться)

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'hello');
  } catch (error) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};

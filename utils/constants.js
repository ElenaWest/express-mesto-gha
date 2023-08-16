const URL_REGULAR = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const EMAIL_REGULAR = /^\S+@\S+\.\S+$/;

module.exports = {
  URL_REGULAR,
  EMAIL_REGULAR,
};

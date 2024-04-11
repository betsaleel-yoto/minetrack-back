const validator = require('validator');

const dateValidator = (inputValue) => {
  const regexDate = /^\d{4}-\d{2}-\d{2}$/;
  if (!regexDate.test(inputValue)) {
    throw new Error("La date n'est pas valide.");
  } else {
    console.log("La date est valide.");
  }
};

module.exports = { dateValidator };

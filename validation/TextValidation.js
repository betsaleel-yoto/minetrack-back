const validator = require('validator');

const textValidator = (inputValueA, inputValueB) => {
  if (!validator.isLength(inputValueA, { min: 1 })) {
    throw new Error('Le champ A ne doit pas être vide');
  } else if (!validator.matches(inputValueA, /^[^<>]+$/)) {
    throw new Error("Ces caractères ne sont pas autorisés pour le champ A");
  } else if (!validator.isLength(inputValueB, { min: 1 })) {
    throw new Error('Le champ B ne doit pas être vide');
  } else if (!validator.matches(inputValueB, /^[^<>]+$/)) {
    throw new Error("Ces caractères ne sont pas autorisés pour le champ B");
  } else {
    console.log('valide');
  }
};

module.exports = { textValidator };

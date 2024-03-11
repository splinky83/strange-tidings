const crypto = require('crypto');

const Roll = ({ noDice, noFaces }) => {

  const results = [];

  for (let i = 0; i < noDice; i++) {
    results.push(crypto.randomInt(1, noFaces + 1));
  }

  const total = results.reduce((total, currentNumber) => total + currentNumber);

  return { results, total };

}

module.exports = {
  Roll
}
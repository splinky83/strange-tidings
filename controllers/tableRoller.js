


const rollOnTable = (table, persistantValues) => {

  const { total: diceResult, results: dice, rollText } = table.diceRoll();

  persistantValues.dice.push(dice)
  persistantValues.rollText.push(rollText)

  const tableResult = table.entries.filter(entry => diceResult >= entry.lowerBounds && diceResult <= entry.upperBounds)

  if (tableResult.length !== 1) {
    throw new Error('Invalid result Length')
  }

  if (!tableResult[0].nested) {
    return { rollResult: tableResult[0], finalPersistantValues: persistantValues, };
  }

  if (tableResult[0].multiRoll) {
    const numberOfRolls = tableResult[0].multiRoll();

    persistantValues.dice.push(numberOfRolls)
    let finalText = tableResult[0].text;
    for (let i = 0; i < numberOfRolls; i++) {
      finalText = `${finalText}|${rollOnTable(tableResult[0].nested, persistantValues).rollResult.text()}`;
    }
    return { rollResult: { text: () => finalText }, finalPersistantValues: persistantValues, };

  }

  return rollOnTable(tableResult[0].nested, persistantValues)

}


module.exports = {
  rollOnTable,
}
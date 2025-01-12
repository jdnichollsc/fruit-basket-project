// Initialize the BASKET object if it doesn't exist
window.BASKET = window.BASKET || {};

BASKET.API = (() => {
  const _fruits = [
    'Apple',
    'Banana',
    'Blueberry',
    'Cherry',
    'Kiwi',
    'Mango',
    'Orange',
    'Pear',
    'Pineapple',
    'Strawberry',
  ];

  const _delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const _sortFruits = (fruits) =>
    [...fruits].sort((a, b) => a.localeCompare(b));

  const _findFruit = (name) =>
    _fruits.findIndex((fruit) => fruit.toLowerCase() === name.toLowerCase());

  return {
    async getAll() {
      await _delay(2000);
      return _sortFruits(_fruits);
    },

    async add(name) {
      await _delay(2000);
      if (_findFruit(name) !== -1) {
        throw new Error(`${name} already exists`);
      }
      _fruits.push(name);
      return _sortFruits(_fruits);
    },

    async update(oldName, newName) {
      await _delay(2000);
      const oldIndex = _findFruit(oldName);
      if (oldIndex === -1) {
        throw new Error(`${oldName} not found`);
      }
      if (
        oldName.toLowerCase() !== newName.toLowerCase() &&
        _findFruit(newName) !== -1
      ) {
        throw new Error(`${newName} already in use`);
      }
      _fruits[oldIndex] = newName;
      return _sortFruits(_fruits);
    },

    async delete(name) {
      await _delay(2000);
      const index = _findFruit(name);
      if (index === -1) {
        throw new Error(`${name} not found`);
      }
      _fruits.splice(index, 1);
      return _sortFruits(_fruits);
    },
  };
})();

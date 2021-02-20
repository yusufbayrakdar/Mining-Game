class helper {
  capitalize(string) {
    if (string) {
      let words = [];
      string.split(" ").forEach((word) => {
        if (word[0]) {
          words.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
        }
      });
      return words.join(" ");
    }
    return;
  }
  removeFromArray(array, index) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  }
}

module.exports = new helper();

const books = [
  { volumeInfo: { title: 'JavaScript: The Good Parts' } }
];

export function findBook(query) {
  return new Promise((resolve, reject) => {
    resolve({ volumeInfo: { title: 'JavaScript: The Good Parts' } });
  });
}

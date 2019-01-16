const books = [
  { volumeInfo: { title: 'JavaScript: The Good Parts' } }
];

export function findBook(query) {
  return new Promise((resolve, reject) => {
    resolve(books[0]);
  });
}

export default function request() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('test');
    }, 1000);
  });
}
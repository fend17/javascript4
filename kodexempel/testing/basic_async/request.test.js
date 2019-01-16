import request from './request';

test('Async request', () => {
  expect.assertions(1);
  return request().then(data => {
    expect(data).toMatch('test');
  });
});

test('Async / Await test', async () => {
  expect.assertions(1);
  const data = await request();
  expect(data).toMatch('test');
});
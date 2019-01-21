import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../components/App';
import { mapObjectToArray, loadRates } from '../api';

test('should be base EUR', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('h1').text()).toContain('EUR');
});

test('should match snapshot', () => {
  const wrapper = render(<App />);
  expect(wrapper).toMatchSnapshot();
});

test('should populate list with rates', async () => {
  const { rates } = await loadRates();
  const wrapper = shallow(<App />);
  wrapper.setState({ rates: mapObjectToArray(rates) });
  const list = wrapper.find('ul');
  expect(list.children()).toHaveLength(31);
});


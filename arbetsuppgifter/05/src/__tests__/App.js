import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../components/App';
import { mapObjectToArray, loadRates } from '../api';

test('should be base EUR', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('h1').text()).toContain('EUR');
});

it('should match snapshot', () => {
  const wrapper = render(<App />);
  expect(wrapper).toMatchSnapshot();
});

import { shallow } from 'enzyme';
import React from 'react';
import DropDown from './DropDown';

test('Rendering an input box', () => {
  const dropDown = shallow(<DropDown items={['Diska', 'Städa', 'Sova']} />);

  expect(dropDown.find('li')).toHaveLength(0);

  dropDown.find('button').simulate('click');

  expect(dropDown.find('li')).toHaveLength(3);
});

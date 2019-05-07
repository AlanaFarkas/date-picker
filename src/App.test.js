import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('App.js', () => {
  it('does not render calendar component on page load', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.exists(<Calendar />)).toEqual(false);
  });

  it('renders the correct header message', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).toEqual('Choose a date');
  });

})


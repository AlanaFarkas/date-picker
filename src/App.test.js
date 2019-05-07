import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { expect, shallow } from 'enzyme';
import Calendar from './Calendar';

describe('App.js', () => {
  it('does not render calendar component on page load', () => {
    const wrapper = shallow(<App />)
    console.log(wrapper.debug());
    expect(wrapper.exists(<Calendar />)).to.equal(false);
  })

  // describe('<Calendar />', () => {
  //   it('renders a <Calendar /> when the calendar icon is clicked', () => {
  //     const wrapper = shallow(<Calendar />)
  //     console.log(wrapper.debug());
  //   })
  // })
})


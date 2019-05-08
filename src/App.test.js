import React from 'react';
import App from './App';
import { mountWithCustomWrappers } from "enzyme-custom-wrappers";

describe('App.js', () => {
  it('renders the correct header message', () => {
    const wrapper = mountWithCustomWrappers(<App />);
    //not super sure why this is working -- when I look in the console I see a lot of html output that looks correct but no actual matching text
    // console.log(wrapper.findByDataTest('app-header').at(0).debug())
    expect(wrapper.findByDataTest('app-header').exists()).toBe(true);
    expect(wrapper.findByDataTest('app-header').at(0).text()).toEqual('Choose a date');
  });

  it('renders the input component', () => {
    const wrapper = mountWithCustomWrappers(<App />);
    expect(wrapper.findByDataTest('input-field').exists()).toBe(true);
  })

  it('renders the calendar image icon component', () => {
    const wrapper = mountWithCustomWrappers(<App />);
    expect(wrapper.findByDataTest('calendar-icon').exists()).toBe(true);
  })

  // it('renders the date picker when the calendar image icon is clicked', () => {
  //     const wrapper = mountWithCustomWrappers(<App />);
  // })

  it('does not render calendar component on page load', () => {
    const wrapper = mountWithCustomWrappers(<App />);
    expect(wrapper.findByDataTest('calendar-container').exists()).toBe(false);
  });


})


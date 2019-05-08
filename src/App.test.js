import React from 'react';
import App from './App';
import { mountWithCustomWrappers } from "enzyme-custom-wrappers";

describe('App.js', () => {
  it('renders the correct header message', () => {
    const wrapper = mountWithCustomWrappers(<App />);
    //not sure why this is working -- when I look in the console I see a lot of html output that looks correct but no actual matching text
    // console.log(wrapper.findByDataTest('app-header').at(0).debug())
    expect(wrapper.findByDataTest('app-header').exists()).toBe(true);
    expect(wrapper.findByDataTest('app-header').at(0).text()).toEqual('Choose a date');
  });

  it('does not render calendar component on page load', () => {
    const wrapper = mountWithCustomWrappers(<App />);
    expect(wrapper.findByDataTest('calendar-container').exists()).toBe(false);
  });

  it('renders the input component', () => {
    const wrapper = mountWithCustomWrappers(<App />);
    expect(wrapper.findByDataTest('input-field').exists()).toBe(true);
  });

  it('renders the calendar image icon component', () => {
    const wrapper = mountWithCustomWrappers(<App />);
    expect(wrapper.findByDataTest('calendar-icon').exists()).toBe(true);
  });

  it('renders the date picker when the calendar image icon is clicked', () => {
      const wrapper = mountWithCustomWrappers(<App />);
      const calendarImg = wrapper.findByDataTest('calendar-icon').at(0);
      calendarImg.click();
      expect(wrapper.findByDataTest('calendar-container').at(0).exists()).toBe(true)
  });

  it('renders today\'s date when date picker is first rendered', () => {
    //TODO
  });

  it('renders the correct date based on which date is clicked', () => {
    //TODO
  });

})


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { expect, shallow } from 'enzyme';
import CalendarContainer from './CalendarContainer';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe('<CalendarContainer />', () => {
  it('renders a <CalendarComponent /> when the calendar icon is clicked', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CalendarContainer />, div);
  })
})

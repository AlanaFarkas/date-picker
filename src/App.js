import React, { Component } from 'react';
import calendarIcon from './assets/calendar_icon.svg';
import Input from './Input'
import styled from 'styled-components';
import CalendarContainer from './CalendarContainer';

export default class App extends Component {

  state = {
    openCalendar: false,
  }

  showCalendar = () => {
    return this.setState(prevState => ({
      openCalendar: !prevState.openCalendar
    }));
  }

  maybeRenderCalendar() {
    const { openCalendar } = this.state;

    if (!openCalendar) {
      return null;
    }

    return (
      <CalendarContainer />
    );

  }

  render() {
    return (
      <AppContainer>
        <h1>Choose a date</h1>
        <InputContainerDiv>
          <Input onClick={this.showCalendar} />
          <CalendarImg onClick={this.showCalendar} src={calendarIcon} />
        </InputContainerDiv>
        {this.maybeRenderCalendar()}
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  text-align: center;
`;

const InputContainerDiv = styled.div`
  display: inline-block;
  position: relative;
`;

const CalendarImg = styled.img`
  height: 25px;
  position: absolute;
  right: 3px;
  top: 3px;
`;

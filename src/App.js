import React, { Component } from 'react';
import styled from 'styled-components';
import calendarIcon from './assets/calendar_icon.svg';
import Input from './Input'
import Calendar from './Calendar';

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
      <Calendar />
    );

  }

  render() {
    return (
      <AppContainer data-test="app-container">
        <AppHeader data-test="app-header">Choose a date</AppHeader>
        <InputContainerDiv>
          <Input
            onClick={this.showCalendar}
          />
          <CalendarImg
            data-test="calendar-icon"
            onClick={this.showCalendar}
            src={calendarIcon}
          />
        </InputContainerDiv>
        {this.maybeRenderCalendar()}
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.h1`
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

import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
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
        <AppHeaderRow justify={"center"} data-test="app-header">
          <AppHeaderColumn>
            <HeaderText>Datepicker</HeaderText>
            <InputContainerDiv>
              <Input />
              <CalendarImg
                data-test="calendar-icon"
                onClick={this.showCalendar}
                src={calendarIcon}
              />
            </InputContainerDiv>
          </AppHeaderColumn>
        </AppHeaderRow>
        {this.maybeRenderCalendar()}
      </AppContainer>
    );
  }
}

const AppContainer = styled(Container)`
  text-align: center;
`;

const AppHeaderRow = styled.div``;

const AppHeaderColumn = styled.div``;

const HeaderText = styled.h2`
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

import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import calendarIcon from './assets/calendar_icon.svg';
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
        <AppHeaderRow data-test="app-header-row">
          <AppHeaderColumn>
            <HeaderText>Datepicker</HeaderText>
          
            <CalendarImg
              data-test="calendar-icon"
              onClick={this.showCalendar}
              src={calendarIcon}
            />
          </AppHeaderColumn>
        </AppHeaderRow>     
        {this.maybeRenderCalendar()}
      </AppContainer>
    );
  }
}

const AppContainer = styled(Container)``;
const AppHeaderRow = styled(Row)``;

const AppHeaderColumn = styled(Col)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.h2`
  text-align: center;
`;

const CalendarImg = styled.img`
  height: 40px;
  margin-left: 10px;
`;

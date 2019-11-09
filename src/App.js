import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { bounceInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
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
    const { openCalendar } = this.state;
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
            <ClickMe show={openCalendar}>&larr;Click to get started</ClickMe>
          </AppHeaderColumn>
        </AppHeaderRow>     
        {this.maybeRenderCalendar()}
      </AppContainer>
    );
  }
}

const bounceInRightInstructions = keyframes `${bounceInRight}`;

const AppContainer = styled(Container)`
  margin-top: 25px;
  max-width: 840px!important;
`;

const AppHeaderRow = styled(Row)``;

const AppHeaderColumn = styled(Col)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ClickMe = styled.p`
  animation: 2s ${bounceInRightInstructions};
  display: ${props => props.show ? 'none' : 'block'};
`;

const HeaderText = styled.h2`
  text-align: center;
`;

const CalendarImg = styled.img`
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
`;

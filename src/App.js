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
        <AppHeaderRow data-test="app-header-row">
          <AppHeaderColumn>
            <HeaderText>Datepicker</HeaderText>
          </AppHeaderColumn>
        </AppHeaderRow>
        <InputRow data-test="input-row">
          <InputColumn data-test="input-column-">
            <Input />
            <CalendarImg
              data-test="calendar-icon"
              onClick={this.showCalendar}
              src={calendarIcon}
            />
          </InputColumn>
        </InputRow>        
        {this.maybeRenderCalendar()}
      </AppContainer>
    );
  }
}

const AppContainer = styled(Container)`
`;

const AppHeaderRow = styled(Row)``;

const AppHeaderColumn = styled(Col)``;

const HeaderText = styled.h2`
  text-align: center;
`;

const InputRow = styled(Row)`
  // display: inline-block;
  // position: relative;
`;

const InputColumn = styled(Col)``;

const CalendarImg = styled.img`
  height: 25px;
  position: absolute;
  // right: 3px;
  // top: 3px;
`;

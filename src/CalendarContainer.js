import React, { Component } from 'react';
import styled from 'styled-components';
import { ALL_DAYS } from './constants';

export default class CalendarContainer extends Component {

    renderDaysOfTheWeek() {
        const dayStrings = ALL_DAYS.map((day, i) => {
          return <WeekDayData key={i}>{day}</WeekDayData>
        });
        return dayStrings;
      }

    render() {
        const {year, month, days, dates, handleNext, handlePrev} = this.props;
        return (
            <Calendar>
                <CalendarTable>
                    <CalendarCaption>
                        <PrevButton onClick={handlePrev}>Prev</PrevButton>
                        <CalendarMonthYear>{month} {year}</CalendarMonthYear>
                        <NextButton onClick={handleNext}>Next</NextButton>
                    </CalendarCaption>
                    <tbody>
                        <Weekdays>{this.renderDaysOfTheWeek()}</Weekdays>
                        {dates}
                    </tbody>
                </CalendarTable>
            </Calendar>
        )
    }

}

const Calendar = styled.div`
    width: 700px;
    padding: 20px;
    margin: 30px auto 0;
`;

const CalendarTable = styled.table`
    width: 100%;
    table-layout: fixed;
`;

const PrevButton = styled.button`
    float: left;
`;

const NextButton = styled.button`
    float: right
`;

const CalendarCaption = styled.caption`
    margin-bottom: 20px;
`;

const CalendarMonthYear = styled.div`
    font-size: 18px;
    text-align: center;
    display: inline-block;
    font-weight: bold;
`;

const Weekdays = styled.tr`
    font-weight: bold;
`;

const WeekDayData = styled.td`
  padding-bottom: 20px;
`;



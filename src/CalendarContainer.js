import React from 'react';
import styled from 'styled-components';

const CalendarContainer = ({year, month, days, dates, handleNext, handlePrev}) => {

    return (
        <Calendar>
            <CalendarTable>
                <CalendarCaption>
                    <PrevButton onClick={handlePrev}>Prev</PrevButton>
                    <CalendarMonthYear>{month} {year}</CalendarMonthYear>
                    <NextButton onClick={handleNext}>Next</NextButton>
                </CalendarCaption>
                <tbody>
                    <Weekdays>{days}</Weekdays>
                    {dates}
                </tbody>
            </CalendarTable>
        </Calendar>
    )
}

export default CalendarContainer;

const Calendar = styled.div`
    width: 700px;
    padding: 20px;
    margin: auto;
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



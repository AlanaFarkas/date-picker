import React from 'react';
import styled from 'styled-components';

const CalendarContainer = ({year, month, days, dates, handleNext, handlePrev}) => {

    return (
        <Calendar>
            <CalendarTable>
                <thead>
                    <tr>
                        <PrevButton onClick={handlePrev}>Prev</PrevButton>
                        <TableHeading>{month}</TableHeading>
                        <TableHeading>{year}</TableHeading>
                        <NextButton onClick={handleNext}>Next</NextButton>
                    </tr>
                </thead>
                <tbody>
                    {days}
                    {dates}
                </tbody>

            </CalendarTable>
        </Calendar>
    )
}

export default CalendarContainer;

const Calendar = styled.div`
    border: 1px red solid;
    border-radius: 5px;
    width: 600px;
    padding: 20px;
    margin: auto;
`;

const CalendarTable = styled.table`
    width: 100%;
`;

const PrevButton = styled.th`
  
`;

const NextButton = styled.th`
    
`;

const TableHeading = styled.th`
    font-size: 16px;
`;



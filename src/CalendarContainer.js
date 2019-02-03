import React from 'react';
import { ALL_MONTHS, TODAY } from './constants';

const CalendarContainer = (props) => {
    let monthString = ALL_MONTHS[TODAY.getMonth()];
    console.log(monthString);
    return (
    <table>
        <tbody>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th> 
                <th>Age</th>
            </tr>
            <tr>
                <td>Jill</td>
                <td>Smith</td> 
                <td>50</td>
            </tr>
            <tr>
                <td>Eve</td>
                <td>Jackson</td> 
                <td>94</td>
            </tr>
        </tbody>
    </table>
    )
}

export default CalendarContainer;
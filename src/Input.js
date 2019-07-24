import React from 'react';
import styled from 'styled-components';

const Input = () => {
    return (
        <TimeDateInput
            data-test='input-field'
            type='text'
        />
    )
}

export default Input;

const TimeDateInput = styled.input`
    height: 25px;
    width: 200px;
`;
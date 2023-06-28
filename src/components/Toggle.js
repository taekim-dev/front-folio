import React from 'react'
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa';

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  position: fixed;
  right: 15px;
  top: 15px;
`;

const Toggle = ({ theme, toggleTheme }) => {
    return (
        <Button onClick={toggleTheme} >
          {theme === 'light' ?  <FaMoon /> : <FaSun />}
        </Button>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;

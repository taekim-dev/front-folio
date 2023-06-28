import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import Toggle from './components/Toggle';
import styled from 'styled-components';

const StyledApp = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  transition: all 0.25s linear;
`;

function App() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <>
            <Toggle theme={theme} toggleTheme={toggleTheme} />
            <StyledApp>
              // Your content goes here. For example:
              <h1>Hello, I'm Taewan Kim</h1>
              <p>I am a software engineer</p>
              // And so on...
            </StyledApp>
          </>
        </ThemeProvider>
    );
}

export default App;

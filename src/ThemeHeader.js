import React, { Component } from "react";
import styled, { keyframes, ThemeProvider} from "styled-components";

import {theme1,theme2} from './theme/globalStyle'
import ThemeSelected from "./components/ThemeSelected";

const logo =
  "https://user-images.githubusercontent.com/234708/37256552-32635a02-2554-11e8-8fe3-8ab5bd969d8e.png";

const AppWrapper = styled.div`
  text-align: center;
`;

const AppHeader = styled.div`
  height: 12rem;
  padding: 1rem;
  color: ${props => props.theme.dark};
  background-color: ${props => props.theme.primary};
`;

const AppTitle = styled.h1`
  font-weight: 900;
`;

const rotate360 = keyframes`
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
`;

const AppLogo = styled.img`
  animation: ${rotate360} infinite 2s linear;
  height: 80px;
  &:hover {
    animation: ${rotate360} infinite 0.5s linear;
  }
`;




class ThemeHeader extends Component {
  state = {
    theme: theme1
  };
  handleThemeChange = e => {
    let theme = e.target.value;
    theme === "theme1" ? (theme = theme1) : (theme = theme2);
    this.setState({ theme });
  };
  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <AppWrapper>
          <AppHeader>
            <AppLogo src={logo} alt="logo" />
            <AppTitle>Choose Your Theme Header Color-Background</AppTitle>
          </AppHeader>
          <ThemeSelected handleThemeChange={this.handleThemeChange} />
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default ThemeHeader;

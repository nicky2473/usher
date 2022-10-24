import type { NextPage } from "next";
import React from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/css";

import { ReactComponent as Maze } from "../public/svg/maze.svg";

const rotate = keyframes`
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }

  to {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }  
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 50px;
    font-weight: bold;
  }

  .description {
    font-size: 35px;
  }
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Maze
        width="400px"
        height="400px"
        className={css`
          animation: ${rotate} 30s ease infinite;
        `}
      />
      <div className="title">USHER</div>
      <div className="description">Auto Escape-Room Reservation System</div>
    </Container>
  );
};

export default Home;

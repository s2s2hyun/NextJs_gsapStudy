import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { gsap } from "gsap";

export default function Stagger() {
  useEffect(() => {
    gsap.from(".stage > div", {
      opacity: 0,

      duration: 2,
      stagger: 0.5,
    });
  }, []);

  return (
    <Wrapper>
      <div className="stage">
        <div className="orange"></div>
        <div className="blue"></div>
        <div className="pink"></div>
        <div className="green"></div>
        <div className="orange"></div>
        <div className="blue"></div>
        <div className="pink"></div>
        <div className="green"></div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100vh;

  .stage {
    width: 90vw;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .stage > div {
    width: 102px;
    height: 88px;
    background-size: cover;
    /* width: 60px;
  height: 52px;
  flex-shrink: 0; */
  }

  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    color: #fff;
    white-space: nowrap;
  }
  .orange {
    background: url(https://simseonbeom.github.io/Final/assets/tiger/orange.png);
  }

  .green {
    background: url(https://simseonbeom.github.io/Final/assets/tiger/green.png);
  }

  .blue {
    background: url(https://simseonbeom.github.io/Final/assets/tiger/blue.png);
  }

  .pink {
    background: url(https://simseonbeom.github.io/Final/assets/tiger/pink.png);
  }
`;

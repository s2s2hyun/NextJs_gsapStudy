import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";

export default function Transform() {
  const DivRef = useRef(null);
  const orangeRef = useRef(null);
  const pinkRef = useRef(null);
  const blueRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({});
    tl.from(orangeRef.current, { opacity: 0, y: 50 })
      .from(pinkRef.current, { opacity: 0, y: -50 })
      .from(blueRef.current, { opacity: 0, scale: 1.2 });
  });

  return (
    <Wrapper>
      <div className="stage">
        <div className="orange" ref={orangeRef}></div>
        <div className="pink" ref={pinkRef}></div>
        <div className="blue" ref={blueRef}></div>
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
    width: 500px;
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

import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";
export default function GsapDealyed() {
  console.log("Component rendered");
  let tl = gsap.timeline();
  useEffect(() => {
    //   gsap.delayedCall(1, myFunction, ["param1", "param2"]);

    //   function myFunction(param1, param2) {
    //     //do stuff
    //   }
    //    delayedCall 로 매개변수 2개를 전달해야되는 Docs 내용인데 굳이 함수를 따로 안빼도
    //   callback 함수로 따로 안빼고 사용이 가능하다

    return () => {
      tl.to(".orange", {
        duration: 2,
        x: 300,
      })
        .addPause(">", wait, [2])
        .to(".blue", { duration: 2, x: 300 });
    };
  }, []);
  function wait(sec: number) {
    gsap.delayedCall(sec, () => {
      tl.play();
    });
  }
  return (
    <Wrapper>
      <div className="stage">
        <div className="orange"></div>
        <div className="blue"></div>
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
    align-items: flex-start;
    flex-direction: column;
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

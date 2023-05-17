import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";
export default function StaggerLoopAnimation() {
  // useEffect(() => {
  //   gsap.to(".tiger > div", {
  //     y: 100,
  //     stagger: {
  //       each: 0.5,
  //       repeat: -1,
  //       yoyo: true,
  //     },
  //   });
  // }, []);

  useEffect(() => {
    const l = 8 * 13;

    for (let i = 0; i < l; i++) {
      let template = ` <div class="box" data-index="i"></div>`;

      document
        .querySelector(".stage")
        ?.insertAdjacentHTML("beforeend", template);
    }

    gsap.to(".box", {
      duration: 1,
      scale: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power1",
      stagger: {
        each: 0.1,
        from: "edges",
        grid: "auto",
        //grid 미친 개쩌네
        // axis: "x",
        // axis x 축 , y축
      },
    });
  });

  return (
    <Wrapper>
      {/* <div className="tiger">
        <div className="orange"></div>
        <div className="pink"></div>
        <div className="blue"></div>
      </div> */}

      <div className="stage"></div>
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
  .tiger {
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

  .tiger > div {
    width: 102px;
    height: 88px;
    background-size: cover;
  }

  .stage {
    width: 600px;
    height: 350px;
    position: absolute;
    left: 50%;
    /* top: 50%; */
    transform: translate(-50%, -50%);
  }

  .stage > div {
    display: inline-block;
    width: 5.166667%;
    margin: 0px 1.5% 1.5% 0px;
    background: #88ce02;
    position: relative;
  }

  .box:before {
    padding-top: 100%;
    content: "";
    display: block;
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

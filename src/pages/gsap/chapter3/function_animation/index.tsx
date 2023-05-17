import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";

function custom(index: number, target: any, arr: any[]) {
  //   if (index % 2 !== 0) {
  //     return 100;
  //   } else {
  //     return index * 30;
  //   }

  // javascript classList.contains 클래스포함유무의 true false
  if (target.classList.contains("orange")) {
    return 100;
  } else {
    return 0;
  }

  //   return index * 30;
}

export default function FunctionAnimation() {
  //  ex) const result =  condition ? value : value2
  // y: 여기에 값을 조건문을 줄수가 없으니 함수로 주면 할수있다.

  //   useEffect(() => {
  //     gsap.to(".box", {
  //       y: custom,
  //       x: custom,
  //       rotation: custom,
  //       stagger: 0.1,
  //     });
  //   });

  useEffect(() => {
    gsap.to(".blue , .pink", {
      rotation: (index, target, array) => {
        // if (index % 2 === 0) {
        //   return 360;
        // } else {
        //   return -360;
        // }
        if (target.classList.contains("pink")) {
          return 360;
        } else {
          return -360;
        }
      },
      repeat: -1,
      duration: (index, target) => {
        if (target.classList.contains("pink")) {
          return 0.5;
        }

        return 1;
      },
      ease: "none",
    });
  });

  return (
    <Wrapper>
      {/* <div className="stage">
        <div className="box">1</div>
        <div className="box">2</div>
        <div className="box orange">3</div>
        <div className="box">4</div>
        <div className="box">5</div>
        <div className="box orange">6</div>
        <div className="box">7</div>
        <div className="box">8</div>
        <div className="box">9</div>
        <div className="box">10</div>
      </div> */}

      <div className="wrap">
        <div className="blue"></div>
        <div className="pink"></div>
        <div className="blue"></div>
        <div className="pink"></div>
        <div className="blue"></div>
        <div className="pink"></div>
        <div className="blue"></div>
        <div className="pink"></div>
        <div className="blue"></div>
        <div className="pink"></div>
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
    /* height: 100vh; */
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .box {
    width: 50px;
    height: 50px;
    background: dodgerblue;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .orange {
    background: orange;
  }

  .wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .blue {
    width: 102px;
    height: 88px;
    background: url(https://simseonbeom.github.io/Final/assets/tiger/blue.png);
    background-size: contain;
  }

  .pink {
    width: 102px;
    height: 88px;
    background: url(https://simseonbeom.github.io/Final/assets/tiger/pink.png);
    background-size: contain;
  }
`;

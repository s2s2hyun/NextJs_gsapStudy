import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";

export default function DistributeAnimation() {
  // 1.첫번째 div bar 에 0을 줄것이고 마지막 div bar 에는 300 을 줘볼것이다.
  // 유틸 메서드인 distribute 값을 알아서 분배해주는 기능이 있다.

  // 2.distribute 는 값에 대한 분배일뿐 from center 로 하면 좌측으로 나오는게 맞다. 아래 gsap 에 stagger 를 from : "center" 로 변경을 안했으니
  // 좌측부터 나오는게 맞다.
  const Value = gsap.utils.distribute({
    base: 0,
    amount: 400,
    // ease: "power3",
    from: "center",
  });

  useEffect(() => {
    gsap.to(".bar", {
      height: Value,
      duration: 2,
      stagger: {
        each: 0.1,
        // ease: "power3.inOut",
      },
    });
  });

  return (
    <Wrapper>
      <div className="stage">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
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
    font-size: 3rem;
    color: #fff;
    justify-content: center;
    align-items: flex-end;
    gap: 0.5vw;
  }

  .stage > div {
    flex: 1;
    height: 0;
    background: gray;
  }
`;

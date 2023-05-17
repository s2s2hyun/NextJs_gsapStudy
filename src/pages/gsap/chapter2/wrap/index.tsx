import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";

export default function GsapWrap() {
  //서로 다른 항목들이 다른 방향에서 등장하거나 색상의 배열을 사용하여 색을 지정하고 싶다면 , GSAP 의 유틸 메서드인 wrap 을 사용할수 있다.

  // gsap.util.wrap() 의 핵심은 함수 기반의 값을 사용합니다. 트윈 값으로 사용되는 함수는 대상 배열에 있는 요소의 현재 인덱스를 나타내는 인덱스 값이 자동으로 전송

  // 굉장히 많이 사용되는 유틸함수이다.

  const stageRef = useRef(null);
  const textRef = useRef(null);

  //   gsap.to(stageRef.current, {
  //     autoAlpha: 1,
  //   });

  useEffect(() => {
    const splitText = new SplitText(textRef.current);
    const chars = splitText.chars;

    // 타임라인 선언
    const tl = gsap.timeline();
    gsap.to(stageRef.current, {
      autoAlpha: 1,
    });

    tl.from(chars, {
      opacity: 0,

      // gsap.utils.warp([]) 배열안에 값을 넣어주면 홀수니 짝수니 편하게 이렇게 애니메이션을 받아갈수있다.
      y: gsap.utils.wrap([100, -100]),
      stagger: {
        each: 0.05,
        from: "edges",
      },
      duration: 1,
      ease: "power2.out",
    }).to(chars, {
      x: 10,
      //   y: gsap.utils.wrap([0, 200, 0, 200, 0, 200]),
      //함수형으로도 가능이 하다
      //  y: () => {}
      color: gsap.utils.wrap(["red", "blue", "green", "yellow"]),
      stagger: {
        each: 0.05,
      },
    });

    // // 타이핑 효과
    // gsap.fromTo(
    //   chars,
    //   {
    //     opacity: 0,
    //   },
    //   {
    //     opacity: 1,
    //     duration: 0.8,
    //     delay: 1.5,
    //     stagger: 0.05,
    //     ease: "power2.out",
    //   }
    // );
  }, []);

  return (
    <Wrapper>
      <div className="stage" ref={stageRef}>
        <h1 ref={textRef}>Learning to GSAP Advanced</h1>
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
    width: 70vw;
    background: #222;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    font-size: 2vw;
    visibility: hidden;
  }
`;

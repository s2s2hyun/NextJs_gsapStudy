import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";

export default function Transform() {
  const boxesRef = useRef([
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
  ]);
  const boxRef = useRef(null);

  useEffect(() => {
    // 소실점을 같은 각각에게 동일하게 주려고 이렇게 set 을 하고있다 .
    gsap.set(".box", {
      transformPerspective: 600,
    });
    gsap.to(".box", {
      // 3d 느낌으로 돌리기 위해서 만든것이다.근대 원근감이 없어서 느낌이 그닥 없다 rotationY:360 만 넣기엔

      rotationY: 360,
      duration: 8,
      ease: "none",
      transformOrigin: "50% 50% -400",
    });
  }, []);

  return (
    <Wrapper>
      <div className="stage">
        <div className="box" ref={boxRef}></div>
        {/* <div className="box" ref={boxRef}></div>
        <div className="box" ref={boxRef}></div>
        <div className="box" ref={boxRef}></div>
        <div className="box" ref={boxRef}></div> */}
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
    display: flex;
    justify-content: center;
    text-align: center;
    color: #fff;
    gap: 3vw;
    // 3d 형태로 회전시키기 위해서 perspective 를 넣어주면 좀더 애니메이션을 좀더 3d 스럽게 만들수있다.
    // 갯수가 많으면 자식에게 perspective 를 줄수있다.
    /* perspective: 600px; */
  }

  .box {
    width: 20vw;
    height: 20vw;
    max-width: 100px;
    max-height: 100px;
    background: dodgerblue;
    border-radius: 10px;
    /* perspective: 600px; */
  }
`;

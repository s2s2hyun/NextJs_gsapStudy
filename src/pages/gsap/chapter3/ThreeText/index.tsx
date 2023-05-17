import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";
export default function DistributeAnimation() {
  const FirstRef = useRef(null);
  const SecondRef = useRef(null);
  const ThirdRef = useRef(null);
  const utilsRef = useRef<HTMLDivElement>(null);
  const duration = 0.5;

  useEffect(() => {
    if (utilsRef.current) {
      const children = Array.from(utilsRef.current.children);
      gsap.set(children, { transformOrigin: "50% 50% -50" });
      const tl = gsap.timeline({
        repeat: -1,
      });

      tl.fromTo(
        children,
        { rotateX: -90, rotateY: -90, opacity: 0 },
        { rotateX: 0, rotateY: 0, opacity: 1, stagger: duration }
      ).to(
        children,
        {
          rotateX: 90,
          rotateY: 90,
          opacity: 0,
          stagger: duration,
        },
        duration
      );
    }
  }, []);

  return (
    <Wrapper>
      <div className="stage">
        <div className="utils" ref={utilsRef}>
          <div>checkPrefix()</div>
          <div>clamp()</div>
          <div>distribute()</div>
          <div>getUnit()</div>

          <div>interpolate()</div>
          <div>mapRange()</div>
          <div>normalize()</div>
          <div>pipe()</div>
          <div>random()</div>
          <div>selector()</div>
          <div>shuffle()</div>
          <div>snap()</div>
          <div>splitColor()</div>
          <div>toArray()</div>
          <div>unitize()</div>
          <div>wrap()</div>
          <div>wrapYoyo()</div>
        </div>
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
    width: 100vw;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    font-size: 3rem;
    color: #fff;
    justify-content: center;
    align-items: center;
  }
  .utils {
    perspective: 400px;
  }

  .utils > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

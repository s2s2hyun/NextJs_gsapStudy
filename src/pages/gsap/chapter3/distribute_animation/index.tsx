import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";
export default function DistributeAnimation() {
  const TitleRef = useRef(null);

  const disX = gsap.utils.distribute({
    base: -100,
    amount: 200,
  });

  useEffect(() => {
    const splitText = new SplitText(TitleRef.current, { type: "chars" });
    console.log(splitText.chars);

    const tl = gsap.timeline({
      repeat: -1,
    });

    tl.from(splitText.chars, {
      y: gsap.utils.wrap([-10, 10]),
      opacity: 0,
      filter: "blur(10px)",
      stagger: {
        each: 0.1,
        from: "center",
      },
    })
      .to(splitText.chars, {
        delay: 1,
        x: disX,
        duration: 3,
        ease: "power3.inOut",
      })
      .to(splitText.chars, {
        delay: -1,
        opacity: 0,
        filter: "blur(10px)",
        stagger: {
          each: 0.1,
          from: "edges",
        },
      });
  });

  return (
    <Wrapper>
      <div className="stage">
        <h1 ref={TitleRef}>INTERSTELLAR</h1>
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
  h1 {
    font-weight: normal;
    /* letter-spacing: 1.5rem; */
  }
  .stage {
    width: 100vw;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    font-size: 3vw;
    color: #fff;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;

import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";

export default function Transform() {
  const DivRef = useRef(null);
  const texth1Ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    gsap.to(DivRef.current, {
      autoAlpha: 1,
    });

    gsap.registerEffect({
      name: "text3D",
      extendTimeline: true,
      defaults: {
        deg: 360,
      },
      effect: (target: any, config) => {
        const splitTextOne = new SplitText(target, { type: "chars" });
        gsap.set(splitTextOne.chars, {
          transformPerspective: 400,
        });

        console.log(splitTextOne.chars, " splitTextOne");

        const tl = gsap.timeline();

        tl.to(splitTextOne.chars, {
          duration: 1.2,
          rotationY: config.deg,
          ease: "back(3)",
          stagger: {
            amount: 1,
          },
        });
        return tl;
      },
    });

    const animation = gsap.timeline();

    animation.text3D(texth1Ref.current);

    // gsap.effects.text3D(texth1Ref.current);
  }, []);

  return (
    <Wrapper>
      <div className="stage" ref={DivRef}>
        <h1 ref={texth1Ref}> Animation class so crazy </h1>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 2vw;
    visibility: hidden;
  }

  h1 {
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1vw;
  }
`;

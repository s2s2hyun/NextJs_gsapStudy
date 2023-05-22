import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
// import { TextPlugin } from "gsap/TextPlugin";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";

// gsap.registerPlugin(TextPlugin);
export default function GsapTimelineControll() {
  const orangeRef = useRef<HTMLDivElement | null>(null);
  const blueRef = useRef<HTMLDivElement | null>(null);
  const pinkRef = useRef<HTMLDivElement | null>(null);
  const greenRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      orangeRef.current &&
      quoteRef.current &&
      blueRef.current &&
      pinkRef.current &&
      greenRef.current
    ) {
      gsap.set([greenRef.current, quoteRef.current], { y: 120 });

      // const tl = gsap
      //   .timeline({
      //     defaults: {
      //       duration: 1,
      //     },
      //   })

      gsap.defaults({
        duration: 1,
      });

      const orangeAnimation = gsap
        .timeline()
        .to(orangeRef.current, { scale: 2 })
        .to(orangeRef.current, { rotation: 360 })
        .to(orangeRef.current, { scale: 1 });
      const blueAnimation = gsap
        .timeline()
        .to(blueRef.current, { y: 150 })
        .to(blueRef.current, { rotation: 360 })
        .to(blueRef.current, { y: 0 });
      const pinkAnimation = gsap
        .timeline()
        .to(pinkRef.current, { scale: 0.5 })
        .to(pinkRef.current, { rotation: -360 })
        .to(pinkRef.current, { scale: 1 });

      const masterTimeline = gsap
        .timeline()
        .add(orangeAnimation)
        .add(quoteAnimaiton("orange tiger"))
        .add(blueAnimation)
        .add(quoteAnimaiton("blue tiger"))
        .add(pinkAnimation)
        .add(quoteAnimaiton("pink tiger"));
    }
  }, []);

  function tigerAnimation() {
    const orangeAnimation = gsap
      .timeline()
      .to(orangeRef.current, { scale: 2 })
      .to(orangeRef.current, { rotation: 360 })
      .to(orangeRef.current, { scale: 1 });
    const blueAnimation = gsap
      .timeline()
      .to(blueRef.current, { y: 150 })
      .to(blueRef.current, { rotation: 360 })
      .to(blueRef.current, { y: 0 });
    const pinkAnimation = gsap
      .timeline()
      .to(pinkRef.current, { scale: 0.5 })
      .to(pinkRef.current, { rotation: -360 })
      .to(pinkRef.current, { scale: 1 });

    return [orangeAnimation, blueAnimation, pinkAnimation];
  }

  function quoteAnimaiton(message: string) {
    const tl = gsap
      .timeline()
      .call(() => {
        if (quoteRef.current) {
          quoteRef.current.innerHTML = message;
        }
      })
      .to([greenRef.current, quoteRef.current], {
        y: 0,
        stagger: 0.2,
        repeat: 1,
        yoyo: true,
        repeatDelay: 1,
      });

    return tl;
  }

  return (
    <Wrapper>
      <div className="stage">
        <div className="orange" ref={orangeRef}></div>
        <div className="blue" ref={blueRef}></div>
        <div className="pink" ref={pinkRef}></div>

        <div className="tiger">
          <div className="green" ref={greenRef}></div>
          <div className="quote" ref={quoteRef}>
            hello tiger !
          </div>
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
    width: 700px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    border: 1px solid #ffffff1b;
    padding: 2rem;
    overflow: hidden;
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
    width: 102px;
    height: 88px;
    background: url(https://simseonbeom.github.io/Final/assets/tiger/green.png);
    background-size: cover;
    flex-shrink: 0;
  }

  .blue {
    background: url(https://simseonbeom.github.io/Final/assets/tiger/blue.png);
  }

  .pink {
    background: url(https://simseonbeom.github.io/Final/assets/tiger/pink.png);
  }

  .tiger {
    position: absolute;
    left: 30%;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .quote {
    font-size: 2rem;
    color: #fff;
    white-space: nowrap;
  }
`;

import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";
export default function GsapAnimationController() {
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        scale: 0,
        opacity: 0,
        duration: 1,
      },
    });

    if (prevRef?.current) {
      prevRef?.current.addEventListener("click", () => {
        tl.reverse();
      });
    }

    if (nextRef?.current) {
      nextRef?.current.addEventListener("click", () => {
        tl.play();
      });
    }

    tl.add("orange")
      .fromTo('.tiger[data-name="a0"]', {}, { opacity: 1, scale: 1 })
      .addPause()
      .add("green")
      .fromTo(
        '.tiger[data-name="a1"]',
        {},
        { opacity: 1, scale: 1, rotation: 360 }
      )
      .addPause()
      .add("pink")
      .fromTo(
        '.tiger[data-name="a2"]',
        { y: -100 },
        { opacity: 1, scale: 1, rotation: 360, y: 0 }
      )
      .addPause()
      .add("blue")
      .fromTo(
        '.tiger[data-name="a3"]',
        { scale: 2 },
        { opacity: 1, scale: 1, rotation: -360 }
      );

    const dots = gsap.utils.toArray(".dot");

    // const handleClick = (e: any) => {
    //   // console.log(e.target.dataset.label, "타겟");
    //   const label = e.target.dataset.label;

    //   // tl.play(label);
    //   gsap.to(tl, { time: index + 1 });
    // };

    dots.forEach((dot: any, index: number) => {
      dot.addEventListener("click", (e) => {
        const label = e.target.dataset.label;

        gsap.to(tl, { time: index + 1 });
      });
    });

    return () => {
      if (prevRef?.current) {
        prevRef.current.removeEventListener("click", () => tl.reverse());
      }

      if (nextRef?.current) {
        nextRef.current.removeEventListener("click", () => tl.play());
      }

      Object.keys(tl.labels).forEach((label) => {
        const template = /* html */ `
        <div class="dot" data-label="${label}"></div>
      `;
        if (dotRef.current) {
          dotRef.current?.insertAdjacentHTML("beforeend", template);
        }
      });
      dots.forEach((dot: any, index: number) => {
        dot.addEventListener("click", (e) => {
          const label = e.target.dataset.label;

          gsap.to(tl, { time: index + 1 });
        });
      });
    };
  }, []);

  return (
    <Wrapper>
      <div className="stage">
        <div className="tiger orange" data-name="a0"></div>
        <div className="tiger green" data-name="a1"></div>
        <div className="tiger pink" data-name="a2"></div>
        <div className="tiger blue" data-name="a3"></div>
      </div>

      <div className="dotNav" ref={dotRef}></div>

      <div className="nav">
        <button className="prev" ref={prevRef}>
          ←
        </button>
        <button className="next" ref={nextRef}>
          →
        </button>
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
    width: 80vw;
    height: 70vh;
    background: #333;
    /* border: 1px solid black; */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
    font-size: 2rem;
  }

  .stage > div {
    width: 102px;
    height: 88px;
    background-size: cover;
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

  .nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 25vh;
    display: flex;
    gap: 2rem;
  }

  .nav > button {
    cursor: pointer;
    padding: 1rem;
    font-size: 1.5rem;
    transition: all 0.2s;
  }

  .nav > button:hover {
    filter: invert(1);
  }

  .dotNav {
    display: flex;
    width: 80vw;
    position: absolute;
    left: 50%;
    bottom: 500px;
    transform: translateX(-50%);
    justify-content: space-evenly;
  }

  .dotNav > div {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: deeppink;
    border: 3px solid #fff;
    cursor: pointer;
  }

  .dotNav > div:hover {
    filter: invert(1);
  }
`;

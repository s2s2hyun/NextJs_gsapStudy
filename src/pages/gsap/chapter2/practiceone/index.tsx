import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";

interface EffectConfig {
  y?: number;
  opacity?: number;
}

export default function ClearProps() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const thirdText = useRef(null);
  const fourthText = useRef(null);

  useEffect(() => {
    gsap.set(".bg > div", {
      xPercent: -10,
      opacity: 0,
    });

    gsap.registerEffect({
      name: "textEffect",
      extendTimeline: true,
      defaults: {
        y: 30,
        opacity: 0,
      },
      effect: (target: any, config: EffectConfig) => {
        // console.log(target[0].dataset.index, "타겟 "); 1,2,3,4 를 찍어주고있다.
        const index = target[0].dataset.index;
        const tl = gsap.timeline();
        const FirstSplit = new SplitText(target, { type: "chars" });
        // const { y } = config.y;
        // const { opacity } = config.opacity;
        tl.from(FirstSplit.chars, {
          y: config.y,
          opacity: config.opacity,
          stagger: 0.1,
        })
          .to(
            `.bg>div:nth-child(${index})`,
            {
              xPercent: 0,
              opacity: 1,
            },
            0
          )
          .to(FirstSplit.chars, {
            delay: 1,
            opacity: config.opacity,
            stagger: 0.03,
          })
          .to(
            `.bg>div:nth-child(${index})`,
            {
              delay: 1,
              xPercent: 10,
              opacity: 0,
            },
            "<"
          );

        return tl;
      },
    });

    textAnimaiton();
  }, []);

  // 텍스트 애니메이션
  const textAnimaiton = () => {
    const animation = gsap.timeline();
    animation
      .add(gsap.effects.textEffect(firstText.current))
      .add(gsap.effects.textEffect(secondText.current))
      .add(gsap.effects.textEffect(thirdText.current))
      .add(gsap.effects.textEffect(fourthText.current));

    animation.eventCallback("onUpdate", () => {
      //   console.log(animation.progress());
      if (animation.progress() === 1) {
        animation.restart();
      }
    });
  };

  return (
    <Wrapper>
      <div className="word">
        <div className="ex1" data-index="1" ref={firstText}>
          Relaxing <span>PIC</span>
        </div>
        <div className="ex2" data-index="2" ref={secondText}>
          Exciting <span>PIC</span>
        </div>
        <div className="ex3" data-index="3" ref={thirdText}>
          Kid Friendly <span>PIC</span>
        </div>
        <div className="ex4" data-index="4" ref={fourthText}>
          Romantic <span>PIC</span>
        </div>
      </div>

      <div className="bg">
        <div className="ex1">
          <video autoPlay muted loop>
            <source src="/video/backVideo1.mp4" type="video/mp4" />
          </video>
          {/* <img src="/assets/images/bg01.jpg" alt="" /> */}
        </div>
        <div className="ex2">
          <video autoPlay muted loop>
            <source src="/video/backVideo2.mp4" type="video/mp4" />
          </video>
          {/* <img src="/assets/images/bg02.jpg" alt="" /> */}
        </div>
        <div className="ex3">
          <video autoPlay muted loop>
            <source src="/video/backVideo3.mp4" type="video/mp4" />
          </video>
          {/* <img src="/assets/images/bg03.jpg" alt="" /> */}
        </div>
        <div className="ex4">
          <video autoPlay muted loop>
            <source src="/video/backVideo4.mp4" type="video/mp4" />
          </video>
          {/* <img src="/assets/images/bg04.jpg" alt="" /> */}
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
  .bg {
    width: 100%;
    height: 90vh;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .bg > div {
    position: absolute;
    left: 0;
    top: 0;
  }

  .bg div::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
  }

  .bg > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bg video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: 50% 50%;
  }

  .bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  .word {
    color: #fff;
    font-size: 5rem;
    z-index: 10;
  }

  .word > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  span {
    -webkit-text-stroke: 1px;
    -webkit-text-stroke-color: #fff;
    color: transparent;
  }
`;

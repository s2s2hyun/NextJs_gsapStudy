import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";

interface EffectConfig {
  y?: number;
  colors?: string[];
}

export default function GsapWrap() {
  //서로 다른 항목들이 다른 방향에서 등장하거나 색상의 배열을 사용하여 색을 지정하고 싶다면 , GSAP 의 유틸 메서드인 wrap 을 사용할수 있다.

  // gsap.util.wrap() 의 핵심은 함수 기반의 값을 사용합니다. 트윈 값으로 사용되는 함수는 대상 배열에 있는 요소의 현재 인덱스를 나타내는 인덱스 값이 자동으로 전송

  // 굉장히 많이 사용되는 유틸함수이다.

  const stageRef = useRef<HTMLDivElement | null>(null);
  const texth1Ref = useRef<HTMLHeadingElement | null>(null);
  const texth2Ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    // const splitTextOne = new SplitText(texth1Ref.current, { type: "chars" });
    // const charsOne = splitTextOne.chars;

    const splitTextTwo = new SplitText(texth2Ref.current, { type: "chars" });
    const charsTwo = splitTextTwo.chars;

    gsap.to(stageRef.current, {
      autoAlpha: 1,
    });

    gsap.registerEffect({
      name: "textEffect",
      extendTimeline: true,
      defaults: {
        y: -100,
        colors: ["red", "orange"],
      },
      effect: (targets: any, config: EffectConfig) => {
        const splitTextOne = new SplitText(targets, { type: "chars" });
        const tl = gsap.timeline();
        tl.from(splitTextOne.chars, {
          y: config.y,
          opacity: 0,
          stagger: 0.05,
        }).to(splitTextOne.chars, {
          color: (i: number) =>
            config.colors ? config.colors[i % config.colors.length] : "red",
        });
        return tl;
      },
    });

    // useRef(null) 초기값이 null 이것은 필요한 작업입니다. 왜냐하면 컴포넌트가 마운트되기 전에는 참조값이 null 이며 null 에 대해 gsap.effects.textEffect()를 호출하려고 하면 오류가 발생하기 때문입니다.
    // 만약 참조값이 정의되어 있다면 , 등록된 "textEffect" 를 참조가 가리키는 요소에 적용합니다.
    const animation = gsap.timeline();
    if (texth1Ref.current && texth2Ref.current) {
      animation
        .textEffect(texth1Ref.current)
        .textEffect(texth2Ref.current, {
          y: " random(-100 , 100)",
          colors: ["blue", "white"],
        });
      //   animation.add(gsap.effects.textEffect(texth1Ref.current)).add(
      //     gsap.effects.textEffect(texth2Ref.current, {
      //       y: 100,
      //       colors: ["blue", "white", "yellow"],
      //     }),
      // "<" 는 동시 texth1Ref.current && texth2Ref.current 실행을 하기 위해서 만든것 지우면 add 한 순서대로
      // "<"
      //   );
    }
  }, []);

  // const tl = gsap.timeline();
  // tl.from(charsOne, { y: -100, opacity: 0, stagger: 0.05 }).to(charsOne, {
  //   color: gsap.utils.wrap(["red", "orange", "yellow", "blue"]),
  // });

  // const tl2 = gsap.timeline();
  // tl2.from(charsTwo, { y: -100, opacity: 0, stagger: 0.05 }).to(charsTwo, {
  //   color: gsap.utils.wrap(["red", "orange", "yellow", "blue"]),
  // });

  return (
    <Wrapper>
      <div className="stage" ref={stageRef}>
        <h1 ref={texth1Ref}>Learning to GSAP Advanced</h1>
        <h2 ref={texth2Ref}>GSAP Method resigterEffect</h2>
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
    font-size: 2vw;
  }
`;

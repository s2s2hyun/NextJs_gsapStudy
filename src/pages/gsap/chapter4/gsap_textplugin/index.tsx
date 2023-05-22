import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import Draggable from "gsap/dist/Draggable";
import { TextPlugin } from "gsap/dist/TextPlugin";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";
import { delimiter } from "path";
gsap.registerPlugin(TextPlugin); // TextPlugin을 등록합니다.
export default function GsapTimelineControll() {
  const h1ref = useRef<HTMLHeadingElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState<string[]>([
    "html",
    "css",
    "javascript",
    "react",
    "gsap",
  ]); // useState를 사용해 text를 상태로 만듭니다.
  // useState를 사용해 text를 상태로 만듭니다.
  function typing(arr: string[]) {
    if (h1ref.current) {
      const tl = gsap.timeline().fromTo(
        h1ref.current,
        { text: "" },
        {
          duration: arr[0] === "javascript" ? 0.8 : 0.4,
          text: arr[0],
          repeat: 1,
          yoyo: true,
          repeatDelay: 1,
        }
      );

      const newText = [...text];
      const shifted = newText.shift();

      if (shifted) {
        newText.push(shifted);
      }

      setText(newText);
    }
  }

  function cursor() {
    gsap.to(spanRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.3,
      repeatDelay: 0.4,
    });
  }

  useEffect(() => {
    cursor();
    let delayId: gsap.core.Tween | null;
    // void 형식이기에 화살표 함수로 typing에 매개변수로 (text) 로 전달이 가능하다
    delayId = gsap.delayedCall(3, () => typing(text));

    return () => {
      if (delayId) {
        delayId.kill();
      }
    };
  }, [text]);
  return (
    <Wrapper>
      <div className="stage">
        <div>I'M</div>
        <div className="textField">
          <h1 className="big" ref={h1ref}></h1>
          <span className="cursor" ref={spanRef}></span>
        </div>
        <div className="developer">DEVELOPER</div>
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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
    font-size: 2rem;
  }

  .textField {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h1 {
    margin: 0;
    min-height: 80px;
    text-transform: uppercase;
  }

  .old {
    color: red;
  }

  .new {
    color: #fff;
  }

  .cursor {
    display: inline-block;
    height: 60px;
    width: 5px;
    background: #fff;
    position: relative;
    top: -10px;
    left: 10px;
  }
`;

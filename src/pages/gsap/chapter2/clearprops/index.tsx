import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";

export default function ClearProps() {
  const boxesRef = useRef([
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
  ]);

  //   HTML 요소들에 대한 문자열 선택자를 가지고 있다면 , gsap.utils.toArray()를 사용하여 해당 요소들을 배열로 만들 수 있습니다.
  //   const boxes = gsap.utils.toArray('.box')

  // 하지만 현재 boxesRef.current 로 이미 배열을 만들어놨기에 굳이 위와같은 방법도 있다는걸 알면 좋을꺼같다.

  useEffect(() => {
    boxesRef.current.forEach((ref) => {
      ref.current?.addEventListener("click", (event) => {
        gsap.to(event.target, { backgroundColor: "red", width: "400px" });
      });
    });
  }, []);

  return (
    <Wrapper>
      <div className="stage">
        <div className="box" ref={boxesRef.current[0]}>
          1
        </div>
        <div className="box " ref={boxesRef.current[1]}>
          2
        </div>
        <div className="box" ref={boxesRef.current[2]}>
          3
        </div>
        <div className="box" ref={boxesRef.current[3]}>
          4
        </div>
        <div className="box" ref={boxesRef.current[4]}>
          5
        </div>
        <button
          id="reset"
          type="button"
          onClick={() => {
            boxesRef.current.forEach((ref) => {
              gsap.set(ref.current, { clearProps: "all" });
            });
          }}>
          reset
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
    width: 40%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .box {
    width: 100%;
    color: #333;
    background: black;
    border-radius: 8px;
    height: 50px;
    font-size: 1em;
    text-align: center;
    line-height: 50px;
    margin-bottom: 10px;
  }

  .box:nth-child(odd) {
    background: dodgerblue;
  }

  .box:nth-child(even) {
    background: hotpink;
  }

  button {
    width: 100%;
    box-shadow: 0px 1px 0px 0px #fff6af;
    border-radius: 6px;
    border: 1px solid #ffaa22;
    display: inline-block;
    cursor: pointer;
    color: #333333;
    font-family: Arial;
    font-size: 21px;
    font-weight: bold;
    padding: 12px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #ffee66;
  }
`;

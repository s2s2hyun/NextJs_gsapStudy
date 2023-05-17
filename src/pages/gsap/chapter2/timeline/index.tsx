import React, { useEffect, useLayoutEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";

export default function TimelinePage() {
  gsap.registerPlugin(Draggable);
  // 최상단 svg 렌더링 하기 위해 set 으로 autoAlpha 1 세팅
  const svgRef = useRef(null);

  // 상단 도형 Ref
  const starRef = useRef(null);
  const circleRef = useRef(null);
  const squreRef = useRef(null);
  // 아래바 Ref
  const starBarRef = useRef(null);
  const circleBarRef = useRef(null);
  const squreBarRef = useRef(null);
  // startbar
  const startBarRef = useRef(null);
  // TextTime
  const TimeRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    gsap.set(svgRef.current, {
      autoAlpha: 1,
    });

    const animation = gsap.timeline({});

    animation
      .to(starRef.current, {
        duration: 1,
        x: 1150,
      })

      .to(circleRef.current, {
        duration: 2,
        x: 1150,
      })
      .to(squreRef.current, {
        duration: 1,
        x: 1150,
      });

    //children 은 배열로 값이 나온다 .
    const children = animation.getChildren();
    const childrenList = children.length;
    // console.log(children);

    const pixelPerSecond = 200;

    //배열에 좀더 쓰기 편한 forEach 구문으로 변경해보겠습니다.

    children.forEach((tween, index) => {
      gsap.set("#tween" + index, {
        x: tween.startTime() * pixelPerSecond,
      });
      gsap.set("#rect" + index, { width: tween.duration() * pixelPerSecond });
    });

    // for (let i = 0; i < childrenList; i++) {
    //   //   console.log(children[i].startTime());
    //   gsap.set("#tween" + i, {
    //     x: children[i].startTime() * pixelPerSecond,
    //   });
    //   gsap.set("#rect" + i, {
    //     width: children[i].duration() * pixelPerSecond,
    //   });
    // }

    const maxX = animation.duration() * pixelPerSecond;

    function handleMoveHead() {
      if (TimeRef.current) {
        TimeRef.current.textContent = animation.time().toFixed(1).toString();
        gsap.set("#playhead", { x: animation.progress() * maxX });
      }
    }

    animation.eventCallback("onUpdate", handleMoveHead);

    // 특정 #playhead 의 컨텐츠를 드래그를 해서 타임라인을 우리가 컨트롤해보자
    const dragger = Draggable.create("#playhead", {
      type: "x",
      cursor: "pointer",
      trigger: "#timeline",
      bounds: {
        minX: 0,
        maxX: maxX,
      },
      onDrag(event) {
        animation.pause();
        animation.progress(dragger[0].x / maxX);
      },
    });

    // console.log(animation.paused());
    // console.log(dragger[0].x / maxX, "dragger 는뭐니");
  }, []);

  return (
    <Wrapper>
      <svg
        ref={svgRef}
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1280 720"
        xmlSpace="preserve">
        <rect id="background" x="1" className="st0" width="1280" height="720" />
        <text
          transform="matrix(1 0 0 1 48.7741 106.0369)"
          className="st1 st2 st3">
          A tween is a single animation
        </text>
        <g id="timeline">
          <rect
            id="tween_x5F_bg"
            x="35"
            y="459.2"
            className="st4"
            width="1200"
            height="50"
          />
          <rect
            id="tween_x5F_bg_1_"
            x="34"
            y="518.8"
            className="st4"
            width="1200"
            height="50"
          />
          <rect
            id="tween_x5F_bg_2_"
            x="34"
            y="578.8"
            className="st4"
            width="1200"
            height="50"
          />

          <g id="tween2">
            <rect
              id="rect2"
              x="34"
              y="459.2"
              className="st7"
              width="200"
              height="50"
            />
            <rect
              id="squarethumb"
              x="39.3"
              y="463.5"
              className="st8"
              width="40"
              height="40"
            />
            <text
              transform="matrix(1 0 0 1 86.5923 497.4028)"
              className="st2 st6">
              tween
            </text>
          </g>
          <g id="tween1">
            <rect
              id="rect1"
              x="34"
              y="517.7"
              className="st7"
              width="200"
              height="50"
            />
            <circle
              id="circlethumb"
              className="st9"
              cx="60"
              cy="543.8"
              r="20"
            />
            <text
              transform="matrix(1 0 0 1 86.6084 555.8825)"
              className="st2 st6">
              tween
            </text>
          </g>
          <g id="tween0">
            <rect
              id="rect0"
              x="35"
              y="577.8"
              className="st7"
              width="200"
              height="50"
            />
            <text
              transform="matrix(1 0 0 1 87.5923 616.0003)"
              className="st2 st6">
              tween
            </text>
            <polygon
              id="star-icon"
              className="st10"
              points="60,582.8 66.2,595.3 80,597.3 70,607 72.4,620.8 60,614.3 47.7,620.8 50,607 
          40,597.3 53.9,595.3 		"
            />
          </g>
          <g id="playhead">
            <path
              className="st11"
              d="M36,456.5L36,456.5c-7.1,0-12.9-5.8-12.9-12.9v-31.3c0-7.1,5.8-12.9,12.9-12.9h0c7.1,0,12.9,5.8,12.9,12.9
          v31.3C48.9,450.8,43.1,456.5,36,456.5z"
            />
            <line className="st12" x1="36" y1="450.8" x2="35" y2="627.8" />
          </g>
          <text
            transform="matrix(1 0 0 1 25.2563 448.9027)"
            className="st5 st2 st6">
            0
          </text>
          <text
            transform="matrix(1 0 0 1 236.9839 448.9027)"
            className="st5 st2 st6">
            1
          </text>
          <text
            transform="matrix(1 0 0 1 432.6885 448.9027)"
            className="st5 st2 st6">
            2
          </text>
          <text
            transform="matrix(1 0 0 1 625.4243 448.9027)"
            className="st5 st2 st6">
            3
          </text>
          <text
            transform="matrix(1 0 0 1 819.9199 446.9027)"
            className="st5 st2 st6">
            4
          </text>
          <text
            transform="matrix(1 0 0 1 1028.0004 446.9031)"
            className="st5 st2 st6">
            5
          </text>
          <text
            transform="matrix(1 0 0 1 1225.0004 446.9031)"
            className="st5 st2 st6">
            6
          </text>
        </g>
        <polygon
          id="star"
          className="st13"
          points="425,248 442.6,283.7 482.1,289.5 453.5,317.3 460.3,356.5 425,338 389.7,356.5 396.5,317.3 
      367.9,289.5 407.4,283.7 "
        />
        <g id="stars">
          <polygon
            ref={starRef}
            id="star"
            className="st10"
            points="68.8,284.5 80.2,307.6 105.8,311.3 87.3,329.4 91.7,354.8 68.8,342.8 45.9,354.8 
        50.3,329.4 31.8,311.3 57.4,307.6 	"
          />
          <circle
            ref={circleRef}
            id="circle"
            className="st9"
            cx="68.8"
            cy="228.1"
            r="37"
          />
          <rect
            id="square"
            x="33"
            y="91.1"
            className="st8"
            width="74"
            height="74"
            ref={squreRef}
          />
        </g>
        <text
          ref={TimeRef}
          id="time"
          transform="matrix(1 0 0 1 1157.1934 675.459)"
          className="st5 st2 st3">
          0.0
        </text>
        <polygon
          id="play"
          className="st5"
          points="664.5,649.9 664.5,678.4 702.8,664.1 "
        />
        <polygon
          id="reverse"
          className="st5"
          points="614.6,649.9 614.6,678.4 576.4,664.1 "
        />
        <path
          id="pause"
          className="st5"
          d="M637.4,686.5h-10.1v-44.6h10.1V686.5z M652.5,641.8h-10.1v44.6h10.1V641.8z"
        />
      </svg>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #000;
  svg {
    max-width: 100%;
    height: 100%;
    overflow: hidden;
    visibility: hidden;
  }

  #play:hover,
  #pause:hover,
  #reverse:hover {
    fill: #ffd32e;
    cursor: pointer;
  }

  h1 {
    font-family: Kanit;
    font-weight: 500;
    font-size: 48px;
    color: white;
    margin-top: 30px;
    margin-left: 60px;
    width: 1200px;
  }

  .tween {
    color: #00ccff;
  }

  .timeline {
    color: #0ffa2d;
  }

  .stage {
    width: 500px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .orange {
    width: 102px;
    height: 90px;
    background: url(https://simseonbeom.github.io/Final/assets/tiger/orange.png);
    background-size: cover;
  }

  .st0 {
    fill: #333333;
  }
  .st1 {
    display: none;
    fill: #ffffff;
  }
  .st2 {
    font-family: "Kanit-Medium";
  }
  .st3 {
    font-size: 48px;
  }
  .st4 {
    fill: #666666;
  }
  .st5 {
    fill: #cccccc;
  }
  .st6 {
    font-size: 32px;
  }
  .st7 {
    fill: #00ccff;
  }
  .st8 {
    fill: #dc35f9;
  }
  .st9 {
    fill: #ffff33;
  }
  .st10 {
    fill: #ff6600;
  }
  .st11 {
    fill: #e9078a;
    stroke: #e9078a;
    stroke-width: 2;
    stroke-miterlimit: 10;
  }
  .st12 {
    fill: none;
    stroke: #e9078a;
    stroke-width: 3;
    stroke-miterlimit: 10;
  }
  .st13 {
    display: none;
    fill: #ff6600;
  }
`;

import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";
export default function StaggerLoopAnimation() {
  // useEffect(() => {
  //   const tl = gsap.timeline();

  //   tl.to(".tiger > div", {
  //     y: 100,
  //     // onComplete: () => {
  //     //   console.log("complete");
  //     // },

  //     stagger: {
  //       each: 0.2,
  //       repeat: 1,

  //       yoyo: true,

  //       // callback 안에서 파라미터전달 하는방법은
  //       // onCompleteParams으로 받을수있다.
  //       onComplete: function (targets: any) {
  //         // console.log(this.targets()[0]);
  //         // @ts-ignore
  //         gsap.to(this.targets()[0], {
  //           rotation: 360,
  //         });
  //       },
  //     },
  //   });
  // }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    const { chars, lines, words } = new SplitText(".word > div");
    // console.log(chars, "splitText");

    tl.from(chars, {
      opacity: 0,
      duration: 2,

      stagger: {
        each: 0.1,
        from: "random",
        ease: "power1",
        onComplete() {
          // console.log(this.targets()[0]);
          gsap.to(this.targets()[0], {
            delay: 0.5,
            duration: 2,
            color: "#51ff00",
          });
        },
      },
    }).to(lines, {
      delay: 1,
      y: 30,
      opacity: 0,
      stagger: {
        each: 0.2,
        from: "end",
      },
    });
  });

  return (
    <Wrapper>
      {/* <div className="tiger">
        <div className="orange"></div>
        <div className="pink"></div>
        <div className="blue"></div>
      </div> */}

      <div className="word">
        <div>GO</div>
        <div>BEYOND</div>
        <div>THE TRAND</div>
        <div>GSAP</div>
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
  .tiger {
    width: 500px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .tiger > div {
    width: 102px;
    height: 88px;
    background-size: cover;
  }

  .stage {
    width: 600px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .stage > div {
    display: inline-block;
    width: 5.166667%;
    margin: 0px 1.5% 1.5% 0px;
    background: #88ce02;
    position: relative;
  }

  .box:before {
    padding-top: 100%;
    content: "";
    display: block;
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

  .word {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #000;
    /* color:  */
    -webkit-text-stroke: 1px #51ff00;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 20vh;
    font-weight: 700;
    font-family: "Roboto", sans-serif;
    overflow: hidden;
  }
`;

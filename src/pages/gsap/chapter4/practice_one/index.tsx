import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import Draggable from "gsap/dist/Draggable";
import { TextPlugin } from "gsap/dist/TextPlugin";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";
import { delimiter } from "path";
gsap.registerPlugin(TextPlugin); // TextPlugin을 등록합니다.
export default function GsapPracticeOne() {
  const [title, setTitle] = useState<string[]>([
    "TOYSTORY I",
    "TOYSTORY II",
    "TOYSTORY III",
  ]);
  const [subTitle, setSubTitle] = useState<string[]>([
    "토이스토리 시즌 1",
    "토이스토리 시즌 2",
    "토이스토리 시즌 3",
  ]);

  const refs = [
    useRef<HTMLDivElement>(null), // page01Ref
    useRef<HTMLDivElement>(null), // page01BgRef
    useRef<HTMLDivElement>(null), // page01WoodyRef
    useRef<HTMLDivElement>(null), // page01forkyRef
    useRef<HTMLDivElement>(null), // page01chairRef
    useRef<HTMLDivElement>(null), // page01jessieRef
    useRef<HTMLDivElement>(null), // page01bagRef
    useRef<HTMLDivElement | null>(null), // page01toyRef
  ];

  const twoRefs = [
    useRef<HTMLDivElement>(null), // page02Ref
    useRef<HTMLDivElement>(null), // page02BgRef
    useRef<HTMLDivElement>(null), // page02floorRef
    useRef<HTMLDivElement>(null), // page02right_bgRef
    useRef<HTMLDivElement>(null), // page02left_bgRef
    useRef<HTMLDivElement>(null), // page02friendsRef
    useRef<HTMLDivElement>(null), // page02woodyRef
    useRef<HTMLDivElement>(null), // page02forkyRef
  ];

  const threeRefs = [
    useRef<HTMLDivElement>(null), // page03Ref
    useRef<HTMLDivElement>(null), // page03BgRef
    useRef<HTMLDivElement | null>(null), // page03toyRef
    useRef<HTMLDivElement>(null), // page03forky_Ref
  ];

  useEffect(() => {
    // function page01() {
    //   const page = "page01";
    //   let enterone: gsap.core.Timeline | undefined;
    //   let leaveone: gsap.core.Timeline | undefined;

    //   if (refs[7] && refs[7].current) {
    //     enterone = gsap
    //       .timeline({
    //         defaults: {
    //           duration: 1,
    //           opacity: 0,
    //         },
    //         paused: true,
    //       })
    //       .to(refs[0].current, {
    //         opacity: 1,
    //       })
    //       .fromTo(
    //         refs[1].current,
    //         { scale: 2, opacity: 0 },
    //         {
    //           scale: 1,
    //           opacity: 1,
    //         },
    //         "<"
    //       )
    //       .fromTo(
    //         refs[2].current,
    //         { y: 0 },
    //         {
    //           y: 30,
    //           opacity: 1,
    //         },
    //         "-=0.2"
    //       )
    //       .fromTo(
    //         refs[3].current,
    //         { y: 0 },
    //         {
    //           y: 30,
    //           opacity: 1,
    //         },
    //         "-=0.2"
    //       )
    //       .fromTo(refs[4].current, { x: 0 }, { x: -30, opacity: 1 }, "<")
    //       .fromTo(refs[5].current, { x: 0 }, { x: -30, opacity: 1 }, "-=0.5")
    //       .fromTo(refs[6].current, { x: 0 }, { x: -30, opacity: 1 }, "-=0.5")
    //       .fromTo(
    //         refs[7].current.children,
    //         { y: 300 },
    //         {
    //           duration: 0.1,
    //           y: 0,
    //           stagger: 0.5,
    //           opacity: 1,
    //         },
    //         "-=0.5"
    //       );

    //     leaveone = gsap
    //       .timeline({
    //         defaults: {
    //           duration: 1,
    //           opacity: 0,
    //         },
    //         paused: true,
    //       })
    //       .to(refs[7].current.children, {
    //         duration: 0.5,
    //         y: 250,
    //         stagger: 0.05,
    //       })
    //       .to(
    //         refs[2].current,
    //         {
    //           duration: 0.5,
    //           y: 900,
    //         },
    //         "-=0.2"
    //       )
    //       .to(
    //         refs[3].current,
    //         {
    //           duration: 0.5,
    //           y: 900,
    //         },
    //         "-=0.2"
    //       )
    //       .to(
    //         refs[4].current,
    //         {
    //           duration: 0.8,
    //           x: -1200,
    //         },
    //         "<"
    //       )
    //       .to(
    //         refs[5].current,
    //         {
    //           duration: 0.7,
    //           x: -900,
    //         },
    //         "-=0.5"
    //       )
    //       .to(
    //         refs[6].current,
    //         {
    //           duration: 0.9,
    //           x: -1000,
    //         },
    //         "<"
    //       )
    //       .to(
    //         refs[1].current,
    //         {
    //           duration: 2,
    //           scale: 2,
    //           opacity: 1,
    //         },
    //         "<"
    //       )
    //       .to(refs[0].current, { opacity: 0 }, "-=0.3");
    //   }

    //   return [enterone, leaveone];
    // }

    // const [enterone, leaveone] = page01();

    // Use `enter` and `leave` variables as needed
    // window.addEventListener("load", () => {
    //   enter?.play();
    // });

    // leave?.play();
    // page01()[0]?.play();

    // page2
    // function page02() {
    //   const page = "#page02";
    //   let enterTwo: gsap.core.Timeline | undefined;
    //   let leaveTwo: gsap.core.Timeline | undefined;

    //   enterTwo = gsap
    //     .timeline({
    //       defaults: {
    //         duration: 1,
    //         opacity: 0,
    //       },
    //       paused: true,
    //     })
    //     .fromTo(
    //       twoRefs[0].current,
    //       { opacity: 0 },
    //       {
    //         opacity: 1,
    //       }
    //     )
    //     .fromTo(
    //       twoRefs[2].current,
    //       {
    //         y: 50,
    //         opacity: 0,
    //       },
    //       { y: 0, opacity: 1 },
    //       "<"
    //     )
    //     .fromTo(
    //       twoRefs[3].current,
    //       { opacity: 0, y: 0 },
    //       { y: -50, opacity: 1 },
    //       "<"
    //     )
    //     .fromTo(
    //       twoRefs[4].current,
    //       { opacity: 0, x: -50 },
    //       { x: 0, opacity: 1 },
    //       "<"
    //     )
    //     .fromTo(
    //       twoRefs[6].current,
    //       {
    //         opacity: 0,
    //         y: 30,
    //       },
    //       {
    //         opacity: 1,
    //         y: 0,
    //       }
    //     )
    //     .fromTo(
    //       twoRefs[7].current,
    //       {
    //         opacity: 0,
    //         y: 30,
    //       },
    //       {
    //         opacity: 1,
    //         y: 0,
    //       },
    //       "-=0.5"
    //     );

    //   leaveTwo = gsap
    //     .timeline({
    //       defaults: {
    //         duration: 1,
    //         opacity: 0,
    //       },
    //       paused: true,
    //     })
    //     .to(twoRefs[6].current, {
    //       y: 30,
    //       opacity: 0,
    //     })
    //     .to(
    //       twoRefs[7].current,
    //       {
    //         y: 30,
    //         opacity: 0,
    //       },
    //       "-=0.5"
    //     )
    //     .to(twoRefs[2], {
    //       y: 50,
    //       opacity: 0,
    //     })
    //     .to(twoRefs[3].current, { x: -50, opacity: 0 }, "<")
    //     .to(twoRefs[4].current, { x: 50, opacity: 0 }, "<")
    //     .to(twoRefs[1].current, { opacity: 0 }, "<")
    //     .to(
    //       twoRefs[0].current,
    //       {
    //         opacity: 0,
    //         duration: 1,
    //       },
    //       "<"
    //     );

    //   return [enterTwo, leaveTwo];
    // }

    // const [enterTwo, leaveTwo] = page02();

    //   page3
    function page03() {
      const page = "#page03";
      let enterThree: gsap.core.Timeline | undefined;
      let leaveThree: gsap.core.Timeline | undefined;
      if (threeRefs[2] && threeRefs[2].current) {
        enterThree = gsap
          .timeline({
            defaults: {
              duration: 1,
              opacity: 0,
            },
            paused: true,
          })
          .fromTo(
            threeRefs[0].current,
            { opacity: 0 },
            {
              opacity: 1,
            }
          )
          .fromTo(
            threeRefs[1].current,
            {
              scale: 1,
              opacity: 0,
            },
            { scale: 1.5, opacity: 1 },
            "<"
          )
          .fromTo(
            threeRefs[2].current.children,
            {
              opacity: 0,
              scale: 0.5,
            },
            {
              stagger: {
                each: 0.1,
              },
              opacity: 1,
              y: 100,
              z: 500,
            }
          );
      }

      leaveThree = gsap.timeline({
        defaults: {
          duration: 1,
          opacity: 0,
        },
        paused: true,
      });

      return [enterThree, leaveThree];
    }
    const [enterThree, leaveThree] = page03();

    enterThree?.play();
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <div className="nav">
          <ul>
            <li className="active">
              <a href="#">season I</a>
            </li>
            <li>
              <a href="#">season II</a>
            </li>
            <li>
              <a href="#">season III</a>
            </li>
          </ul>
        </div>

        <div className="title">
          <h1>TOYSTORY I</h1>
          <p>토이스토리 시즌 1</p>
          <button>watch now</button>
        </div>

        {/* 페이지 1 */}

        {/* <section id="page01" className="section" ref={refs[0]}>
          <div className="bg" ref={refs[1]}></div>
          <div className="woody" ref={refs[2]}>
            <img src="/assets/images/page01/woody.png" alt="우디" />
          </div>
          <div className="jessie" ref={refs[5]}>
            <img src="/assets/images/page01/jessie.png" alt="제시" />
          </div>
          <div className="forky" ref={refs[3]}>
            <img src="/assets/images/page01/forky.png" alt="포키" />
          </div>
          <div className="bag" ref={refs[6]}>
            <img src="/assets/images/page01/bag.png" alt="가방" />
          </div>
          <div className="chair" ref={refs[4]}>
            <img src="/assets/images/page01/chair.png" alt="의자" />
          </div>

          <div className="toy" ref={refs[7]}>
            <div>
              <img src="/assets/images/page01/toy_02.png" alt="외계인 장난감" />
            </div>
            <div>
              <img src="/assets/images/page01/toy_03.png" alt="외계인 장난감" />
            </div>
            <div>
              <img src="/assets/images/page01/toy_04.png" alt="외계인 장난감" />
            </div>
          </div>
        </section> */}

        {/* 페이지 2 */}

        {/* <section id="page02" className="section" ref={twoRefs[0]}>
          <div className="bg" ref={twoRefs[1]}></div>
          <div className="floor" ref={twoRefs[2]}>
            <img src="/assets/images/page02/bg_02.png" alt="바닥" />
          </div>
          <div className="right_bg" ref={twoRefs[3]}>
            <img src="/assets/images/page02/bg_03.png" alt="왼쪽 뒷배경" />
          </div>
          <div className="left_bg" ref={twoRefs[4]}>
            <img src="/assets/images/page02/bg_04.png" alt="오른쪽 뒷배경" />
          </div>

          <div className="friends" ref={twoRefs[5]}>
            <div className="woody" ref={twoRefs[6]}>
              <img src="/assets/images/page02/woody.png" alt="우디" />
            </div>
            <div className="forky" ref={twoRefs[7]}>
              <img src="/assets/images/page02/forky.png" alt="포키" />
            </div>
          </div>
        </section> */}

        {/* 페이지 3 */}

        <section id="page03" className="section" ref={threeRefs[0]}>
          <div className="bg" ref={threeRefs[1]}></div>

          <div className="toy" ref={threeRefs[2]}>
            <div>
              <img src="/assets/images/page03/toy_01.png" alt="장난감1" />
            </div>
            <div>
              <img src="/assets/images/page03/toy_03.png" alt="장난감1" />
            </div>
            <div>
              <img src="/assets/images/page03/toy_02.png" alt="장난감1" />
            </div>
            <div>
              <img src="/assets/images/page03/toy_04.png" alt="장난감1" />
              <div className="forky" ref={threeRefs[3]}>
                <img src="/assets/images/page03/forky.png" alt="포키" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100vh;
  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    height: 100%;
  }

  section {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }

  .nav {
    position: fixed;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
  }

  .nav > ul {
    display: flex;
    color: #fff;
    list-style: none;
    gap: 2rem;
    font-size: 1rem;
    text-transform: uppercase;
  }

  .nav > ul > li {
    transition: all 0.5s;
    position: relative;
    font-family: "Paytone One", sans-serif;
    opacity: 0.6;
    white-space: nowrap;
    /* transform: scale(0.8) */
  }

  .nav > ul > li::after {
    content: "";
    width: 0%;
    height: 4px;
    position: absolute;
    left: 0;
    bottom: -5px;
    background: yellow;
    transition: all 0.5s;
  }

  .nav > ul > li.active::after {
    width: 100%;
  }
  .nav > ul > li.active {
    transform: translateY(20px);
    opacity: 1;
  }

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    color: #fff;
    z-index: 100;
    text-align: center;
  }

  h1 {
    font-family: "Paytone One", sans-serif;
    font-size: 10rem;
    white-space: nowrap;
    text-transform: uppercase;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 5rem;
    text-transform: uppercase;
  }

  button {
    background: transparent;
    border: 1px solid #fff;
    border-radius: 0.3rem;
    padding: 1rem;
    font-size: 1.5rem;
    color: #fff;
    text-transform: uppercase;
    cursor: pointer;
  }

  .bg {
    width: 100%;
    height: 100%;
    background-size: cover !important;
  }

  #page01 .bg {
    background: url(/assets/images/page01/bg.jpg) no-repeat center;
  }

  #page02 .bg {
    background: url(/assets/images/page02/bg_01.jpg) no-repeat center;
    background-size: cover;
  }

  #page03 .bg {
    background: url(/assets/images/page03/bg.jpg) no-repeat center;
    background-size: cover;
  }

  #page01 .woody {
    position: absolute;
    right: 2vw;
    bottom: 0;
  }

  #page01 .jessie {
    position: absolute;
    left: -3vw;
    bottom: 0;
    height: 100vh;
    z-index: 10;
  }

  #page01 .chair {
    position: absolute;
    left: 15vw;
    bottom: 20vh;
  }

  #page01 .bag {
    position: absolute;
    left: 3vw;
    bottom: 5vh;
    z-index: 9;
  }

  #page01 .forky {
    position: absolute;
    right: 15vw;
    bottom: 3vw;
  }

  #page01 .toy {
    position: absolute;
    left: 50%;
    transform: translateX(-40%);
    bottom: -10px;
    display: flex;
    align-items: flex-end;
    z-index: 10;
  }

  #page02 .floor {
    position: absolute;
    left: 0;
    bottom: -10px;
  }

  #page02 .left_bg {
    position: absolute;
    left: 0;
    top: 0;
  }

  #page02 .right_bg {
    position: absolute;
    right: 0;
    top: 0;
  }

  #page02 .friends {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    display: flex;
    align-items: flex-end;
  }

  #page02 .forky {
    max-height: 425px;
    position: relative;
    top: -114px;
    left: -91px;
  }

  #page03 .toy {
    width: 100vw;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -50px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  #page03 .toy > div {
    margin: 0 -6rem;
    position: relative;
  }

  #page03 .toy > div:nth-child(2) {
    z-index: 10;
  }

  #page03 .forky {
    position: absolute;
    right: 72px;
    bottom: 148px;
  }
`;

import styled from "@emotion/styled";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

class Tiger {
  animation: any;
  name: string;
  constructor(target: any, name: string) {
    this.animation = gsap.to(target, {
      x: 100,
      onComplete() {
        console.log("end");
      },
    });
    this.animation.pause();
    this.name = name;
  }
  move(distance: any) {
    // animation 객체를 사용하여 타이거를 이동시킴
    gsap.to(this.animation.target, {
      x: distance,
    });
  }
}

export default function CallbackGsap() {
  const OrangeRef = useRef<HTMLDivElement | null>(null);
  const GreenRef = useRef<HTMLDivElement | null>(null);
  const PinkRef = useRef<HTMLDivElement | null>(null);
  const BlueRef = useRef<HTMLDivElement | null>(null);
  const TitleRef = useRef<HTMLHeadingElement | null>(null);
  // callback => s나중에 일어나는 일

  const refs = [OrangeRef, GreenRef, PinkRef, BlueRef];
  //   gsap.to(OrangeRef.current, {
  //     y: 100,
  //   });

  console.log(BlueRef, "BlueRef");

  useEffect(() => {
    refs.forEach((ref) => {
      gsap.to(ref.current, {
        duration: 2.5,
        y: 100,
        repeat: 5,
        onComplete: complete,
        onCompleteParams: ["오렌지", 1],
        onUpdate() {
          if (TitleRef.current !== null) {
            TitleRef.current.textContent = ` 애니메이션 재생중`;
          }
        },
        onStart() {
          console.log("start");
        },
        onRepeat() {
          console.log("반복중");
        },
      });
    });
  }, [refs]);

  function complete(color: string) {
    if (TitleRef.current !== null) {
      TitleRef.current.textContent = `${color} 애니메이션 종료`;
    }
    // gsap.to(OrangeRef.current, {
    //   rotation: 360,
    // });
    refs.forEach((ref) => {
      gsap.to(ref.current, {
        rotation: 360,
      });
    });
  }

  // 객체 안에 함수를 넣을수가 있다. 화살표함수
  //   const user = {
  //     name: "tiger",
  //     age: "33",
  //     // 일반함수
  //     sayHi: function () {
  //       console.log(this.name);
  //     },
  // 화살표함수
  // sayBye: () => {
  //   console.log(this);
  //   this.name;
  // },
  //concise method
  //concise메소드는 제대로 대상을 잘 찾습니다.
  //     sayGood() {
  //       console.log(this);
  //     },
  //   };
  //   user.sayBye();
  //   console.log(user);

  return (
    <Wrapper>
      <div className="stage">
        <h1 ref={TitleRef}>애니메이션 재생 전</h1>
        <div className="orange" id="오렌지" ref={OrangeRef}></div>
        <div className="green" id="녹색이" ref={GreenRef}></div>
        <div className="pink" id="핑크" ref={PinkRef}></div>
        <div className="blue" id="파랑이" ref={BlueRef}></div>
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
    background: url(https://simseonbeom.github.io/Final/assets/tiger/green.png);
  }

  .blue {
    background: url(https://simseonbeom.github.io/Final/assets/tiger/blue.png);
  }

  .pink {
    background: url(https://simseonbeom.github.io/Final/assets/tiger/pink.png);
  }
`;

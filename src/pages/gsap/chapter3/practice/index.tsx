import styled from "@emotion/styled";
import React, { useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function CallbackGsap() {
  const spaceRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);
  const Planet = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
  ];
  const Planets = Planet.map((planetName, index) => (
    <div key={index} className="solar_system" data-planet-name={planetName}>
      <div className={`planet ${planetName}`}>
        <div className="overlay"></div>
        <h2>{planetName}</h2>
      </div>
    </div>
  ));

  const z = gsap.utils.distribute({
    base: -18400,
    amount: 18400,
  });

  let count = 0;
  useEffect(() => {
    gsap.set(".planet", {
      z: z,
      scaleX: 0.8,
      rotateX: 4,
    });

    // leftRef.current?.addEventListener("click", () => {
    //   LeftClickNext();
    // });

    // rightRef.current?.addEventListener("click", () => {
    //   RightClickNext();
    // });
  }, []);

  const RightClickNext = () => {
    if (count > 7) return;
    ++count;
    console.log(count);
    gsap.to(".planet", {
      z: "+= 2300",
      ease: "power3.inOut",
      duration: 1,
    });
  };

  const LeftClickNext = () => {
    if (count == 0) return;
    --count;
    console.log(count);
    gsap.to(".planet", {
      z: "-= 2300",
      ease: "power3.inOut",
      duration: 1,
    });
  };

  return (
    <Wrapper>
      <button className="left" onClick={LeftClickNext}>
        ←
      </button>
      <button className="right" onClick={RightClickNext}>
        →
      </button>
      <div className="space" ref={spaceRef}>
        {Planets}
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
  /* overflow: hidden; */
  .space {
    overflow: hidden;
    position: absolute;
    transform: rotateX(-10deg);
    perspective: 800px;
    width: 100vw;
    height: 100vh;
    transform-style: preserve-3d;
    .solar_system {
      transform-style: preserve-3d;
      pointer-events: none;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
    }

    .solar_system .planet {
      height: 1200px;
      width: 1200px;
      border-radius: 600px;
      background: red;
      background-size: 1140px 910px !important;
      bottom: -920px;
      position: absolute;
      left: 0;
      right: 0;

      margin: auto;
    }

    .planet.mercury {
      background: url(https://www.solarsystemscope.com/images/textures/full/2k_makemake_fictional.jpg);
      box-shadow: 0 -590px 150px black inset,
        0 0px 130px 40px rgba(234, 205, 199, 0.6) inset,
        0 0px 23px 4px rgba(234, 205, 199, 0.6) inset,
        0 -10px 130px rgba(188, 143, 127, 0.6);
    }

    .planet.venus {
      background: url(https://nasa3d.arc.nasa.gov/shared_assets/images/ven0aaa2/ven0aaa2-copy-428-321.jpg);
      box-shadow: 0 -590px 150px black inset, 0 0px 130px 40px #ffcb9c inset,
        0 0px 23px 4px #ffcb9c inset, 0 -10px 130px #b85a07;
    }

    .planet.earth {
      background: url(https://img00.deviantart.net/04ef/i/2009/114/3/e/new_earth_texture_map_by_lightondesigns.jpg);
      box-shadow: 0 -590px 150px black inset, 0 0px 130px 40px #8cbaff inset,
        0 0px 23px 4px #8cbaff inset, 0 -10px 130px #7894a9;
    }

    .planet.mars {
      background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/mars_texture.jpg);
      box-shadow: 0 -590px 150px black inset, 0 0px 130px 40px #e86363 inset,
        0 0px 23px 4px #e86363 inset, 0 -10px 130px #6b261a;
    }

    .planet.jupiter {
      background: url(https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA07782_hires.jpg);
      box-shadow: 0 -590px 150px black inset,
        0 0px 130px 40px rgba(234, 205, 199, 0.6) inset,
        0 0px 23px 4px rgba(234, 205, 199, 0.6) inset,
        0 -10px 130px rgba(188, 143, 127, 0.6);
    }

    .planet.saturn {
      background: url(https://www.solarsystemscope.com/images/textures/full/2k_saturn.jpg);
      box-shadow: 0 -590px 150px black inset,
        0 0px 130px 40px rgba(234, 205, 199, 0.6) inset,
        0 0px 23px 4px rgba(234, 205, 199, 0.6) inset,
        0 -10px 130px rgba(188, 143, 127, 0.6);
    }

    .planet.uranus {
      background: url(https://img00.deviantart.net/957c/i/2017/165/4/9/uranus_texture_map_by_jcpag2010-db7yjwb.png);
      box-shadow: 0 -590px 150px black inset,
        0 0px 130px 40px rgba(234, 205, 199, 0.6) inset,
        0 0px 23px 4px rgba(234, 205, 199, 0.6) inset,
        0 -10px 130px rgba(127, 188, 171, 0.6);
    }

    .planet.neptune {
      background: url(https://www.solarsystemscope.com/images/textures/full/2k_neptune.jpg);
      box-shadow: 0 -590px 150px black inset,
        0 0px 130px 40px rgba(234, 205, 199, 0.6) inset,
        0 0px 23px 4px rgba(234, 205, 199, 0.6) inset, 0 -10px 130px #2d4153;
    }

    .planet.pluto {
      background: url(https://pre00.deviantart.net/4677/th/pre/f/2015/314/4/e/pluto_map__2015_nov_10__by_snowfall_the_cat-d918tlb.png);
      box-shadow: 0 -590px 150px black inset,
        0 0px 130px 40px rgba(234, 205, 199, 0.6) inset,
        0 0px 23px 4px rgba(234, 205, 199, 0.6) inset, 0 -10px 130px #2d4153;
    }

    .overlay {
      position: absolute;
      right: 0;
      top: -240px;
      left: -303px;
      border-bottom: 1020px solid black;
      width: 1800px;
      height: 620px;
      transform: none;
      opacity: 1;
      border-radius: 100%;
      z-index: 0;
      box-shadow: 0px -190px 215px 110px black inset;
    }

    .planet h2 {
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -50px;
      text-transform: uppercase;
      font-size: 2rem;
    }
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    background: transparent;
    font-size: 3rem;
    z-index: 9099;
    border: 1px solid #ffffff6b;
    padding: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.5s;
  }

  button:hover {
    background: #fff;
    color: black;
  }

  .left {
    left: 2rem;
  }

  .right {
    right: 2rem;
  }
`;

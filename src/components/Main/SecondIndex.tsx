import React, { useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { styled } from "@mui/system";
import PicImg_one from "@/assets/gsap/image/pic1.jpg";
import PicImg_two from "@/assets/gsap/image/pic2.jpg";
import PicImg_three from "@/assets/gsap/image/pic3.jpg";
import PicImg_four from "@/assets/gsap/image/pic4.jpg";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ImageGallery() {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    if (galleryRef.current) {
      const cards = galleryRef.current.querySelectorAll(".card_Wrapper");

      cards.forEach((card, index) => {
        if (index % 2 === 0) {
          // if the card index is even
          gsap.set(card, { opacity: 0, x: 150 });

          ScrollTrigger.create({
            trigger: card,
            start: "top 75%",
            onEnter: () => gsap.to(card, { opacity: 1, x: 0, duration: 1 }),
            onLeaveBack: () =>
              gsap.to(card, { opacity: 0, x: 100, duration: 0.5 }),
          });
        } else {
          // if the card index is odd
          gsap.set(card, { opacity: 0, x: -150 });

          ScrollTrigger.create({
            trigger: card,
            start: "top 75%",
            onEnter: () => gsap.to(card, { opacity: 1, x: 0, duration: 1 }),
            onLeaveBack: () =>
              gsap.to(card, { opacity: 0, x: -100, duration: 0.5 }),
          });
        }
      });
    }

    const current = headerRef.current;

    if (current) {
      setTimeout(() => {
        current.classList.add("visible");
      }, 500);
    }
  }, []);

  return (
    <Wrapper className="gallery" ref={galleryRef}>
      <Container maxWidth="xl">
        <InnerContainer>
          <h1
            className="header-section gs_reveal ipsType_center"
            ref={headerRef}>
            Scroll down and up to see different reveal animations
          </h1>
          <CardWrapperOdd className="card_Wrapper">
            <div className="image">
              <Image src={PicImg_one} alt="pic_travel" />
            </div>
            <TextWrapperOdd>
              <h2>
                Create amazing <strong>SVG</strong> animations
              </h2>
              <p>
                <a href="https://greensock.com/drawsvg/">DrawSVGPlugin</a>{" "}
                allows you to progressively reveal (or hide) SVG strokes to make
                them look like they're being drawn.
                <a href="https://greensock.com/morphsvg/">MorphSVGPlugin</a> to
                Morph any SVG shape into any other shape smoothly regardless of
                the number of points in each.
                <a href="/docs/v3/Plugins/MotionPathPlugin">MotionPathPlugin</a>
                allows you to easily move any object along a path.
              </p>
            </TextWrapperOdd>
          </CardWrapperOdd>
          <CardWrapperEven className="card_Wrapper">
            <TextWrapperEven>
              <h2>
                Supercharge immersive <strong>WebGL</strong> experiences
              </h2>
              <p>
                GreenSock is used in some of the most popular
                <a href="//threejs.org/">Three.js</a> powered WebGL projects.
                Animate any object in a scene.
                <a href="https://greensock.com/PixiPlugin/">PixiPlugin</a> makes
                animating <a href="//www.pixijs.com/">Pixi.js</a> objects with
                GSAP a breeze. Animate position, scale, color effects and more
                with all the power and control of GSAP and the rendering speed
                of Pixi.js.
              </p>
            </TextWrapperEven>
            <div className="image">
              <Image src={PicImg_two} alt="pic_travel" />
            </div>
          </CardWrapperEven>
          <CardWrapperOdd className="card_Wrapper">
            <div className="image">
              <Image src={PicImg_three} alt="pic_travel" />
            </div>
            <TextWrapperOdd>
              <h2>
                Control performant <strong>Canvas</strong> animations
              </h2>
              <p>
                GSAP makes animating with Canvas even easier by providing an
                easier way to look and sequence animations. GSAP works great
                with
                <a href="//www.adobe.com/products/animate.html">
                  Adobe Animate
                </a>
                and <a href="//createjs.com/easeljs">EaseJS</a> through GSAP's
                <a href="https://greensock.com/easelplugin/">EaselJSPlugin</a>.
              </p>
            </TextWrapperOdd>
          </CardWrapperOdd>
          <CardWrapperEven className="card_Wrapper">
            <TextWrapperEven>
              <h2>
                <strong>Award winning</strong> websites
              </h2>
              <p>
                GSAP is used on over 8,500,000 sites and over 1,000 sites
                featured on
                <a
                  href="https://www.awwwards.com/websites/gsap-animation/"
                  target="_blank">
                  Awwwards
                </a>
                . For some of our favorites, check out
                <a href="https://greensock.com/showcase/">our showcase</a>.
              </p>
            </TextWrapperEven>
            <div className="image">
              <Image src={PicImg_four} alt="pic_travel" />
            </div>

            {/* <div
          className="image"
          style={{
            backgroundImage: "url('https://via.placeholder.com/300')",
          }}></div> */}
          </CardWrapperEven>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",
  "& .image": {
    padding: "10px",
    border: "1px solid #cccccc",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#ffffff",
    boxShadow: "1px 1px 1px 1px #cccccc",
    transition: "0.3s",
  },
  "& .image img": {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  "& .header-section": {
    margin: "50px auto",
    opacity: 0,
    transform: "translateY(50px)",
    transition: "opacity 1s 0.5s, transform 1s 0.5s",
  },
  "& .header-section.visible": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

const InnerContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "150px",
}));

const CardWrapperOdd = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "80%",
  minHeight: "50vh",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const TextWrapperOdd = styled("div")(({ theme }) => ({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: "1rem",
  [theme.breakpoints.down("sm")]: {
    margin: 0,
    width: "100%",
  },
}));

const CardWrapperEven = styled(CardWrapperOdd)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "80%",
  minHeight: "50vh",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const TextWrapperEven = styled(TextWrapperOdd)(({ theme }) => ({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: "1rem",

  [theme.breakpoints.down("sm")]: {
    order: "1",
    margin: "0",
    width: "100%",
  },
}));

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styled from "@emotion/styled";

gsap.registerPlugin(ScrollTrigger);

export default function ImageGallery() {
  const galleryRef = useRef(null);
  const headerRef = useRef(null);
  useEffect(() => {
    if (galleryRef.current) {
      const images = galleryRef.current.querySelectorAll(".image");

      images.forEach((image) => {
        gsap.set(image, { opacity: 0, y: 150 });

        ScrollTrigger.create({
          trigger: image,
          start: "top 75%",
          onEnter: () => gsap.to(image, { opacity: 1, y: 0, duration: 1 }),
          onLeaveBack: () =>
            gsap.to(image, { opacity: 0, y: 100, duration: 0.5 }),
        });
      });
    }

    if (headerRef.current) {
      console.log(headerRef.current);
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      });
    }
  }, []);

  return (
    <Wrapper className="gallery" ref={galleryRef}>
      <h1 className="header-section gs_reveal ipsType_center" ref={headerRef}>
        Scroll down and up to see different reveal animations
      </h1>

      <div
        className="image"
        style={{
          backgroundImage: "url('https://via.placeholder.com/300')",
        }}></div>
      <div
        className="image"
        style={{
          backgroundImage: "url('https://via.placeholder.com/300')",
        }}></div>
      <div
        className="image"
        style={{
          backgroundImage: "url('https://via.placeholder.com/300')",
        }}></div>
      <div
        className="image"
        style={{
          backgroundImage: "url('https://via.placeholder.com/300')",
        }}></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 150vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px; */
  padding: 20px;
  .image {
    width: 300px;
    height: 300px;
    background-size: cover;
    background-position: center;
  }
  .header-section {
    margin: 200px auto;
    opacity: 0;
    transform: translateY(50px);
  }
`;

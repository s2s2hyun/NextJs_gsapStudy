import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip"; // Add this line
const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  //   height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",
}));

const InnerContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const ImgGalleryCtr = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: "1rem",
  paddingBlock: "10vh",
}));

const ImgGalleryContent = styled("div")(({ theme }) => ({
  cursor: "pointer",
  position: "relative",
  borderRadius: "0.5rem",
  marginBottom: "1em",
  maxWidth: "800px",
  width: "100%",
  marginInline: "auto",
  overflow: "hidden",
  flex: 1,
  transition: "flex 0.5s ease-in-out",
  "&:hover": {
    flex: 3,
  },
}));

const Image = styled("img")({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

gsap.registerPlugin(Flip);
export default function Board() {
  const [images, setImages] = useState([
    "https://i.pinimg.com/564x/d7/1f/de/d71fdefc2807e04725c36c1be25c8de4.jpg",
    "https://images.unsplash.com/photo-1619087940820-d3fcb8a26b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    "https://images.unsplash.com/photo-1599669846660-945c5c775181?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=8",
    "https://images.unsplash.com/photo-1682687220015-186f63b8850a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80",
    "https://media.cnn.com/api/v1/images/stellar/prod/201221102826-airpods-max.jpg?q=x_2,y_0,h_1130,w_2008,c_crop/h_540,w_960/f_webp",
    "https://images.pexels.com/photos/3721098/pexels-photo-3721098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://i.pinimg.com/564x/74/16/9d/74169d2c69f5ec4a1be705b928940165.jpg",
    "https://i.pinimg.com/564x/f7/0c/a0/f70ca0ff3073bbe93cd4584fbbc35ecd.jpg",
  ]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const shuffleImages = () => {
    // Store the initial state.
    const state = Flip.getState(imageRefs.current);

    // Shuffling the images array.
    setImages((images) => {
      // Create a shallow copy of the array, and shuffle it.
      const shuffledImages = [...images].sort(() => Math.random() - 0.5);

      return shuffledImages;
    });

    // Invoking gsap Flip after component updates.
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 1,
        ease: "power1.inOut",
        absolute: true,
        // You can add more gsap config here.
      });
    });
  };

  return (
    <Wrapper>
      <Container maxWidth="xl">
        <InnerContainer>
          <ImgGalleryCtr>
            {images.map((src, index) => (
              <ImgGalleryContent key={src}>
                {/* Change from key={index} to key={src} */}
                <Image
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={src}
                  alt="cover"
                />
              </ImgGalleryContent>
            ))}
            <button onClick={shuffleImages}>Shuffle</button>
          </ImgGalleryCtr>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}

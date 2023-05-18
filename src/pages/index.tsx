import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/ilb/auth";
import Head from "next/head";
import { styled } from "@mui/system";
import { login, logout } from "@/store/feature/userSlice";
import LoginModalPage from "@/components/Modal/LoginModal";
import Container from "@mui/material/Container";
import { CustomTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { gsap } from "gsap";
//@ts-ignore
import { SplitText } from "@/util/plugin/splitText";

interface EffectConfig {
  y?: number;
  opacity?: number;
}

interface Board {
  id: string;
  title: string;
  description: string;
  status: string;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  container: {
    background: theme.custom.container.background,
  },
}));

const CustomText = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  cursor: "pointer",
  zIndex: "10",
}));

const CustomBackground = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const LayHeaderCustomBackground = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "absolute",
}));

const InnerContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const BoradTitle = styled("h3")(({ theme }) => ({
  fontSize: "24px",

  color: theme.palette.text.primary,
}));

const BoradInfo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const BoardListNumberText = styled("p")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "14px",
  // textAlign:"center",
  cursor: "pointer",
}));

export default function Home() {
  // const classes = useStyles();
  const firstText = useRef(null);
  const secondText = useRef(null);
  const thirdText = useRef(null);
  const fourthText = useRef(null);

  useEffect(() => {
    gsap.registerEffect({
      name: "textEffect",
      extendTimeline: true,
      defaults: {
        y: 30,
        opacity: 0,
      },
      effect: (target: any, config: EffectConfig) => {
        // console.log(target[0].dataset.index, "타겟 "); 1,2,3,4 를 찍어주고있다.
        const index = target[0].dataset.index;
        const tl = gsap.timeline();
        const FirstSplit = new SplitText(target, { type: "chars" });
        // const { y } = config.y;
        // const { opacity } = config.opacity;
        tl.from(FirstSplit.chars, {
          y: config.y,
          opacity: config.opacity,
          stagger: 0.1,
        }).to(FirstSplit.chars, {
          delay: 3.2,
          opacity: config.opacity,
          stagger: 0.03,
        });

        return tl;
      },
    });

    textAnimaiton();
  }, []);

  // 텍스트 애니메이션
  const textAnimaiton = () => {
    const animation = gsap.timeline();
    animation
      .add(gsap.effects.textEffect(firstText.current))
      .add(gsap.effects.textEffect(secondText.current))
      .add(gsap.effects.textEffect(thirdText.current))
      .add(gsap.effects.textEffect(fourthText.current));

    animation.eventCallback("onUpdate", () => {
      //   console.log(animation.progress());
      if (animation.progress() === 1) {
        animation.restart();
      }
    });
  };

  const [boardList, setBoardList] = useState<Board[]>([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/boards")
  //     .then((res) => {
  //       setBoardList(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const router = useRouter();

  const handleBoardClick = (id: string) => {
    router.push(`/board/${id}`);
  };

  return (
    <>
      {/* <LayHeader /> */}
      <CustomBackground>
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            overflow: "hidden",
          }}>
          <video
            autoPlay
            muted
            loop
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            <source src="/video/backVideo1.mp4" type="video/mp4" />
          </video>
        </div>
        <Container maxWidth="xl">
          <InnerContainer>
            {/* <h1 style={{ position: "relative", color: "white" }}>hi</h1> */}
            <WordDiv>
              <div className="word">
                <div className="ex1" data-index="1" ref={firstText}>
                  Relaxing <span>PIC</span>
                </div>
                <div className="ex2" data-index="2" ref={secondText}>
                  Exciting <span>PIC</span>
                </div>
                <div className="ex3" data-index="3" ref={thirdText}>
                  Kid Friendly <span>PIC</span>
                </div>
                <div className="ex4" data-index="4" ref={fourthText}>
                  Romantic <span>PIC</span>
                </div>
              </div>
            </WordDiv>
            {/* <BoradInfo>
              <BoradTitle>게시글</BoradTitle>
              <div style={{ display: "table", width: "100%" }}>
                {boardList.map((board) => (
                  <div key={board.id} style={{ display: "table-row" }}>
                    <div
                      style={{
                        width: "80px",
                        borderLeft: "1px solid #fafafa",
                        display: "table-cell",
                        textAlign: "center",
                        borderBottom: "1px solid #e2e2e2",
                      }}>
                      <BoardListNumberText>titlenum</BoardListNumberText>
                    </div>
                    <div></div>
                    <div
                      style={{
                        display: "table-cell",
                        borderBottom: "1px solid #e2e2e2",
                      }}
                      onClick={() => handleBoardClick(board.id)}>
                      {board.title}
                    </div>
                    <div
                      style={{
                        display: "table-cell",
                        borderBottom: "1px solid #e2e2e2",
                      }}>
                      CreateTime
                    </div>
                  </div>
                ))}
              </div>
            </BoradInfo> */}

            {/* <CustomText style={{ paddingBottom: "5rem" }}>
              게시글 제목
            </CustomText>
            <CustomText
              style={{ paddingBottom: "3em", cursor: "pointer" }}
              onClick={() => router.push("/boardWrite")}>
              글쓰기
            </CustomText>
            <CustomText>
              {boardList.map((board) => {
                return (
                  <CustomText
                    key={board.id}
                    style={{ cursor: "pointer", padding: "1rem" }}>
                    <div onClick={() => handleBoardClick(board.id)}>
                      {board.title}
                    </div>
                  </CustomText>
                );
              })}
            </CustomText> */}
          </InnerContainer>
        </Container>
      </CustomBackground>
    </>
  );
}

const WordDiv = styled("div")`
  position: "relative";
  .word {
    color: #fff;
    font-size: 6.25rem;
    font-weight: 700;
    z-index: 10;
  }

  .word > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  span {
    -webkit-text-stroke: 1px;
    -webkit-text-stroke-color: #fff;
    color: transparent;
  }
`;

// const LayHeader = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [isClient, setIsClient] = useState(false);
//   const username = useSelector((state: RootState) => state.user.username);
//   const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
//   const [isLoginModalOpen, setIsLogginModalOpen] = useState<boolean>(false);

//   const handleLoginClick = () => {
//     setIsLogginModalOpen(!isLoginModalOpen);
//   };

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // 로그아웃시 useEffect
//   // useEffect(() => {
//   //   // This will be executed whenever isLoggedIn state changes
//   //   console.log("isLoggedIn changed:", isLoggedIn);
//   // }, [isLoggedIn]);

//   // useEffect(() => {
//   //   const fetchUser = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         "http://localhost:8080/auth/userInfo",
//   //         {
//   //           withCredentials: true,
//   //         }
//   //       );
//   //       console.log(response.data.username);
//   //       dispatch(login({ username: response.data.username }));
//   //     } catch (error: any) {
//   //       if (error.response && error.response.status === 401) {
//   //         // 401 Unauthorized 에러 발생시 로그아웃 처리
//   //         dispatch(logout());
//   //       } else {
//   //         console.error(error);
//   //       }
//   //     }
//   //   };
//   //   fetchUser();
//   // }, []);

//   // const handleLogout = () => {
//   //   axios
//   //     .post(
//   //       "http://localhost:8080/auth/logout",
//   //       {},
//   //       {
//   //         withCredentials: true,
//   //         headers: {
//   //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//   //         },
//   //       }
//   //     )
//   //     .then((res) => {
//   //       console.log(res);
//   //       dispatch(logout());
//   //       window.location.reload();
//   //     })
//   //     .catch((err) => console.log(err));
//   // };

//   return (
//     <>
//       <LayHeaderCustomBackground>
//         <CustomText>
//           {isClient && (
//             <>
//               {isLoggedIn ? (
//                 <>
//                   username:{username}
//                   <CustomText
//                   // onClick={handleLogout}
//                   >
//                     logout
//                   </CustomText>
//                 </>
//               ) : (
//                 <>
//                   <CustomText onClick={handleLoginClick}>login</CustomText>
//                   <CustomText onClick={() => router.push("/signup")}>
//                     signup
//                   </CustomText>
//                 </>
//               )}
//             </>
//           )}
//         </CustomText>
//       </LayHeaderCustomBackground>
//       {isLoginModalOpen ? (
//         <LoginModalPage
//           setIsLogginModalOpen={setIsLogginModalOpen}
//           isLoginModalOpen={isLoginModalOpen}
//         />
//       ) : null}
//     </>
//   );
// };

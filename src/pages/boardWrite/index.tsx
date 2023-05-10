import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import KakaoMapPageBoard from "@/components/Map/KakaoMap";
import DaumPostcode from "react-daum-postcode";

export default function BoardWrite() {
  // 다음 우편번호 스크립트가 Nextjs 서버사이드 렌더링과 충돌하는 경우 , 이 문제를 해결하기 위해
  // DaumPostCode 컴포넌트를 클라이언트 사이드에서만 렌더링 되도록 조건부 렌더링을 해야한다.
  const [isClient, setIsClient] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [address, setAddress] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/boards", {
        title,
        description,
      });

      console.log(response.data);

      // 게시글 작성후 본인이 작성한 게시글 Detail 로 바로 이동
      const postId = response.data.id;
      router.push(`/board/${postId}`);
      // Redirect to the main page or any other page after successful creation
    } catch (error) {
      console.error(error);
    }
  };

  // 다음 카카오 지도는 패키지 설치로 스크립트를 추가할수없다.
  // 그래서 카카오 지도 관련된 필요한 컴포넌트에서만 useEffect 로 script 를 불러와주는게 가장좋다.

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const showModal = useCallback(() => {
    setIsAddressOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsAddressOpen(false);
  }, []);

  const handleComplete = useCallback((data: any) => {
    setAddress(data.address);
    // setAddressDetail(data.addressDetail); // Optional: if you want to get address detail
    closeModal();
  }, []);

  console.log(address);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      {isAddressOpen ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}>
          <div id="daumLayer" style={{ zIndex: 1000 }}>
            <img
              src="//t1.daumcdn.net/postcode/resource/images/close.png"
              alt="닫기"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 1001,
                cursor: "pointer",
              }}
              onClick={closeModal}
            />
            {isClient && <DaumPostcode onComplete={handleComplete} />}
          </div>
        </div>
      ) : null}
      <div>BoardWrite</div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <h4>title</h4>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <h4>description</h4>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <h4>address</h4>
        <input
          value={address}
          readOnly // 주소는 검색을 통해서만 변경 가능하도록 설정
        />
        <button style={{ marginTop: "3rem" }} type="submit">
          전송
        </button>
      </form>
      <KakaoMapPageBoard address={address} width={600} height={400} />
      <button onClick={showModal}>우편번호 검색</button>
    </section>
  );
}

import { updateAccessToken, updateRefreshToken } from "@/store/feature/actions";
import { login } from "@/store/feature/userSlice";

import { RootState } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });
      console.log(response.data);
      dispatch(login({ username, password })); // username과 password를 리덕스로 저장
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  console.log(username);
  return (
    <section>
      <div onClick={() => router.push("/")}>Home</div>
      <div>LoginPage</div>
      <form onSubmit={handleSubmit}>
        <h4>username</h4>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <h4>password</h4>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">로긴</button>
      </form>
    </section>
  );
}

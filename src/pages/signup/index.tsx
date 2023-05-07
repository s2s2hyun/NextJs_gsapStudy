import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        username: data.username,
        password: data.password,
      });
      console.log(response, "완료? ");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <div onClick={() => router.push("/")}>Home</div>
      <div>LoginPage</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>username</h4>
        <input {...register("username")} />
        <h4>password</h4>
        <input {...register("password")} />
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}

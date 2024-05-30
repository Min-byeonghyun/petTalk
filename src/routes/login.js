import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import {
  Wrapper,
  Title,
  Form,
  Input,
  Switcher,
  Error,
  GuestButton
} from "../styled-components/authstyle";
import GithubButton from "../components/github-button";
import GoogleButton from "../components/google-button";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError("");
    if (isLoading) return;
    try {
      setLoading(true);
      await signInAnonymously(auth);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="이메일을 입력하세요"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "로딩중..." : "로그인"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 없나요?<Link to="/create-account">&rarr;회원가입</Link>
      </Switcher>
      <GoogleButton />
      <GithubButton />
      <GuestButton onClick={handleGuestLogin}>
        비로그인으로 계속하기
      </GuestButton>
    </Wrapper>
  );
}

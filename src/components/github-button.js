import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { Button  } from "../styled-components/socialButtonstyle";
import Githublogo from "../logo/githublogo";

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Githublogo/>
      깃허브 로그인
    </Button>
  );
}
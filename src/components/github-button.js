import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { Button , Logo } from "../styled-components/socialButtonstyle";


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
      <Logo src="/src/logo/github-logo.svg" />
      Continue with Github
    </Button>
  );
}
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button , Logo } from "../styled-components/socialButtonstyle";

export default function GoogleButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/src/logo/google-logo.svg" />
      Continue with Google
    </Button>
  );
}

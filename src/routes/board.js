import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NoticeBoard from "../components/noticeBoard";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Wrapper = styled.div`
   display: grid;
  gap: 30px;
  position: relative;
  padding-bottom: 80px;
  width : 700px;
  max-width : 700px;
  `;

const Button = styled.button`
  width: 120px;
  height: 50px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
  
`;


export default function Board() {
  const navigate = useNavigate();
  const [isAnonymous, setIsAnonymous] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAnonymous(user.isAnonymous);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);
  const onClick = (e) => {
    navigate("/postform")
  }

  return (
    <>
    <Wrapper>
      <NoticeBoard/>
      {!isAnonymous && <Button onClick={onClick}>게시글 올리기</Button>}
    </Wrapper>
      </>
);
}

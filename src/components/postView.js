import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import styled from "styled-components";
import Comment from "./comment";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-width: 850px;
  margin: 0 auto;
  padding: 48px 18px 28px 18px;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 720px;
  min-height: 260px;
  border-radius: 28px;
  object-fit: cover;
  background: #fffbe7;
  box-shadow: 0 6px 26px #ffaa4c22;
  margin-bottom: 32px;
`;

const InfoCard = styled.div`
  width: 100%;
  max-width: 720px;
  background: #fffdfa;
  border-radius: 20px;
  box-shadow: 0 2.5px 18px #ffd79d22;
  padding: 34px 28px 28px 28px;
  margin-bottom: 38px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CommentSection = styled.div`
  width: 100%;
  max-width: 720px;
`;

const Username = styled.p`
  font-size: 21px;
  font-weight: 700;
  color: #ffaa4c;
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
  &::before {
    content: "🐶";
    font-size: 23px;
  }
`;

const Title = styled.h2`
  font-size: 29px;
  font-weight: 900;
  color: #25201e;
  margin-bottom: 14px;
  padding: 10px 15px;
  border-radius: 10px;
  background: #fff7ed;
  box-shadow: 0 2px 10px #ffaa4c10;
`;

const Information = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 22px;
  padding: 11px 4px 11px 8px;
  border-radius: 7px;
  background: #fff;
`;

const ExitButton = styled.button`
  margin-top: 18px;
  padding: 11px 32px;
  background: linear-gradient(90deg, #ffaa4c 65%, #f6ceb2 100%);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 16px 0 #ffaa4c22;
  transition: background 0.14s, box-shadow 0.16s;
  &:hover {
    background: linear-gradient(90deg, #7db9b6 65%, #ffaa4c 100%);
    box-shadow: 0 6px 20px #ffaa4c44;
  }
`;

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, "tweets", id);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          const postData = postSnap.data();
          setPost(postData);
          setUsername(postData.username);

          if (postData.photo) {
            const url = await getDownloadURL(ref(storage, postData.photo));
            setImageUrl(url);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
      }
    };

    fetchPost();
  }, [id]);

  const onExit = () => {
    navigate("/board");
  };

  return (
    <Container>
      {post && (
        <>
          {imageUrl && <Image src={imageUrl} alt="image" />}
          <InfoCard>
            <Username>작성자: {username}</Username>
            <Title>제목 : {post.title}</Title>
            <Information>{post.information}</Information>
          </InfoCard>
          <CommentSection>
            <Comment postId={id} />
          </CommentSection>
          <ExitButton onClick={onExit}>게시글 페이지로 돌아가기</ExitButton>
        </>
      )}
    </Container>
  );
};

export default PostView;

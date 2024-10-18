import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import styled from "styled-components";
import Comment from "./comment";

const Container = styled.div`
  height: 100vh;
  max-width: 800px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border: 2px solid #1d9bf9;
  border-radius: 20px;
  overflow: hidden;
`;

const Image = styled.img`
  max-width: 400px;
  max-height: 500px;
`;

const TextContainer = styled.div`
  width: 320px;
  border: 1px solid #ccc;
  position: relative;
  height: 500px;
`;
const Username = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  padding: 10px;
  border-bottom: 1px solid #1d9bf9;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid #1d9bf9;
`;

const Information = styled.p`
  font-size: 18px;
  color: #555;
  margin: 10px;
`;
const ExitButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #1d9bf9;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0e6abf;
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
          <ImageContainer>
            {imageUrl && <Image src={imageUrl} alt="image" />}
            <TextContainer>
              <Username>작성자: {username}</Username>
              <Title>제목 : {post.title}</Title>
              <Information>{post.information}</Information>
              <ExitButton onClick={onExit}>게시글 페이지로..</ExitButton>
            </TextContainer>
          </ImageContainer>
          <Comment postId={id} />
        </>
      )}
    </Container>
  );
};

export default PostView;

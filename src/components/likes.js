import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  user-select: none;
`;

const HeartIcon = styled.svg`
  width:20px;
  height: 20px;
`;

const LikeText = styled.span`
  color: black;
  font-size: 16px;
  font-weight: 400;
`;

const Likes = ({ postId, ...props }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchLikes = async () => {
      const postRef = doc(db, "tweets", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const postData = postSnap.data();
        setLikes(postData.likes || 0);
        setLiked(postData.likedUsers?.includes(user.uid) || false);
      }
    };

    fetchLikes();
  }, [postId, user]);

  const toggleLike = async () => {
    const postRef = doc(db, "tweets", postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data();
      const currentLikes = postData.likes || 0;
      const likedUsers = postData.likedUsers || [];

      if (likedUsers.includes(user.uid)) {
        
        await updateDoc(postRef, {
          likes: currentLikes - 1,
          likedUsers: likedUsers.filter(uid => uid !== user.uid)
        });
        setLikes(currentLikes - 1);
        setLiked(false); 
      } else {
        
        await updateDoc(postRef, {
          likes: currentLikes + 1,
          likedUsers: [...likedUsers, user.uid]
        });
        setLikes(currentLikes + 1);
        setLiked(true); 
      }
    }
  };

  return (
    <LikeContainer onClick={toggleLike} {...props}>
      <HeartIcon
        liked={liked.toString()}
        fill={liked ? "red" : "none"}
        stroke={liked ? "red" : "currentColor"}
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </HeartIcon>
      <LikeText>{likes} likes</LikeText>
    </LikeContainer>
  );
};

export default Likes;
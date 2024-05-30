import React, { useState, useEffect, useCallback } from "react";
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";
import styled from "styled-components";

const CommentContainer = styled.div`
  margin-top: 20px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;

const CommentText = styled.p`
  margin: 0;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  
  &:hover {
    background-color: #ff1a1a;
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background-color: #1d9bf9;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  
  &:hover {
    background-color: #0e6abf;
  }
`;

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const currentUser = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "tweets", postId, "comments"),
        orderBy("createdAt", "desc") 
      ),
      (snapshot) => {
        const commentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setComments(commentsData);
      }
    );

    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = useCallback(async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addDoc(collection(db, "tweets", postId, "comments"), {
        text: newComment,
        username: currentUser.displayName,
        userId: currentUser.uid,
        createdAt: new Date()
      });
      setNewComment("");
    } catch (error) {
      console.error("댓글 추가 오류 : ", error);
    }
  }, [newComment, postId, currentUser]);

  const handleDeleteComment = useCallback(async (commentId) => {
    try {
      await deleteDoc(doc(db, "tweets", postId, "comments", commentId));
    } catch (error) {
      console.error("댓글 삭제 오류 : ", error);
    }
  }, [postId]);

  return (
    <CommentContainer>
      <CommentList>
        {comments.map(comment => (
          <CommentItem key={comment.id}>
            <CommentText>{comment.username}: {comment.text}</CommentText>
            {comment.userId === currentUser.uid && (
              <DeleteButton onClick={() => handleDeleteComment(comment.id)}>삭제</DeleteButton>
            )}
          </CommentItem>
        ))}
      </CommentList>
      <CommentForm onSubmit={handleAddComment}>
        <TextArea
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 남겨주세요"
        />
        <SubmitButton type="submit">댓글 작성</SubmitButton>
      </CommentForm>
    </CommentContainer>
  );
};

export default Comment;
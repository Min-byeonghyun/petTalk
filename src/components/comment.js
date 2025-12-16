import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import styled from "styled-components";

const CommentContainer = styled.div`
  margin: 36px auto 0;
  padding: 26px 24px 14px 24px;
  background: #fffdfa;
  border-radius: 20px;
  box-shadow: 0 2.5px 16px #ffd79d18;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
`;

const CommentItem = styled.li`
  display: flex;
  align-items: flex-start;
  background: #fff7ed;
  border-radius: 12px;
  box-shadow: 0 2px 7px #ffd79d22;
  margin-bottom: 12px;
  padding: 10px 18px 13px 15px;
  font-size: 16px;
  color: #333;
  gap: 12px;
`;

const CommentText = styled.p`
  margin: 0;
  flex: 1;
  word-break: break-all;
`;

const DeleteButton = styled.button`
  background: #ff7575;
  color: #fffbe7;
  border: none;
  border-radius: 14px;
  padding: 4px 16px;
  font-size: 12px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #ff5b2e;
  }
`;

const CommentForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

const TextArea = styled.textarea`
  flex: 1;
  min-height: 46px;
  max-height: 120px;
  border-radius: 16px;
  padding: 12px 14px;
  background: #fff;
  font-size: 16px;
  border: 1.5px solid #ffd79d;
  resize: vertical;
  box-shadow: 0 1px 5px #ffd79d15;
  margin-right: 8px;
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, #ffaa4c 65%, #f6ceb2 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 0 22px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.16s;
  &:hover {
    background: linear-gradient(90deg, #7db9b6 65%, #ffaa4c 100%);
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
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      }
    );

    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newComment.trim()) return;

      try {
        await addDoc(collection(db, "tweets", postId, "comments"), {
          text: newComment,
          username: currentUser.displayName,
          userId: currentUser.uid,
          createdAt: new Date(),
        });
        setNewComment("");
      } catch (error) {
        console.error("댓글 추가 오류 : ", error);
      }
    },
    [newComment, postId, currentUser]
  );

  const handleDeleteComment = useCallback(
    async (commentId) => {
      try {
        await deleteDoc(doc(db, "tweets", postId, "comments", commentId));
      } catch (error) {
        console.error("댓글 삭제 오류 : ", error);
      }
    },
    [postId]
  );

  return (
    <CommentContainer>
      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentText>
              {comment.username}: {comment.text}
            </CommentText>
            {comment.userId === currentUser.uid && (
              <DeleteButton onClick={() => handleDeleteComment(comment.id)}>
                삭제
              </DeleteButton>
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

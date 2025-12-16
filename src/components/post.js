import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Likes from "./likes";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  background: #fffdfa;
  border-radius: 26px;
  box-shadow: 0 4px 16px #ffaa4c22, 0 1px 4px #fff9e94d;
  border: 2.5px solid #ffe3b3;
  margin-bottom: 24px;
  transition: box-shadow 0.18s, transform 0.18s;
  padding: 24px 30px 18px 24px;
  gap: 20px;
  position: relative;
  margin-top: 20px;
  &:hover {
    box-shadow: 0 8px 32px #ffaa4c49;
    transform: translateY(-5px) scale(1.011);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Photo = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  border: 4px solid #ffaa4c;
  object-fit: cover;
  background: #fffbe7;
  box-shadow: 0 2px 11px #ffaa4c22;
  margin-right: 9px;
`;

const UserAvatarFallback = styled.div`
  width: 86px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffe8ba;
  border-radius: 50%;
  border: 4px solid #ffaa4c;
  font-size: 37px;
  color: #fff;
  margin-right: 9px;
`;

const Username = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: #ffaa4c;
  margin-bottom: 1px;
  letter-spacing: -0.2px;
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: "🐶";
  }
`;

const Title = styled.p`
  background: #fff7ed;
  font-size: 19px;
  font-weight: 700;
  color: #222;
  border-radius: 12px;
  padding: 7px 18px;
  margin: 7px 0 2px 0;
  box-shadow: 0 1px 5px #f6ceb244;
`;

const Information = styled.p`
  background: #fff;
  font-size: 16px;
  color: #575251;
  border-radius: 9px;
  padding: 6px 15px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button`
  margin: 8px 0px;
  background: #ff7575;
  color: #fffbe7;
  font-weight: 700;
  border: none;
  font-size: 13px;
  padding: 6px 16px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 1.5px 6px #ff757544;
  transition: background 0.13s;
  &:hover {
    background: #ff5b2e;
  }
`;
const EditButton = styled.button`
  margin: 8px 0px;
  background: #7db9b6;
  color: #fff;
  font-weight: 600;
  border: none;
  font-size: 13px;
  padding: 6px 16px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 1.5px 6px #7db9b644;
  transition: background 0.13s;
  &:hover {
    background: #58948f;
  }
`;
const ViewButton = styled.button`
  margin: 10px 0px 0 0;
  background: linear-gradient(90deg, #ffaa4c 60%, #7db9b6 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 28px;
  padding: 8px 20px;
  box-shadow: 0 1.5px 8px #ffaa4c33;
  transition: background 0.16s, box-shadow 0.16s;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  &::after {
    content: " 🐾";
    font-size: 19px;
  }
  &:hover {
    background: linear-gradient(90deg, #f6ceb2 60%, #ffaa4c 100%);
  }
`;

export default function Post({
  username,
  photo,
  title,
  information,
  userId,
  id,
}) {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = window.confirm("게시글을 정말로 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onEdit = () => {
    navigate(`/editForm/${id}`);
  };
  const onView = () => {
    navigate(`/postview/${id}`);
  };
  return (
    <Wrapper>
      {photo ? (
        <Column>
          <Photo src={photo} alt="profile" />
        </Column>
      ) : (
        <Column>
          <UserAvatarFallback>🐾</UserAvatarFallback>
        </Column>
      )}
      <Column>
        <Username>{username}</Username>
        <Title>{title}</Title>
        <Information>{information}</Information>
        <ButtonContainer>
          {user?.uid === userId && (
            <>
              <EditButton onClick={onEdit}>수정하기</EditButton>
              <DeleteButton onClick={onDelete}>글 삭제</DeleteButton>
            </>
          )}
          <ViewButton onClick={onView}>상세 보기</ViewButton>
        </ButtonContainer>
      </Column>
      <Likes postId={id} />
    </Wrapper>
  );
}

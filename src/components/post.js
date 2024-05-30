import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Likes from "./likes";


const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  align-items: center;
  max-width: 800px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Photo = styled.img`
 width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  

`;


const Username = styled.div`
  width: 100%;
  border-bottom: 2px solid #ddd;
  font-weight: 600;
  font-size: 16px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  color: #333;

`;

const Title = styled.p`
  margin: 8px 0;
  font-size: 18px;
  font-weight: bold;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  
`;

const Information = styled.p`
  margin: 8px 0;
  font-size: 16px;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  
  
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button`
  max-width: 100px;
  margin : 8px 0px;
  background-color : #ff0000;
  color : wheat;
  font-weight : 600;
  border : 0;
  font-size : 12px;
  padding : 5px 10px;
  border-radius : 5px;
  text-align : center;
  cursor: pointer;

`;
const EditButton = styled.button`
  max-width: 100px;
  margin: 8px 0px;
  background-color: #1d9bf9;
  color: wheat;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;
const ViewButton = styled.button`
   max-width: 100px;
  margin: 8px 0px;
  background-color: #4CAF50;
  color: wheat;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`



export default function Post({ username, photo, title, information , userId , id }) {
   const navigate = useNavigate()
  const user = auth.currentUser;
  const onDelete = async () => {
    // eslint 비활성화
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm("게시글을 정말로 삭제하시겠습니까?");
    if(!ok || user?.uid !== userId) return;
    try{
      await deleteDoc(doc(db, "tweets", id));
      if(photo){
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    }catch(e){
      console.log(e);
    }finally{

    }
  }

  const onEdit = () => {
    navigate(`/editForm/${id}`)
  }
  const onView = () => {
    navigate(`/postview/${id}`)
  }


  return (
    <Wrapper>
      {photo ? (
      <Column>
        <Photo src={photo}/>
      </Column>) : null}
      <Column>
      <Username>작성자: {username}</Username>
      <Title>제목 : {title}</Title>
      <Information>{information}</Information>
      {user?.uid === userId ? 
      (<ButtonContainer> <EditButton onClick={onEdit}>수정하기</EditButton> <DeleteButton onClick={onDelete}>글 삭제</DeleteButton> </ButtonContainer>) : null}
      <ViewButton onClick={onView}>상세 보기</ViewButton>
      </Column>
      <Likes postId={id}/>
    </Wrapper>
  );
}

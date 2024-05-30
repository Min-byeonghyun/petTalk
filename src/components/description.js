import { MdOutlinePostAdd } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import styled from "styled-components";
import { Link } from "react-router-dom";


const DescriptionCon = styled.div`
  width : 100%;
  display: flex;
  justify-content: space-around;
  
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ItemCon = styled(Link)`
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;
const ItemTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ItemText = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
`;

const iconStyle = `
  font-size: 48px;
  color: #007BFF;
  margin-bottom: 10px;
`;

const PostIcon = styled(MdOutlinePostAdd)`
  ${iconStyle}
`;

const InfoIcon = styled(IoInformationCircleOutline)`
  ${iconStyle}
`;

const ProfileIcon = styled(CgProfile)`
  ${iconStyle}
`;

export default function Description(){
 

  


  return(
    <DescriptionCon>
      <ItemCon to="/board">
        <PostIcon/>
        <ItemTitle>Board</ItemTitle>
        <ItemText>
          {
            '다른 견주들의 일상은?'
          }<br/>
          {
            'Board 게시판에서 우리집 강아지를 자랑하고 다른 견주들의 이야기도 들어보세요!'
          }               
        </ItemText>
      </ItemCon>
      <ItemCon to="/info">
        <InfoIcon/>
        <ItemTitle>Info</ItemTitle>
        <ItemText>
        {
            '내 주변을 검색하고 내 강아지를 위한 애견용품 가게 찾기!'
          }<br/>
          {
            '가장 가까운 애견용품 가게는 어디일까? 위치 기반으로 가까운 애견용품가게를 찾고싶다면 클릭하세요!' 
          }
        </ItemText>
      </ItemCon>
      <ItemCon to="/profile">
        <ProfileIcon/>
        <ItemTitle>Profile</ItemTitle>
        <ItemText>
        {
            '내 SNS 게시판글을 보고싶다면?'
          }<br/>
          {
            '내가 올린 강아지의 게시판글들을 보고 수정,삭제도 할 수 있어요!' 
          }
        </ItemText>
      </ItemCon>
    </DescriptionCon>

  )
}
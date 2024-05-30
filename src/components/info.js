import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import MapContainer from './mapContainer';

const InfoContainer = styled.div`
  width: 1000px;
  height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  text-align: center;
`;

const InfoTitle = styled.h1`
  font-size: 32px;
  color: #1d9bf9;
  margin-bottom: 20px;
  font-weight: 700;
`;

const InfoLocation = styled.h2`
  font-size: 24px;
  color: #555;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const InfoShop = styled.p`
  font-size: 18px;
  color: #777;
  margin-bottom: 20px;
  font-weight: 400;
`;

const InfoMapForm = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
`;

const LocationInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  width: 40%;
`;

const LocationButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 12px;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


const Info = () => {
  const [region, setRegion] = useState("");

  const onChangeRegion = (e) => {
    setRegion(e.target.value);
  }
  const onSubmit= (e)=>{
    e.preventDefault();
  }


  return (
    <InfoContainer>
      <InfoTitle>INFO</InfoTitle>
      <InfoLocation>애견을 위한 장소 찾기</InfoLocation>
      <InfoShop>내 위치에서 애견샵을 찾아보세요!!</InfoShop>
      <InfoMapForm>
        <InfoLocation>현재 위치 : </InfoLocation>
        <LocationBox>
          <LocationInput value={region} onChange={onChangeRegion} placeholder="현재 위치를 입력하세요" />
          <LocationButton type="submit" onClick={onSubmit}>
            <FaSearch />
          </LocationButton>
        </LocationBox>
        <MapContainer searchPlace={region + "애견용품"}/>
      </InfoMapForm>
    </InfoContainer>
  );
};

export default Info;
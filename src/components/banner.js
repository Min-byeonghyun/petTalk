import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import banner1 from '../banner/banner1.png';
import banner2 from '../banner/banner2.png';
import banner3 from '../banner/banner3.png';
import banner4 from '../banner/banner4.png';

const bgImg = [banner1, banner2, banner3, banner4];

const CarouselContainer = styled.div`
  width: 100%; 
  margin: 0 auto; 
  

`;

const ImageWrapper = styled.div`
  height: 500px; 
  display: flex;
  justify-content: center;
  align-items: center;
  background: #E2E2E2; 
  position : relative;
`;

const Image = styled.img`
  max-height: 100%; 
  max-width: 100%; 
  object-fit: contain; 
  object-position: center; 
  opacity: 0.5;
`;
const TextOverlay = styled.div`
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  color: white; 
  font-size: 2rem; 
  text-align: center; 
  font-weight: bold; 
  z-index: 1; 
`;

const Banner = () => {
  return (
    <CarouselContainer>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false} 
        showStatus={false} 
        showIndicators={false} 
        interval={3000} // 3초 간격으로 배너 전환
      >
        {bgImg.map((img, index) => (
          <ImageWrapper key={index}>
            <Image src={img} alt={`Banner ${index + 1}`} />
            <TextOverlay>펫톡에 오신걸 환영합니다!!!</TextOverlay>
          </ImageWrapper>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default Banner;
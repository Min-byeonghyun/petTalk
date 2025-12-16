import styled from "styled-components";

export const Wrapper = styled.div`
  background: rgba(255, 250, 235, 0.99);
  border-radius: 32px;
  box-shadow: 0 6px 32px 0 rgba(255, 170, 76, 0.1),
    0 2px 8px 0 rgba(80, 60, 40, 0.06);
  padding: 48px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
  margin: 48px auto 32px auto;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 38px;
  font-weight: 800;
  color: #ffaa4c;
  margin-bottom: 12px;
  letter-spacing: -1.2px;
  text-shadow: 0 1px 0 #fff3e8, 0 3px 12px #ffaa4c30;
  display: flex;
  align-items: center;
  gap: 8px;
  &::after {
    content: "🐾";
    font-size: 32px;
    margin-left: 8px;
  }
`;

export const Form = styled.form`
  margin-top: 32px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 14px 24px;
  border-radius: 22px;
  border: 2px solid #ffe3b3;
  background: #fff;
  font-size: 18px;
  transition: border 0.18s, box-shadow 0.18s;
  box-shadow: 0 1px 8px 0 #ffaa4c11;
  &:focus {
    border: 2px solid #ffaa4c;
    box-shadow: 0 2px 12px #ffaa4c22;
  }
  &[type="submit"] {
    background: linear-gradient(90deg, #ffaa4c 65%, #f6ceb2 100%);
    color: #fff !important;
    font-weight: 700;
    font-size: 20px;
    cursor: pointer;
    border: none;
    transition: filter 0.14s;
    box-shadow: 0 2px 12px 0 #ffaa4c33;
    &:hover {
      filter: brightness(0.97) contrast(1.1);
      box-shadow: 0 4px 18px 0 #ffaa4c33;
    }
  }
`;

export const Error = styled.span`
  font-weight: 700;
  color: #ff5b2e;
  border-left: 4px solid #ffaa4c;
  padding-left: 10px;
  background: #fff6ee;
  border-radius: 7px;
  margin-top: 6px;
`;

export const Switcher = styled.span`
  margin-top: 18px;
  a {
    color: #ffaa4c;
    font-weight: bold;
    transition: color 0.18s;
  }
  a:hover {
    color: #7db9b6;
    text-decoration: underline;
  }
`;

export const GuestButton = styled.button`
  padding: 13px 24px;
  border-radius: 22px;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  background: #7db9b6;
  color: white;
  margin-top: 18px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 12px #7db9b644;
  letter-spacing: -0.5px;
  transition: background 0.16s, box-shadow 0.16s;
  &:hover {
    background: #64a3a0;
    box-shadow: 0 4px 16px #7db9b644;
    filter: brightness(0.94);
  }
`;

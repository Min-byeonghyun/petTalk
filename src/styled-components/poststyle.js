import styled from "styled-components";

export const Form = styled.form`
   display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-top : 70px;
  max-width: 800px;
  width : 700px;
`;
export const PostTitle = styled.h2`

  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #1d9bf9;
  text-align: center;
`;

export const TitleArea = styled.textarea`
  height: auto;
  border: 2px solid black;
  padding: 12px;
  border-radius: 20px;
  font-size: 15px;
  color: black;
  width: 100%;
  resize: none;
  overflow: hidden;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  &::placeholder {
    font-size: 20px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf9;
  }
`;

export const TextArea = styled.textarea`
  height: 320px;
  border: 2px solid black;
  padding: 20px;
  border-radius: 20px;
  font-size: 18px;
  color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 20px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf9;
  }
`;
export const PriceArea = styled.textarea`
  height: 50px;
  border: 2px solid black;
  padding: 12px;
  border-radius: 20px;
  font-size: 12px;
  color: black;
  width: 50%;
  resize: none;
  overflow: hidden;
  font-weight: bold;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  &::placeholder {
    font-size: 20px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf9;
  }
`;

export const AttachFileButton = styled.label`
  font-size: 14px;
  font-weight: 600;
  padding: 10px 0px;
  color: #1d9bf9;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf9;
  cursor: pointer;
`;

export const AttachFileInput = styled.input`
  display : none;

`;

export const SubmitBtn = styled.input`
  background-color: #1d9bf9;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

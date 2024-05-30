import React from "react";
import styled from "styled-components";

const Pagination = styled.div`

  display: flex;
  justify-content: center;
  margin-top: 20px;
  
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: #fff;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const Page = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
        {"<"}
      </PageButton>
      {[...Array(totalPages)].map((_, index) => (
        <PageButton
          key={index}
          onClick={() => onPageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </PageButton>
      ))}
      <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
        {">"}
      </PageButton>
    </Pagination>
  );
};

export default Page;
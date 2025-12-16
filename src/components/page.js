import React from "react";
import styled from "styled-components";

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 7px 15px;
  border: none;
  border-radius: 9px;
  font-size: 16px;
  font-weight: 700;
  background: ${(props) =>
    props.disabled
      ? "#ffe3b3"
      : props.active
      ? "linear-gradient(90deg, #ffaa4c 60%, #f6ceb2 100%)"
      : "#ffaa4c"};
  color: ${(props) => (props.disabled ? "#bdbdbd" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-shadow: ${(props) =>
    props.active ? "0 2px 10px #ffaa4c55" : "0 1px 3px #ffd79d33"};
  transition: background 0.16s, color 0.15s, box-shadow 0.18s;
  &:hover {
    background: ${(props) =>
      props.disabled
        ? "#ffe3b3"
        : "linear-gradient(90deg, #ffaa4c 70%, #7db9b6 100%)"};
    color: #fff;
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
          active={currentPage === index + 1}
        >
          {index + 1}
        </PageButton>
      ))}
      <PageButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        {">"}
      </PageButton>
    </Pagination>
  );
};

export default Page;

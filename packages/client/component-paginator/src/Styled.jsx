import styled from "styled-components";

export const PaginatorContainer = styled.div`
  line-height: 16px;
  position: relative;
`;

export const PaginatorPage = styled.div`
  display: inline-block;
  padding: 4px 10px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
  color: ${props => (props.active ? "blue" : "black")};
  user-select: none;
`;

export const PaginatorLeft = styled.div`
  width: 33%;
  display: inline-block;
`;

export const PaginatorCenter = styled.div`
  width: 33%;
  line-height: 18px;
  text-align: center;
  display: inline-block;
`;

export const PaginatorInput = styled.div`
  display: inline-block;
`;

export const PaginatorRight = styled.div`
  display: inline-block;
  width: 33%;
  text-align: right;
`;

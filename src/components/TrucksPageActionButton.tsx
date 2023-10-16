import styled from "styled-components";

const TrucksPageActionButton = styled.button`
  display: block;
  width: 175px;
  height: 35px;
  background-color: #333332;
  color: white;
  text-align: center;
  line-height: 35px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  text-decoration: none;
  border: none;
  background-clip: padding-box;
  outline: none;
  &:hover {
    background-color: #555;
  }
  &:first-of-type {
    margin-top: 0;
  }
`;

export default TrucksPageActionButton;
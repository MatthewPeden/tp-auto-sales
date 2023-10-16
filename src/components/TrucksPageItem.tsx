import styled from "styled-components";

const TrucksPageItem = styled.div`
  display: flex;
  align-items: center;  // This will vertically center TrucksPageInfo and TrucksActionButtonContainer
  margin-bottom: 10px;
  background-color: #ffffff;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

export default TrucksPageItem;
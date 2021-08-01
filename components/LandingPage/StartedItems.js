import styled from "styled-components";
import Colors from "../../constants/colors";

const StartedItems = styled.li`
  color: ${Colors.black};
  font-family: Oswald;
  font-style: normal;
  font-weight: lighter;
  font-size: 25px;
  text-align: center;
  list-style: "❑";
  padding: 17px;
  border-left: 2px solid grey;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export default StartedItems;

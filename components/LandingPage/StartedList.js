import styled from "styled-components";
import Colors from "../../constants/colors";

const StartedList = styled.ul`
  position: absolute;
  top: -450px;
  width: 80%;
  left: 100px;
  padding: 20px;
  @media (max-width: 950px) {
    width: 100%;
    left: 0px;
    margin-top: -350px;
    position: static;
  }
  @media (max-width: 768px) {
    margin-top: -150px;
  }
`;

export default StartedList;

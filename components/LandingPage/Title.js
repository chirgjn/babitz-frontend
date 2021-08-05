import styled from "styled-components";
import Colors from "../../constants/colors";

const Title = styled.h1`
  color: ${Colors.black};
  font-family: Oswald;
  font-style: normal;
  font-size: 10vw;
  line-height: 0px;
  text-align: center;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  margin-top: -70px;
  @media (max-width: 768px) {
    margin-top: 0px;
    font-size: 60px;
  }
`;

export default Title;

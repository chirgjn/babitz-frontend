import styled from "styled-components";
import Colors from "../../constants/colors";

const Heading1 = styled.h1`
  color: ${Colors.black};
  font-family: Oswald;
  font-style: normal;
  font-weight: 300;
  font-size: 2.5vw;
  line-height: 90px;
  text-align: center;
  letter-spacing: 0.27em;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export default Heading1;

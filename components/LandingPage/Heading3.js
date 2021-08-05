import styled from "styled-components";
import Colors from "../../constants/colors";

const Heading3 = styled.h3`
  color: ${Colors.black};
  font-family: Oswald;
  font-style: normal;
  font-weight: lighter;
  font-size: 25px;
  text-align: center;
  line-height: 38px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export default Heading3;

import styled from "styled-components";
import Colors from "../../constants/colors";

const Heading2 = styled.h2`
  color: ${Colors.black};
  font-family: Oswald;
  font-style: normal;
  font-weight: 500;
  font-size: 55px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

export default Heading2;

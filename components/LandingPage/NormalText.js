import styled from "styled-components";
import Colors from "../../constants/colors";

const NormalText = styled.p`
  color: ${Colors.grey};
  font-family: Oswald;
  font-style: normal;
  font-size: 30px;
  text-align: center;
  width: 450px;
  @media (max-width: 768px) {
    font-size: 25px;
    width: 100%;
  }
`;

export default NormalText;

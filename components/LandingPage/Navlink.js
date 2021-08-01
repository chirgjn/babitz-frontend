import styled from "styled-components";
import Colors from "../../constants/colors";

const Navlink = styled.a`
  margin: 30px;
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 44px;
  text-align: center;
  color: ${Colors.black};
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: grey;
  }
  &:after {
    text-decoration: none;
    /* color:black; */
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Navlink;

import styled from "styled-components";
import Colors from '../constants/colors';

const Button = styled.button`
  width: 250px;
  background: ${Colors.buttonyellow};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 25px;
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;
  padding: 7px;
  @media (max-width: 768px) {
    font-size: 15px;
    width: 150px;
    padding: 5px;
  }
`;

export default Button;

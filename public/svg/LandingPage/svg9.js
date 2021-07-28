import styled from "styled-components";

const Images = styled.svg`
  @media (max-width: 768px) {
    display: none;
  }
`;
function SVG9(){
  return(      <Images
                  style={{ marginTop: "200px", marginLeft: "-80px" }}
                  width="300"
                  height="300"
                  viewBox="0 0 276 387"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="74"
                    y="4"
                    width="52"
                    height="292"
                    rx="26"
                    fill="#FBB300"
                  />
                  <rect
                    x="167"
                    y="83"
                    width="38"
                    height="122"
                    rx="19"
                    fill="#FBB300"
                  />
                  <rect
                    x="7"
                    y="226"
                    width="26"
                    height="161"
                    rx="13"
                    fill="#FBB300"
                  />
                  <rect
                    x="242"
                    y="307"
                    width="34"
                    height="52"
                    rx="17"
                    fill="#FBB300"
                  />
                  <rect x="67" width="52" height="292" rx="26" fill="#FFC535" />
                  <rect
                    x="160"
                    y="79"
                    width="38"
                    height="122"
                    rx="19"
                    fill="#FFC535"
                  />
                  <rect
                    y="222"
                    width="26"
                    height="161"
                    rx="13"
                    fill="#FFC535"
                  />
                  <rect
                    x="235"
                    y="303"
                    width="34"
                    height="52"
                    rx="17"
                    fill="#FFC535"
                  />
                </Images>)
}
export default SVG9;

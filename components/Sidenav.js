import styled from "styled-components";
import ActiveLink from "../helpers/activelink";
import styles from "../styles/Sidenav.module.css";
// import { NavLink, Link } from 'react-router-dom';
// import Link from 'next/link'
const Body = styled.div`
  width: 25%;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  padding: 0px;
  padding-bottom: 50px;
  margin: 0px;
  background: #4b4b60;
  box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.25);
  /* border-top-right-radius: 25px ; */
  /* border-bottom-right-radius: 25px ; */
  @media (max-width: 992px) {
    display: none;
  }
`;
const Heading = styled.h4`
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 55px;
  color: white;
  margin-left: 25px;
  cursor: pointer;
`;
const HeadingDiv = styled.div`
  margin-top: 60px;
  /* margin-left:10px; */
`;
function Sidenav() {
  return (
    <div>
      <div className="row">
        <Body>
          <div className="col-md-12">
            <svg
              style={{ margin: "20px 0px 0px 10px" }}
              width="60"
              height="60"
              viewBox="0 0 90 77"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M62.088 51.6343L69.032 32.0183H62.44V28.7543H73.8V31.1863L66.568 51.4423H73.832V54.6743H62.088V51.6343Z"
                fill="white"
              />
              <path
                d="M2.952 28.7543H9.352C11.8053 28.7543 13.6827 29.2556 14.984 30.2583C16.2853 31.2609 16.936 32.9783 16.936 35.4103C16.936 36.9889 16.616 38.2263 15.976 39.1223C15.336 39.9969 14.408 40.5303 13.192 40.7223C16.1787 41.2983 17.672 43.4316 17.672 47.1223C17.672 49.6183 17.064 51.5063 15.848 52.7863C14.632 54.0449 12.8293 54.6743 10.44 54.6743H2.952V28.7543ZM9.288 39.3463C10.6533 39.3463 11.5813 39.0476 12.072 38.4503C12.584 37.8316 12.84 36.8396 12.84 35.4743C12.84 34.1516 12.5093 33.2556 11.848 32.7863C11.208 32.2956 10.1307 32.0503 8.616 32.0503H7.656V39.3463H9.288ZM9.48 51.3463C10.8667 51.3463 11.8267 51.0156 12.36 50.3543C12.8933 49.6929 13.16 48.6049 13.16 47.0903C13.16 45.5329 12.8613 44.4023 12.264 43.6983C11.688 42.9729 10.7067 42.6103 9.32 42.6103H7.656V51.3463H9.48Z"
                fill="white"
              />
              <path
                d="M1.3252 75.3485L74.6737 2.00002"
                stroke="white"
                strokeWidth="3"
              />
              <path
                d="M74.6738 75.3485L1.32533 2.00003"
                stroke="white"
                strokeWidth="3"
              />
            </svg>

            <HeadingDiv>
              <ActiveLink
                activeClassName={styles.active}
                href="/Dashboard/dashboard"
              >
                <div>
                  <Heading>Statistics</Heading>
                  <div></div>
                </div>
              </ActiveLink>
            </HeadingDiv>
            <HeadingDiv>
              <ActiveLink
                activeClassName={styles.active}
                href="/Dashboard/inventory"
              >
                <div>
                  <Heading>Manage Inventory</Heading>
                  <div></div>
                </div>
              </ActiveLink>
            </HeadingDiv>
            <HeadingDiv>
              <ActiveLink
                activeClassName={styles.active}
                href="/Dashboard/orderlogs"
              >
                <div>
                  <Heading>Order Logs</Heading>
                  <div></div>
                </div>
              </ActiveLink>
            </HeadingDiv>
            <HeadingDiv>
              <ActiveLink
                activeClassName={styles.active}
                href="/Dashboard/paymentlogs"
              >
                <div>
                  <Heading>Paymnet Logs</Heading>
                  <div></div>
                </div>
              </ActiveLink>
            </HeadingDiv>
          </div>
        </Body>
      </div>
    </div>
  );
}

export default Sidenav;

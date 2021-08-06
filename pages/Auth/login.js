import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import { useState } from "react";
import "firebase/auth";
import initFirebase from "../../services/firebase.js";
import withoutAuth from "../../helpers/withoutAuth";
import SigninBg from "../../public/svg/Login/signinbg";
import SigninLogo from "../../public/svg/Login/singinlogo";
import HandleAuth from "../../public/svg/Login/handleauth";

initFirebase();

const provider = new firebase.auth.GoogleAuthProvider();

//---------styling-starts----------
const Box = styled.div`
  padding: 40px;
  margin-top: 70px;
  background: none;
  box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  position: absolute;
  top: 0;
  width: 100%;
  margin-left: 40px;
  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;
const Heading1 = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 45px;
  line-height: 40px;
  /* or 73% */
  text-align: center;
  letter-spacing: 0.03em;
`;
const Heading2 = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: 300;
  font-size: 32px;
  line-height: 40px;
  /* or 125% */
  text-align: center;
`;
const Heading3 = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 45px;
  line-height: 40px;
  /* or 73% */
  text-align: center;
  letter-spacing: 0.03em;
  @media (max-width: 768px) {
    display: none;
  }
`;
const NormalText = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 40px;
  /* or 200% */
  color: #7d8491;
`;

//---------styling-ends------------

function Login() {
  const router = useRouter();
  const [authorizing, setAuthorizing] = useState(false);

  const handleAuthentication = async () => {
    setAuthorizing(true);

    const result = await firebase.auth().signInWithPopup(provider);

    const { user } = result;
    if (!user) {
      throw new Error("There was an issue authorizing");
    }
    var formdata = new FormData();
    if (result.additionalUserInfo.isNewUser) {
      setAuthorizing(false);
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(formdata),
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.Aa,
        },
      };
      fetch("https://babitz-backend.herokuapp.com/myrestaurant", requestOptions)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          router.push("/Template/chooseTemplate");
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (!result.additionalUserInfo.isNewUser) {
      setAuthorizing(false);
      router.push("/Dashboard/dashboard");
    }
  };
  const signUp = () => {
    router.push("/Auth/signup");
  };
  const home = () => {
    router.push("/");
  };
  return (
    <div>
      <Head>
        <title>Babitz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ position: "relative" }}>
        <SigninBg />
        <div
          className="container"
          style={{ position: "absolute", top: 0, width: "90%" }}
        >
          <Box>
            <div className="row">
              <div className="col-sm-6">
                <div onClick={home}>
                  <SigninLogo style={{ cursor: "pointer" }} />
                </div>
                <center>
                  <Heading1 style={{ marginTop: "40px" }}>
                    Welcome Back
                  </Heading1>
                  <Heading2
                    style={{ marginTop: "40px", marginBottom: "100px" }}
                  >
                    Sign in to continue your account.
                  </Heading2>
                </center>
              </div>

              <div className="col-sm-6">
                <center>
                  <Heading3 style={{ marginTop: "40px" }}>Sign In</Heading3>
                  <div onClick={handleAuthentication}>
                    <HandleAuth />
                  </div>
                  <NormalText>
                    Don’t have an Account ?
                    <button
                      onClick={signUp}
                      style={{
                        border: "none",
                        background: "none",
                        fontFamily: "Oswald",
                        fontSize: "20px",
                        color: "black",
                        outline: "none",
                      }}
                    >
                      Sign Up
                    </button>
                  </NormalText>
                </center>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
export default withoutAuth(Login);

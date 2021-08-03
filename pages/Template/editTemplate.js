import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import withAuth from "../../helpers/withAuth";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import styled from "styled-components";
import { useRouter } from "next/router";
import Edit from "../../helpers/edittemp";
import firebase from "firebase/app";

//----------style-starts---------

const Logo = styled.p`
  font-size: 37px;
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  line-height: 67px;
  color: lightgrey;
`;
const Home = styled.div`
  background-image: url("/Bg_Template1.jpg");
  min-height: 60vh;
  width: 100%;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center;
`;
const Restname = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: 500;
  font-size: 80px;
  line-height: 100px;
  text-align: center;
  letter-spacing: -0.015em;
  color: white;
`;
const Restdescr = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  text-align: center;
  color: white;
`;
const Items = styled.div`
  background: #e5e5e5;
  padding: 20px 0px 20px 0px;
`;
const Box = styled.div`
  margin-top: 30px;
  background: #ffffff;
  border-radius: 25px;
  padding: 20px 30px 20px 30px;
`;
const Itemname = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 30px;
`;
const Itemprice = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: 300;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: #7d8491;
`;
const Itemdescr = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 32px;
  color: #7d8491;
`;
const Button = styled.button`
  margin-top: 30px;
  background: #c4c4c4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 25px;
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 33px;
  text-align: center;
  color: #000000;
  padding: 0px 15px 0px 15px;
`;
const Footer = styled.div`
  background: #c4c4c4;
  padding: 40px 0px 40px 0px;
`;
const Location = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 20px;
  text-align: center;
  color: #000000;
`;
const Address = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: 300;
  font-size: 25px;
  line-height: 50px;
  text-align: center;
  color: #000000;
  margin-top: 20px;
`;
//----------style-ends-----------

function EditTemplate() {
  const router = useRouter();
  const user = firebase.auth().currentUser;

  const [restname, setRestname] = useState("");
  const [restdescr, setRestdescr] = useState("");
  const [restaddress, setRestaddress] = useState("");
  const [restlogo, setRestlogo] = useState("");
  const [modalname, setModalname] = useState("");
  const [modaltype, setModaltype] = useState("");
  const [modalfunc, setModalfunc] = useState("");
  const [changetype, setChangetype] = useState("");
  const [changefunc, setChangefunc] = useState("");

  console.log(restlogo);
  useEffect(() => {
    async function getRest() {
      var requestOptions = {
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.Aa,
        },
      };
      const response = await fetch(
        "https://babitz-backend.herokuapp.com/myrestaurant",
        requestOptions
      );
      const restauarnt = await response.json();
      console.log(restauarnt);
      if (restauarnt.name) {
        setRestname(restauarnt.name);
      } else {
        setRestname("Babitz");
      }
      if (restauarnt.description) {
        setRestdescr(restauarnt.description);
      } else {
        setRestdescr(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        );
      }
      if (restauarnt.address) {
        setRestaddress(restauarnt.address);
      } else {
        setRestaddress("21st Street, New York The USA");
      }
    }
    getRest();
  }, [user]);

  const changeTemplate = () => {
    router.push("/Template/chooseTemplate");
  };
  const saveAndnext = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata["name"] = restname;
    formdata["description"] = restdescr;
    formdata["address"] = restaddress;
    console.log(JSON.stringify(formdata));
    var requestOptions = {
      method: "PATCH",
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
        router.push("/Dashboard/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Head>
        <title>Babitz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        ></script>
        <script
          async
          src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
        ></script>
      </Head>
      <Home>
        <div className="container">
          <Edit
            changetype={eval(changetype)}
            changefunc={eval(changefunc)}
            modalname={modalname}
            modaltype={modaltype}
            modalfunc={modalfunc}
          />
          <div style={{ marginTop: "20px" }}>
            <Logo>
              LOGO
              <svg
                onClick={() => {
                  setModalname("Restaurant Logo");
                  setModalfunc("set_restlogo");
                  setModaltype("image");
                  setChangetype("restlogo");
                  setChangefunc("setRestlogo");
                }}
                data-toggle="modal"
                data-target="#myModal"
                style={{ marginBottom: "20px", cursor: "pointer" }}
                width="20"
                height="20"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13.5" cy="13.5" r="13.5" fill="white" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.5018 6.1875C13.0267 6.1875 12.6415 6.57267 12.6415 7.04779V12.6398H7.04975C6.57462 12.6398 6.18945 13.0249 6.18945 13.5C6.18945 13.9752 6.57462 14.3603 7.04975 14.3603H12.6415V19.9522C12.6415 20.4273 13.0267 20.8125 13.5018 20.8125C13.9769 20.8125 14.3621 20.4273 14.3621 19.9522V14.3603H19.9542C20.4293 14.3603 20.8145 13.9752 20.8145 13.5C20.8145 13.0249 20.4293 12.6398 19.9542 12.6398H14.3621V7.04779C14.3621 6.57267 13.9769 6.1875 13.5018 6.1875Z"
                  fill="black"
                />
              </svg>
            </Logo>
            <svg
              style={{ float: "right", marginTop: "-70px", cursor: "pointer" }}
              width="35"
              height="35"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="13.5" cy="13.5" r="13.5" fill="white" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5018 6.1875C13.0267 6.1875 12.6415 6.57267 12.6415 7.04779V12.6398H7.04975C6.57462 12.6398 6.18945 13.0249 6.18945 13.5C6.18945 13.9752 6.57462 14.3603 7.04975 14.3603H12.6415V19.9522C12.6415 20.4273 13.0267 20.8125 13.5018 20.8125C13.9769 20.8125 14.3621 20.4273 14.3621 19.9522V14.3603H19.9542C20.4293 14.3603 20.8145 13.9752 20.8145 13.5C20.8145 13.0249 20.4293 12.6398 19.9542 12.6398H14.3621V7.04779C14.3621 6.57267 13.9769 6.1875 13.5018 6.1875Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Restname>
                {restname}
                <svg
                  onClick={() => {
                    setModalname("Restaurant Name");
                    setModalfunc("set_restname");
                    setModaltype("text");
                    setChangetype("restname");
                    setChangefunc("setRestname");
                  }}
                  data-toggle="modal"
                  data-target="#myModal"
                  style={{
                    marginBottom: "60px",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  width="35"
                  height="35"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="13.5" cy="13.5" r="13.5" fill="white" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.5018 6.1875C13.0267 6.1875 12.6415 6.57267 12.6415 7.04779V12.6398H7.04975C6.57462 12.6398 6.18945 13.0249 6.18945 13.5C6.18945 13.9752 6.57462 14.3603 7.04975 14.3603H12.6415V19.9522C12.6415 20.4273 13.0267 20.8125 13.5018 20.8125C13.9769 20.8125 14.3621 20.4273 14.3621 19.9522V14.3603H19.9542C20.4293 14.3603 20.8145 13.9752 20.8145 13.5C20.8145 13.0249 20.4293 12.6398 19.9542 12.6398H14.3621V7.04779C14.3621 6.57267 13.9769 6.1875 13.5018 6.1875Z"
                    fill="black"
                  />
                </svg>
              </Restname>
              <Restdescr>
                <svg
                  onClick={() => {
                    setModalname("Restaurant Description");
                    setModalfunc("set_restdescr");
                    setModaltype("text");
                    setChangetype("restdescr");
                    setChangefunc("setRestdescr");
                  }}
                  data-toggle="modal"
                  data-target="#myModal"
                  style={{
                    cursor: "pointer",
                    marginBottom: "20px",
                    outline: "none",
                  }}
                  width="35"
                  height="35"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="13.5" cy="13.5" r="13.5" fill="white" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.5018 6.1875C13.0267 6.1875 12.6415 6.57267 12.6415 7.04779V12.6398H7.04975C6.57462 12.6398 6.18945 13.0249 6.18945 13.5C6.18945 13.9752 6.57462 14.3603 7.04975 14.3603H12.6415V19.9522C12.6415 20.4273 13.0267 20.8125 13.5018 20.8125C13.9769 20.8125 14.3621 20.4273 14.3621 19.9522V14.3603H19.9542C20.4293 14.3603 20.8145 13.9752 20.8145 13.5C20.8145 13.0249 20.4293 12.6398 19.9542 12.6398H14.3621V7.04779C14.3621 6.57267 13.9769 6.1875 13.5018 6.1875Z"
                    fill="black"
                  />
                </svg>{" "}
                {restdescr}
              </Restdescr>
            </div>
          </div>
        </div>
      </Home>
      <Items>
        <div className="container">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <Box>
                <div className="row">
                  <div className="col-sm-8">
                    <Itemname>Item -1</Itemname>
                    <Itemprice>₹ 250</Itemprice>
                    <Itemdescr>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus quis ante aliquam, viverra arcu nec, feugiat
                      sapien. Proin mollis lorem id purus suscipit, ac tempus
                      enim pulvinar.
                    </Itemdescr>
                  </div>
                  <div className="col-sm-4">
                    <div style={{ float: "right" }}>
                      <Image
                        src="/Image_Item1.png"
                        layout="intrinsic"
                        width="150px"
                        height="150px"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Box>
              <Box>
                <div className="row">
                  <div className="col-sm-8">
                    <Itemname>Item -2</Itemname>
                    <Itemprice>₹ 250</Itemprice>
                    <Itemdescr>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus quis ante aliquam, viverra arcu nec, feugiat
                      sapien. Proin mollis lorem id purus suscipit, ac tempus
                      enim pulvinar.
                    </Itemdescr>
                  </div>
                  <div className="col-sm-4">
                    <div style={{ float: "right" }}>
                      <Image
                        src="/Image_Item2.png"
                        layout="intrinsic"
                        width="150px"
                        height="150px"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Box>
              <Box>
                <Itemdescr>
                  * You can add inventory from the Dashboard when you proceed.
                </Itemdescr>
              </Box>
            </div>
            <div className="col-sm-1"></div>
          </div>
          <Button onClick={changeTemplate}>Change Template</Button>
          <Button
            type="submit"
            onClick={saveAndnext}
            style={{ float: "right", marginLeft: "10px" }}
          >
            Save & Next
          </Button>
          <Button style={{ float: "right" }}>Save & Preview</Button>
        </div>
      </Items>
      <Footer>
        <Location>Location</Location>
        <Address>
          {restaddress}
          <svg
            onClick={() => {
              setModalname("Restaurant Address");
              setModalfunc("set_restaddress");
              setModaltype("text");
              setChangetype("restaddress");
              setChangefunc("setRestaddress");
            }}
            data-toggle="modal"
            data-target="#myModal"
            style={{ cursor: "pointer", marginBottom: "20px", outline: "none" }}
            width="20"
            height="20"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="13.5" cy="13.5" r="13.5" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.5018 6.1875C13.0267 6.1875 12.6415 6.57267 12.6415 7.04779V12.6398H7.04975C6.57462 12.6398 6.18945 13.0249 6.18945 13.5C6.18945 13.9752 6.57462 14.3603 7.04975 14.3603H12.6415V19.9522C12.6415 20.4273 13.0267 20.8125 13.5018 20.8125C13.9769 20.8125 14.3621 20.4273 14.3621 19.9522V14.3603H19.9542C20.4293 14.3603 20.8145 13.9752 20.8145 13.5C20.8145 13.0249 20.4293 12.6398 19.9542 12.6398H14.3621V7.04779C14.3621 6.57267 13.9769 6.1875 13.5018 6.1875Z"
              fill="black"
            />
          </svg>
        </Address>
      </Footer>
    </div>
  );
}

export default withAuth(EditTemplate);

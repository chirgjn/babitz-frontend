import { useRouter } from "next/router";
import withAuth from "../../helpers/withAuth";
import firebase from "firebase/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// -----------style
const Logo = styled.p`
  font-size: 37px;
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  line-height: 67px;
  color: lightgrey;
`;
const Home = styled.div`
  background-image: url("https://babitz-s3.s3.ap-south-1.amazonaws.com/root/2369b04d-8026-435f-8fb1-57b668c65d11/banner");
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
function Usermain() {
  const router = useRouter();
  const url = router.query;
  const lower = url.Restaurant;
  const restname = lower.charAt(0).toUpperCase() + lower.slice(1);
  const [rest, setRest] = useState("");
  const [restitems, setRestitems] = useState([]);
  const [restid, setRestid] = useState("");
  const [selectitems, setselectitems] = useState([
    {
      id: "",
      count: 0,
    },
  ]);
  // const [selectitemscount, setselectitemscount] = useState("");

  useEffect(() => {
    var requestOptions = {
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(
      "https://babitz-backend.herokuapp.com/getRestaurantByName?restautantName=" +
        restname,
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setRest(json);
        setRestid(json.id);
      });
    fetch(
      "https://babitz-backend.herokuapp.com/getItemsByRestaurantName?restautantName" +
        restname,
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const resp = json;
        setRestitems(json);
        let list = [];
        for (var i = 0; i < resp.length; i++) {
          let obj = {};
          obj["id"] = resp[i].id;
          obj["count"] = 0;
          list.push(obj);
        }
        setselectitems(list);
      });
  }, [restname]);
  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {});
  }
  const checkout = () => {
    if (restname != undefined) {
      router.push(`/${restname}/checkout`);
    }
  };
  const decrement_count = (id) => {
    let index = selectitems.findIndex((x) => x.id === id);
    let temporaryarray = selectitems.slice();
    if (temporaryarray[index].count > 0) {
      temporaryarray[index].count -= 1;
      setselectitems(temporaryarray);
    }
  };
  const increment_count = (id) => {
    let index = selectitems.findIndex((x) => x.id === id);
    let temporaryarray = selectitems.slice();
    temporaryarray[index].count += 1;
    setselectitems(temporaryarray);
  };
  return (
    <div>
      <Head>
        <title>{rest.name}</title>
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
          <div style={{ marginTop: "20px" }}>
            <Image
              style={{ display: "inline-block" }}
              layout="intrinsic"
              width="300px"
              height="400px"
              src="https://babitz-s3.s3.ap-south-1.amazonaws.com/root/2369b04d-8026-435f-8fb1-57b668c65d11/logo"
              alt=""
            />
            <Logo style={{ display: "inline-block" }}>LOGO</Logo>
            <div style={{ float: "right", display: "inline-block" }}>
              <span
                onClick={checkout}
                style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
                className="glyphicon glyphicon-shopping-cart"
              ></span>
              <span
                onClick={signOut}
                style={{
                  color: "white",
                  marginLeft: "30px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                className="glyphicon glyphicon-log-out"
              ></span>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Restname>{rest.name || <Skeleton />}</Restname>
              <Restdescr>{rest.description || <Skeleton />}</Restdescr>
            </div>
          </div>
        </div>
      </Home>
      <Items>
        <div className="container" style={{ height: "70vh", overflow: "auto" }}>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              {restitems.map((item) => {
                return (
                  <div key={item.id}>
                    <Box>
                      <div className="row">
                        <div className="col-sm-8">
                          <Itemname>{item.name || <Skeleton />}</Itemname>
                          <Itemprice>₹ {item.price || <Skeleton />}</Itemprice>
                          <Itemdescr>
                            {item.description || <Skeleton />}{" "}
                          </Itemdescr>
                          <span></span>
                          <span>
                            {selectitems.map((data) =>
                              data.id == item.id ? (
                                <div
                                  style={{
                                    padding: "10px",
                                    background: "lightgrey",
                                    width: "100px",
                                    textAlign: "center",
                                    borderRadius: "10px",
                                    fontSize: "15px",
                                    fontFamily: "Oswald",
                                  }}
                                >
                                  <span
                                    onClick={() => decrement_count(item.id)}
                                    style={{
                                      marginRight: "10px",
                                      cursor: "pointer",
                                    }}
                                    className="glyphicon glyphicon-minus"
                                  ></span>
                                  {data.count}
                                  <span
                                    onClick={() => increment_count(item.id)}
                                    style={{
                                      marginLeft: "10px",
                                      cursor: "pointer",
                                    }}
                                    className="glyphicon glyphicon-plus"
                                  ></span>
                                </div>
                              ) : (
                                <div></div>
                              )
                            )}
                          </span>
                          <span></span>
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
                  </div>
                );
              })}
            </div>
            <div className="col-sm-1"></div>
          </div>
        </div>
      </Items>
      <Footer>
        <Location>Location</Location>
        <Address>{rest.address}</Address>
      </Footer>
    </div>
  );
}
export default withAuth(Usermain);

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
function Usermain() {
  const router = useRouter();
  const restname = router.query;

  const [rest, setRest] = useState("");
  const [restitems, setRestitems] = useState([]);
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
        Authorization:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM1MzYyNGFmMTYwMGRhNzlmMzFmMDMxNGYyMDVkNGYzN2FkNmUyNDYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTUNBIEREIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSndDMGc1eldFbEZSX3FiLTN0RnZKaDNRS09lUmNDenRlUGRRN2dQPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2JhYml0eiIsImF1ZCI6ImJhYml0eiIsImF1dGhfdGltZSI6MTYyNzg0NjgyOSwidXNlcl9pZCI6ImljaDkzbGprRzhabnA1TVRER0xpZEJOZ2R0VDIiLCJzdWIiOiJpY2g5M2xqa0c4Wm5wNU1UREdMaWRCTmdkdFQyIiwiaWF0IjoxNjI3ODU0NzA2LCJleHAiOjE2Mjc4NTgzMDYsImVtYWlsIjoibWNhZGQyMDE2MjAyMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMjUzMzk3Mzc2ODIwMzk4MTA0OCJdLCJlbWFpbCI6WyJtY2FkZDIwMTYyMDIxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.cPyWN3IIxOI23iD9wZj--ByOtyhNFOuGY1Uc-adOQfNppmJiV1bxAfJ9q5BcYBs8ALxMhZNRBNaLYa1U8al4gOx4UiR-rRotYMMc1ysNRIffSKG4Kc5Sw68eljgbwpwtntdbOyrL_zzKp4K_9BnO9nc4h2QN_HCChHwE3NR_nuQ9eewN6bDQNpk-8k3DoA0ofBJeKG0bx82eAGQPTwYi-0fgPdsNSVzjHCDltbhcCRd7XP-aF1oesVU2X9gvFdHiOMTzSfkLgmhCqijLXCd8mz7unB4iSb8F1OYbix_9KM0gVWecoHosUKmZa9BZfByWfdYuezy3fE7AYEE1p56ILQ",
      },
    };
    fetch("https://babitz-backend.herokuapp.com/myrestaurant", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setRest(json);
      });
    fetch("https://babitz-backend.herokuapp.com/getItems", requestOptions)
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
  }, []);
  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {});
  }
  const checkout = () => {
    if (restname != undefined) {
      router.push(`/${restname.Restaurant}/checkout`);
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

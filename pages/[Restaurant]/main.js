import { useRouter } from "next/router";
import withAuth from "../../helpers/withAuth";
import firebase from "firebase/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
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
  const user = firebase.auth().currentUser;

  const [rest, setRest] = useState("");
  const [restitems, setRestitems] = useState([]);
  const [restid, setRestid] = useState("");
  const [selectitems, setselectitems] = useState([
    {
      count: 0,
      item: {},
    },
  ]);
  const [cart, setCart] = useState("");
  const [cartamount, setCartamount] = useState(0);

  const myLoader = ({ src }) => {
    return `https://babitz-s3.s3.ap-south-1.amazonaws.com/root/${restid}/${src}`;
  };
  const [selectitemscount, setselectitemscount] = useState(0);

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
        setRest(json);
        setRestid(json.id);
        var requestOptions1 = {
          redirect: "follow",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.Aa,
          },
        };
        fetch(
          "https://babitz-backend.herokuapp.com/getCart/?restaurantId=" +
            json.id,
          requestOptions1
        )
          .then((response) => response.json())
          .then((json) => {
            if (json) {
              setCart(json);
              setCartamount(json.amount);
              setselectitems(json.items);
            }
          });
      });
    fetch(
      "https://babitz-backend.herokuapp.com/getItemsByRestaurantName?restautantName" +
        restname,
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        setRestitems(json);
      });
  }, [restname, user]);
  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {});
  }
  const checkout = () => {
    if (restname != undefined) {
      var formdata = cart;
      formdata.amount = cartamount;
      formdata.items = selectitems;
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
      fetch(
        "https://babitz-backend.herokuapp.com/updateWholeCart",
        requestOptions
      )
        .then((response) => response.json())
        .then((json) => {
          window.location = `/${restname}/checkout`;
        });
    }
  };
  const decrement_count = (item) => {
    let id = item.id;
    let index = selectitems.findIndex((x) => x.item.id === id);
    try {
      if (selectitems[index].qty > 1) {
        let temporaryarray = selectitems.slice();
        temporaryarray[index].qty -= 1;
        setselectitems(temporaryarray);
      } else {
        let temporaryarray = selectitems;
        temporaryarray.splice(index, 1);
      }
      let amount = cartamount;
      amount = amount - item.price;
      setCartamount(amount);
    } catch {}
  };
  const increment_count = (item) => {
    let id = item.id;
    let index = selectitems.findIndex((x) => x.item.id === id);
    try {
      if (selectitems[index].qty) {
        let temporaryarray = selectitems.slice();
        temporaryarray[index].qty += 1;
        setselectitems(temporaryarray);
      }
    } catch {
      let obj = {};
      obj["item"] = item;
      obj["qty"] = 1;
      var arr = selectitems;
      arr.push(obj);
      setselectitems(arr);
    }
    let amount = cartamount;
    amount = amount + item.price;
    setCartamount(amount);
  };
  return (
    <div>
      <Head>
        <title>{rest.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"
        />
        <script
          async
          src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        ></script>
        <script
          async
          src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
        ></script>
      </Head>
      <Home
        style={{
          backgroundImage: `url("https://babitz-s3.s3.ap-south-1.amazonaws.com/root/${restid}/banner")`,
        }}
      >
        <div className="container">
          <div>
            <Image
              style={{ display: "inline-block" }}
              loader={myLoader}
              width={100}
              height={100}
              src="logo"
              alt=""
            />
            <div
              style={{
                float: "right",
                display: "inline-block",
                marginTop: "20px",
              }}
            >
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
                if (item.status == true) {
                  return (
                    <div key={item.id}>
                      <Box>
                        <div className="row">
                          <div className="col-sm-8">
                            <Itemname>{item.name || <Skeleton />}</Itemname>
                            <Itemprice>
                              ₹ {item.price || <Skeleton />}
                            </Itemprice>
                            <Itemdescr>
                              {item.description || <Skeleton />}{" "}
                            </Itemdescr>
                            <span></span>
                            <span>
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
                                  onClick={() => decrement_count(item)}
                                  style={{
                                    marginRight: "10px",
                                    cursor: "pointer",
                                  }}
                                  className="glyphicon glyphicon-minus"
                                ></span>
                                {selectitems.map((data) => {
                                  if (data.item.id == item.id) {
                                    return (
                                      <span key={data.item.id}>{data.qty}</span>
                                    );
                                  }
                                })}
                                <span
                                  onClick={() => increment_count(item)}
                                  style={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                  }}
                                  className="glyphicon glyphicon-plus"
                                ></span>
                              </div>
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
                }
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

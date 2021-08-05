import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import withAuth from "../../helpers/withAuth";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import styled from "styled-components";
import { useRouter } from "next/router";

//----------Style
var Heading = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 45px;
  line-height: 40px;
  color: #000000;
`;
const SubheadingDiv = styled.ul`
  left: 100px;
  margin-top: 50px;
`;
const Subheading = styled.li`
  color: black;
  font-family: Oswald;
  font-style: normal;
  font-weight: lighter;
  font-size: 25px;
  list-style: "❑";
  padding: 17px;
  border-left: 2px solid grey;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const Paymentbutton = styled.button`
  margin: 10px 0px 0px 100px;
  background: #afdfff;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #000000;
  width: 300px;
  @media (max-width: 768px) {
    margin: 10px 0px 30px 50px;
    width: auto;
  }
`;
const Box = styled.div`
  background: #f6f5f7;
  box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  padding: 20px 40px 20px 40px;
  width: 90%;
  float: right;
  max-height: 500px;
  overflow: auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Itemhead = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 40px;
  color: #000000;
`;

const Itemname = styled.p`
  margin-top: 0px;
  font-family: "Sans-serif";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 40px;
  color: #000000;
`;
const Backbutton = styled.button`
  margin: 40px 0px 0px 40px;
  background: #c4c4c4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 25px;
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #000000;
  width: 150px;
  @media (max-width: 768px) {
    margin: 40px 0px 40px 0px;
    width: auto;
  }
`;
function Checkout() {
  const router = useRouter();
  const url = router.query;
  const lower = url.Restaurant;
  const restname = lower.charAt(0).toUpperCase() + lower.slice(1);
  const [cartitems, setCartitems] = useState([]);
  const [restid, setRestid] = useState("");
  const [cartamount, setCartamount] = useState("");
  const [useraddress, setUseraddress] = useState("");
  const [userpincode, setUserpincode] = useState("");
  const [userphone, setUserphone] = useState("");
  const user = firebase.auth().currentUser;

  useEffect(() => {
    var requestOptions2 = {
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: user.Aa,
      },
    };
    fetch(
      "https://babitz-backend.herokuapp.com/getUserProfile",
      requestOptions2
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUseraddress(json.location.firstLine);
        setUserpincode(json.location.pincode);
        setUserphone(json.mobileNumber);
      });
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
            setRestid(json.restaurantId);
            setCartitems(json.items);
            setCartamount(json.amount);
          });
      });
  }, [restname, user]);

  const back = () => {
    if (restname != undefined) {
      window.location = `/${restname}/main`;
    }
  };
  const payment = (e) => {
    e.preventDefault();
    var formdata = {
      location: {
        firstLine: useraddress,
        pincode: userpincode,
      },
      mobileNumber: userphone,
    };
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
      "https://babitz-backend.herokuapp.com/updateUserDetails",
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        var requestOptions1 = {
          redirect: "follow",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.Aa,
          },
        };
        fetch(
          "https://babitz-backend.herokuapp.com/placeOrder/?restaurantId=" +
            restid,
          requestOptions1
        )
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            let options = {
              key: "rzp_test_lkIRdzaooxSzYo", // Enter the Key ID generated from the Dashboard
              amount: cartamount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              currency: "INR",
              name: "Babitz",
              description: "Test Transaction",
              // image: "https://example.com/your_logo",
              order_id: json.paymentId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              handler: function (response) {},
              prefill: {
                name: user.displayName,
                email: user.email,
                contact: userphone,
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            const rzp1 = new window.Razorpay(options);

            rzp1.open();
          });
      });
  };
  console.log(cartamount);
  console.log(cartitems);

  return (
    <div>
      <Head>
        <script
          async
          src="https://checkout.razorpay.com/v1/checkout.js"
        ></script>
      </Head>
      <div className="container">
        <div id="react-root"></div>
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-sm-6">
            <Heading>Checkout</Heading>
            <form>
              <SubheadingDiv>
                <Subheading>
                  {" "}
                  Delivery Information
                  {/* -------------Do Address Validation ------------ */}
                  <textarea
                    defaultValue={useraddress}
                    className="form-control"
                    onChange={(e) => setUseraddress(e.target.value)}
                    style={{
                      boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "25px",
                      padding: "20px",
                      marginTop: "30px",
                    }}
                    placeholder="Enter Delivery Address"
                    rows="4"
                    required
                  />
                  <input
                    defaultValue={userpincode}
                    type="tel"
                    onChange={(e) => setUserpincode(e.target.value)}
                    className="form-control"
                    pattern="^[1-9][0-9]{5}$"
                    style={{
                      boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "25px",
                      padding: "20px",
                      marginTop: "20px",
                    }}
                    placeholder="Pincode"
                    required
                  />
                  <input
                    type="tel"
                    defaultValue={userphone}
                    onChange={(e) => setUserphone(e.target.value)}
                    className="form-control"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    style={{
                      boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "25px",
                      padding: "20px",
                      marginTop: "20px",
                    }}
                    placeholder="Enter Mobile Number"
                    required
                  />
                </Subheading>
                <Subheading> Payment</Subheading>
                <Paymentbutton
                  onClick={payment}
                  type="submit"
                  className="btn btn-primary"
                  style={{ outline: "none" }}
                >
                  Proceed to Payment
                </Paymentbutton>
              </SubheadingDiv>
            </form>
          </div>
          <div className="col-sm-6">
            <Box>
              <center>
                <Heading>Cart</Heading>
              </center>
              <div className="row" style={{ marginTop: "40px" }}>
                <div className="col-xs-5">
                  <Itemhead>Items</Itemhead>
                </div>
                <div className="col-xs-4">
                  <Itemhead>Quantity</Itemhead>
                </div>
                <div className="col-xs-3">
                  <Itemhead>Price</Itemhead>
                </div>
              </div>
              {cartitems.map((data) => {
                return (
                  <div className="row" key={data.item.id}>
                    <div className="col-xs-5">
                      <Itemname>{data.item.name}</Itemname>
                    </div>
                    <div className="col-xs-4">
                      <Itemname>{data.qty}</Itemname>
                    </div>
                    <div className="col-xs-3">
                      <Itemname>₹ {data.item.price}</Itemname>
                    </div>
                  </div>
                );
              })}
              <div className="row" style={{ borderTop: "1px solid lightgrey" }}>
                <div className="col-xs-9">
                  <Itemname>Total</Itemname>
                </div>
                <div className="col-xs-3">
                  <Itemname>₹ {cartamount}</Itemname>
                </div>
              </div>
            </Box>
            <center>
              <Backbutton
                onClick={back}
                type="button"
                className="btn btn-default"
                style={{ outline: "none" }}
              >
                Back to Menu
              </Backbutton>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(Checkout);

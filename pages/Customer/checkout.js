import Head from "next/head";
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
margin:10px 0px 0px 100px;
background: #AFDFFF;
border:none;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 25px;
font-family: Oswald;
font-style: normal;
font-weight: normal;
font-size: 20px;
color: #000000;
width:300px;
@media(max-width:768px){
  margin:10px 0px 30px 50px;
  width:auto;
}
`;
const Box = styled.div`
background: #F6F5F7;
box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.25);
border-radius: 25px;
padding:20px 40px 20px 40px;
width:90%;
float:right;
max-height:500px;
overflow:auto;
@media(max-width:768px){
  width:100%;
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
margin-top:20px;
font-family: "Sans-serif";
font-style: normal;
font-weight: 300;
font-size: 20px;
line-height: 40px;
color: #000000;
`;
const Backbutton = styled.button`
margin:40px 0px 0px 40px;
background: #C4C4C4;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border:none;
border-radius: 25px;
font-family: Oswald;
font-style: normal;
font-weight: normal;
font-size: 20px;
color: #000000;
width:150px;
@media(max-width:768px){
  margin:40px 0px 40px 0px;
  width:auto;
}
`
function Checkout(){
  return(<div>
<div className="container">
<div className="row" style={{marginTop:'40px'}}>
<div className="col-sm-6">
<svg width="70" height="70" viewBox="0 0 90 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M62.088 51.6343L69.032 32.0183H62.44V28.7543H73.8V31.1863L66.568 51.4423H73.832V54.6743H62.088V51.6343Z" fill="black"/>
<path d="M2.952 28.7543H9.352C11.8053 28.7543 13.6827 29.2556 14.984 30.2583C16.2853 31.261 16.936 32.9783 16.936 35.4103C16.936 36.989 16.616 38.2263 15.976 39.1223C15.336 39.997 14.408 40.5303 13.192 40.7223C16.1787 41.2983 17.672 43.4316 17.672 47.1223C17.672 49.6183 17.064 51.5063 15.848 52.7863C14.632 54.045 12.8293 54.6743 10.44 54.6743H2.952V28.7543ZM9.288 39.3463C10.6533 39.3463 11.5813 39.0476 12.072 38.4503C12.584 37.8316 12.84 36.8396 12.84 35.4743C12.84 34.1516 12.5093 33.2556 11.848 32.7863C11.208 32.2956 10.1307 32.0503 8.616 32.0503H7.656V39.3463H9.288ZM9.48 51.3463C10.8667 51.3463 11.8267 51.0156 12.36 50.3543C12.8933 49.693 13.16 48.605 13.16 47.0903C13.16 45.533 12.8613 44.4023 12.264 43.6983C11.688 42.973 10.7067 42.6103 9.32 42.6103H7.656V51.3463H9.48Z" fill="black"/>
<path d="M1.3252 75.3484L74.6737 1.9999" stroke="black" strokeWidth="3"/>
<path d="M74.6738 75.3484L1.32533 1.99991" stroke="black" strokeWidth="3"/>
</svg>
<Heading style={{marginTop:'20px'}}>Checkout</Heading>
<form>
<SubheadingDiv>
<Subheading>
  {" "}
Delivery Information
{/* -------------Do Address Validation ------------ */}
<textarea className="form-control" style={{boxShadow:'inset 0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius:'25px', padding:'20px', marginTop:'30px'}} placeholder="Enter Delivery Address" rows="4" required/>
<input type="tel" className="form-control" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" style={{boxShadow:'inset 0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius:'25px', padding:'20px', marginTop:'20px'}} placeholder="Enter Mobile Number" required/>
</Subheading>
<Subheading>
  {" "}
Payment
</Subheading>
<Paymentbutton type="submit" className="btn btn-primary" style={{outline:'none'}}>Proceed to Payment</Paymentbutton>
</SubheadingDiv>
</form>
</div>
<div className="col-sm-6">
<Box>
<center>
<Heading>Cart</Heading>
</center>
<div className="row" style={{marginTop:'40px'}}>
<div className="col-xs-5">
<Itemhead>Items</Itemhead>
<Itemname>Item 1....</Itemname>
<Itemname>Item 1....</Itemname>
<Itemname>Item 1....</Itemname>
<Itemname>Item 1....</Itemname>

</div>
<div className="col-xs-4">
<Itemhead>Quantity</Itemhead>
<Itemname>Item 1....</Itemname>
<Itemname>Item 1....</Itemname>
<Itemname>Item 1....</Itemname>
<Itemname>Item 1....</Itemname>

</div>
<div className="col-xs-3">
<Itemhead>Price</Itemhead>
<Itemname>100</Itemname>
<Itemname>100</Itemname>
<Itemname>100</Itemname>
<Itemname>100</Itemname>

</div>
</div>
</Box>
<center>
<Backbutton type="button" className="btn btn-default" style={{outline:'none'}}>Back to Menu</Backbutton>
</center>
</div>
</div>
</div>
    </div>);
}
export default withAuth(Checkout);

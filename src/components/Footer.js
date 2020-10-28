import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const FooterCategorySmall = styled.p`
  font-size:14px;
  line-height:28px;
  color:#444;
`;

const Col1 = styled.div`
  width: 8.33%;
`;
const Col2 = styled.div`
  width: 16.66%;
  display:inline-block;
  vertical-align: top;
`;
const Col3 = styled.div`
  width: 25%;
  display:inline-block;
  vertical-align: top;
`;
const Col4 = styled.div`
  width: 33.33%;
`;
const Col5 = styled.div`
  width: 41.66%;
`;
const Col6 = styled.div`
  width: 50%;
`;
const Col7 = styled.div`
  width: 58.33%;
`;
const Col8 = styled.div`
  width: 66.66%;
`;
const Col9 = styled.div`
  width: 75%;
`;
const Col10 = styled.div`
  width: 83.33%;
`;
const Col11 = styled.div`
  width: 91.66%;
`;
const Col12 = styled.div`
  width: 100%;
`;

function Footer({page}) {

  // footer content
  return (
    <div>

      <svg style={{ marginTop:"-7px" }} width="100%" height="auto" viewBox="0 0 3815 394" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Path 6</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M-1.8189894e-12,259 C459.075022,86.3333333 973.340227,-2.27373675e-13 1542.79561,-2.27373675e-13 C2112.251,-2.27373675e-13 2869.65246,131.323801 3815,393.971403 L-1.8189894e-12,393.971403 L-1.8189894e-12,259 Z" id="Path-6" fill="#F4F2EC"></path>
          </g>
      </svg>

      <div style={{ backgroundColor:"#F4F2EC", marginTop:"-7px", padding:"0px 150px 100px 150px" }}>

        <Col3>
          <p style={{ fontSize:"24px", fontWeight:"700", color:"#444", marginBottom:"20px" }}>Get some Headspace</p>
          <FooterCategorySmall>Send a gift</FooterCategorySmall>
          <FooterCategorySmall>Redeem a code</FooterCategorySmall>
          <FooterCategorySmall>All articles</FooterCategorySmall>
          <FooterCategorySmall>Subscribe</FooterCategorySmall>
          <FooterCategorySmall>Headspace for work</FooterCategorySmall>
        </Col3>
        <Col2>
          <p style={{ fontSize:"24px", fontWeight:"700", color:"#444", marginBottom:"20px" }}>About Us</p>
          <FooterCategorySmall>Send a gift</FooterCategorySmall>
          <FooterCategorySmall>Redeem a code</FooterCategorySmall>
          <FooterCategorySmall>All articles</FooterCategorySmall>
          <FooterCategorySmall>Subscribe</FooterCategorySmall>
          <FooterCategorySmall>Headspace for work</FooterCategorySmall>
        </Col2>
        <Col2>
          <p style={{ fontSize:"24px", fontWeight:"700", color:"#444", marginBottom:"20px" }}>Support</p>
          <FooterCategorySmall>Send a gift</FooterCategorySmall>
          <FooterCategorySmall>Redeem a code</FooterCategorySmall>
          <FooterCategorySmall>All articles</FooterCategorySmall>
          <FooterCategorySmall>Subscribe</FooterCategorySmall>
          <FooterCategorySmall>Headspace for work</FooterCategorySmall>
        </Col2>
        <Col2>
          <p style={{ fontSize:"24px", fontWeight:"700", color:"#444", marginBottom:"20px" }}>My Vivablee</p>
          <FooterCategorySmall>Send a gift</FooterCategorySmall>
          <FooterCategorySmall>Redeem a code</FooterCategorySmall>
          <FooterCategorySmall>All articles</FooterCategorySmall>
          <FooterCategorySmall>Subscribe</FooterCategorySmall>
        </Col2>
        <Col3>
          <p style={{ fontSize:"24px", fontWeight:"700", color:"#444", marginBottom:"20px" }}>Get the App</p>
          <img style={{ width:"60%", cursor:"pointer" }} src={require("../images/general/app_store.png")}></img>
          <img style={{ width:"60%", cursor:"pointer" }} src={require("../images/general/google_play.png")}></img>
        </Col3>

      </div>

    </div>
  );

}

export default Footer;

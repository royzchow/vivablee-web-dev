import React, { useState, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivitySearchBox from "../components/ActivitySearchBox";
import Menu from "../components/Menu";
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import img from '../images/chillful/event_1.jpg';
import img_event_1 from '../images/chillful/event_1.jpg';
import pattern_background from '../images/general/pattern_background.jpg';
import demo1 from '../images/mp3/demo1.mp3';
import { storage, db } from "../firebase";
import Slider from 'infinite-react-carousel';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BannerBtn = styled.button`
  padding: 20px 35px;
  color:white;
  border-radius: 50px;
  border-style: none;
  background-color:#FF9700;
  font-weight:700;
  font-size:16px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  cursor:pointer;
  margin-top: 30px;
`;
const BannerBtn2 = styled.button`
  padding: 5px 11px;
  color:white;
  border-radius: 50px;
  border-style: none;
  background-color:#FF585D;
  font-weight:700;
  font-size:16px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  cursor:pointer;
  margin-top: 30px;
`;

const ChillfulActivityListStyle2 = styled.div`
  margin-left:100px;
  margin-right:100px;
  @media only screen and (max-width: 1300px) {
    margin-left:50px;
    margin-right:50px;
  }
  @media only screen and (max-width: 900px) {
    margin-left:20px;
    margin-right:20px;
  }

`;
const ChillfulActivityListStyle2Arrow = styled.img`
  height:16px;
  vertical-align: middle;
  margin-bottom:6px;
  margin-top:4px;
  margin-left:5px;
`;
const ChillfulActivityListStyle2Title = styled.span`
  font-size:18px;
`;
const ChillfulColWidth50 = styled.col`
  width:50%;
  @media only screen and (max-width: 800px) {
    width:50%;
  }
  @media only screen and (max-width: 600px) {
    width:100%;
  }
`;
const ChillfulColWidth25Long2 = styled.col`
  width:25%;
  @media only screen and (max-width: 800px) {
    width:50%;
  }
  @media only screen and (max-width: 600px) {
    width:0%;
  }
`;
const ChillfulColWidth25Long = styled.col`
  width:25%;
  @media only screen and (max-width: 1200px) {
    display:none;
  }
`;
const ChillfulActivityListIcon = styled.img`
  height:12px;
  margin-right:2px;
  display:inline;
`;
const ChillfulActivityListStyle2Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: calc(80% - 36px);
`;
const ChillfulActivityListStyle2ContainerTd = styled.td`
  display:none;
  @media only screen and (max-width: 800px) {
    display:block;
  }
  @media only screen and (max-width: 600px) {
    display:none;
  }
`;
const ChillfulActivityListStyle2ContainerDiv1 = styled.div`
  cursor:pointer;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  @media only screen and (max-width: 800px) {
    margin-right:5px;
  }
`;
const ChillfulActivityListStyle2ContainerDiv2 = styled.div`
  cursor:pointer;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  @media only screen and (max-width: 800px) {
    margin-left:5px;
  }
`;
const ChillfulActivityListStyle2TdLong = styled.td`
  @media only screen and (max-width: 1200px) {
    display:none;
  }
`;
const ChillfulActivityListStyle2TdLong2 = styled.td`
  @media only screen and (max-width: 800px) {
    display:none;
  }
`;
const ChillfulActivityListStyle2ImageCover = styled.div`
  background-size: cover;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(${img_event_1});
`;
const ChillfulActivityListStyle2ClassBottom = styled.div`
  height:118px;
  background-color:white;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  padding:15px 20px 0px 20px;
  color:black;
  @media only screen and (max-width: 800px) {
    height:100px;
  }
`;
const ChillfulActivityListStyle2ClassBottomText1 = styled.div`
  font-size:14px;
  color: #FF585D;
  display:inline;
  margin-left:3px;
  font-weight:700;
`;
const ChillfulActivityListStyle2ClassBottomText2 = styled.div`
  font-size:28px;
  line-height: 32px;
  font-weight:600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media only screen and (max-width: 800px) {
    font-size:20px;
    line-height: 24px;
  }
`;
const ChillfulActivityListStyle2ClassBottomSmallText2 = styled.div`
  font-size:20px;
  line-height: 22px;
  font-weight:600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ChillfulActivityListStyle2ClassBottomText3 = styled.div`
  font-size:18px;
  font-weight:600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media only screen and (max-width: 800px) {
    font-size:14px;
  }
`;
const ChillfulActivityListStyle2ClassBottomText4 = styled.div`
  font-size:16px;
  margin-top:4px;
  font-weight:600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media only screen and (max-width: 800px) {
    font-size:14px;
  }
`;
const ChillfulActivityListStyle2Container2 = styled.div`
  position: relative;
  width: 100%;
  padding-top: calc(80% - 72px);
  @media only screen and (max-width: 1200px) {
    padding-top: calc(80% - 77px);
  }
`;
const ChillfulActivityListStyle2Container3 = styled.div`
  position: relative;
  width: 100%;
  padding-top: calc(40% - 72px);
`;
const ChillfulActivityListStyle2ClassBottom2 = styled.div`
  transition: height 0.5s;
  height:100px;
  background-color:white;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  padding:10px 20px 0px 20px;
  color:black;
  @media only screen and (max-width: 1200px) {
    height:118px;
    padding:15px 20px 0px 20px;
  }
`;
const ChillfulActivityListStyle2Small1 = styled.div`
  margin-left:24px;
  cursor:pointer;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
`;
const ChillfulActivityListStyle2Small2 = styled.div`
  margin-left:24px;
  margin-top: 24px;
  cursor:pointer;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  @media only screen and (max-width: 1200px) {
    display:none;
  }
`;
const ChillfulActivityListStyle2Small3 = styled.div`
  margin-left:24px;
  margin-top: 24px;
  display:none;
  cursor:pointer;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  @media only screen and (max-width: 1200px) {
    display:inline-block;
  }
  @media only screen and (max-width: 800px) {
    display:none;
  }
`;

const PatternBackground = styled.div`
  background-image: url(${pattern_background});
  background-size: cover;
  width:100%;
  height:500px;
  margin-top:-15px;
  border-radius: 10px;
`;

function HomePage() {

  return (
    <div style={{width: "100%"}}>

      <Menu />

      <div style={{ backgroundColor:"#F4F2EC", marginBottom:"-1px", padding:"150px 150px 80px 150px" }}>
        <div style={{ width:"70%" }}>
          <h1 style={{ fontSize:"90px", lineHeight:"90px", color:"#444" }}>Be kind to your mind</h1>
          <p style={{ marginTop:"20px", fontSize:"24px", width:"70%" }}>Less stressed. More resilient. Happier. It all starts with just a few minutes a day.</p>
          <BannerBtn>Start your journey</BannerBtn>
          <br/>
          <BannerBtn2>
            <img style={{ width:"10px", marginLeft:"1px" }} src={require("../images/general/play_white.png")}></img>
          </BannerBtn2>
          <span style={{ marginLeft:"12px", fontSize:"14px" }}>See how it works</span>
        </div>
      </div>

      <svg width="100%" height="auto" viewBox="0 0 3552 261" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Grey Overlay</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Stage-Card" transform="translate(1365.500000, 1.000000) scale(-1, 1) translate(-1365.500000, -1.000000) translate(-821.000000, -259.000000)" fill="#F4F2EC">
                  <path d="M0,259.839582 L0,389.919791 C327.839308,303.199652 646.204645,259.839582 955.096011,259.839582 C1427.71748,259.839582 2114.31899,520 2587.43566,520 C2905.41919,520 3226.94064,476.63993 3552,389.919791 L3552,259.839582 L0,259.839582 Z" id="Grey-Overlay"></path>
              </g>
          </g>
      </svg>

      <ChillfulActivityListStyle2>

        <div style={{ float:"right", marginTop:"10px", marginBottom:"35px" }}>
          <h1 style={{ fontSize:"60px", color:"#444" }}>Latest articles</h1>
        </div>

        <div>
          <table style={{width:"100%"}} cellSpacing="0" cellPadding="0">
          <colgroup>
            <ChillfulColWidth50/>
            <ChillfulColWidth25Long2/>
            <ChillfulColWidth25Long/>
          </colgroup>
            <tbody>
              <tr>
                <td rowSpan="2">
                  <ChillfulActivityListStyle2ContainerDiv1>

                    <ChillfulActivityListStyle2Container>
                      <ChillfulActivityListStyle2ImageCover></ChillfulActivityListStyle2ImageCover>
                    </ChillfulActivityListStyle2Container>
                    <ChillfulActivityListStyle2ClassBottom>
                      <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                      <ChillfulActivityListStyle2ClassBottomText1>GO OUT & DISCOVER</ChillfulActivityListStyle2ClassBottomText1>
                      <ChillfulActivityListStyle2ClassBottomText2>1 Local Tour to Pokfulam Village </ChillfulActivityListStyle2ClassBottomText2>
                      <ChillfulActivityListStyle2ClassBottomText3>Explore the history of Dairy Milk Farm and Bethanie...</ChillfulActivityListStyle2ClassBottomText3>
                      <ChillfulActivityListStyle2ClassBottomText4>Guided tour ● 2 hours</ChillfulActivityListStyle2ClassBottomText4>
                    </ChillfulActivityListStyle2ClassBottom>
                  </ChillfulActivityListStyle2ContainerDiv1>
                </td>

                <ChillfulActivityListStyle2ContainerTd>
                  <ChillfulActivityListStyle2ContainerDiv2>

                    <ChillfulActivityListStyle2Container>
                      <ChillfulActivityListStyle2ImageCover></ChillfulActivityListStyle2ImageCover>
                    </ChillfulActivityListStyle2Container>
                    <ChillfulActivityListStyle2ClassBottom>
                      <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                      <ChillfulActivityListStyle2ClassBottomText1>GO OUT & DISCOVER</ChillfulActivityListStyle2ClassBottomText1>
                      <ChillfulActivityListStyle2ClassBottomText2>11 Local Tour to Pokfulam Village </ChillfulActivityListStyle2ClassBottomText2>
                      <ChillfulActivityListStyle2ClassBottomText3>Explore the history of Dairy Milk Farm and Bethanie...</ChillfulActivityListStyle2ClassBottomText3>
                      <ChillfulActivityListStyle2ClassBottomText4>Guided tour ● 2 hours</ChillfulActivityListStyle2ClassBottomText4>
                    </ChillfulActivityListStyle2ClassBottom>

                  </ChillfulActivityListStyle2ContainerDiv2>
                </ChillfulActivityListStyle2ContainerTd>

                <ChillfulActivityListStyle2TdLong2>
                  <ChillfulActivityListStyle2Small1>
                    <ChillfulActivityListStyle2Container2>
                      <ChillfulActivityListStyle2ImageCover></ChillfulActivityListStyle2ImageCover>
                    </ChillfulActivityListStyle2Container2>
                    <ChillfulActivityListStyle2ClassBottom2>
                      <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                      <ChillfulActivityListStyle2ClassBottomText1>ARTS & CRAFTS</ChillfulActivityListStyle2ClassBottomText1>
                      <ChillfulActivityListStyle2ClassBottomSmallText2>2 Floral Arrangement Workshop by Hereafter</ChillfulActivityListStyle2ClassBottomSmallText2>
                      <ChillfulActivityListStyle2ClassBottomText4>Crafting workshop ● 2 hours</ChillfulActivityListStyle2ClassBottomText4>
                    </ChillfulActivityListStyle2ClassBottom2>
                  </ChillfulActivityListStyle2Small1>
                </ChillfulActivityListStyle2TdLong2>

                <ChillfulActivityListStyle2TdLong>
                  <ChillfulActivityListStyle2Small1>
                    <ChillfulActivityListStyle2Container2>
                      <ChillfulActivityListStyle2ImageCover></ChillfulActivityListStyle2ImageCover>
                    </ChillfulActivityListStyle2Container2>
                    <ChillfulActivityListStyle2ClassBottom2>
                      <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                      <ChillfulActivityListStyle2ClassBottomText1>ARTS & CRAFTS</ChillfulActivityListStyle2ClassBottomText1>
                      <ChillfulActivityListStyle2ClassBottomSmallText2>3 Floral Arrangement Workshop by Hereafter</ChillfulActivityListStyle2ClassBottomSmallText2>
                      <ChillfulActivityListStyle2ClassBottomText4>Crafting workshop ● 2 hours</ChillfulActivityListStyle2ClassBottomText4>
                    </ChillfulActivityListStyle2ClassBottom2>
                  </ChillfulActivityListStyle2Small1>
                </ChillfulActivityListStyle2TdLong>

              </tr>
              <tr>

                <td colSpan="2">
                  <ChillfulActivityListStyle2Small2>
                    <ChillfulActivityListStyle2Container3>
                      <ChillfulActivityListStyle2ImageCover></ChillfulActivityListStyle2ImageCover>
                    </ChillfulActivityListStyle2Container3>
                    <ChillfulActivityListStyle2ClassBottom>
                      <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                      <ChillfulActivityListStyle2ClassBottomText1>ARTS & CRAFTS</ChillfulActivityListStyle2ClassBottomText1>
                      <ChillfulActivityListStyle2ClassBottomText2>4 Floral Arrangement Workshop by Hereafter</ChillfulActivityListStyle2ClassBottomText2>
                      <ChillfulActivityListStyle2ClassBottomText3>Explore the history of Dairy Milk Farm and Bethanie...</ChillfulActivityListStyle2ClassBottomText3>
                      <ChillfulActivityListStyle2ClassBottomText4>Crafting workshop ● 2 hours</ChillfulActivityListStyle2ClassBottomText4>
                    </ChillfulActivityListStyle2ClassBottom>
                  </ChillfulActivityListStyle2Small2>

                  <ChillfulActivityListStyle2Small3>
                    <ChillfulActivityListStyle2Container2>
                      <ChillfulActivityListStyle2ImageCover></ChillfulActivityListStyle2ImageCover>
                    </ChillfulActivityListStyle2Container2>
                    <ChillfulActivityListStyle2ClassBottom2>
                      <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                      <ChillfulActivityListStyle2ClassBottomText1>ARTS & CRAFTS</ChillfulActivityListStyle2ClassBottomText1>
                      <ChillfulActivityListStyle2ClassBottomSmallText2>5 Floral Arrangement Workshop by Hereafter</ChillfulActivityListStyle2ClassBottomSmallText2>
                      <ChillfulActivityListStyle2ClassBottomText4>Crafting workshop ● 2 hours</ChillfulActivityListStyle2ClassBottomText4>
                    </ChillfulActivityListStyle2ClassBottom2>
                  </ChillfulActivityListStyle2Small3>

                </td>

              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop:"80px", position: "relative" }}>
          <div style={{ left: "50%", marginRight: "-50%", position: "absolute", transform: "translate(-50%, -50%)" }}>
            <BannerBtn>View all articles</BannerBtn>
          </div>
        </div>

      </ChillfulActivityListStyle2>


      <div style={{ marginLeft:"150px", marginRight:"150px", marginTop:"220px" }}>

        <h1 style={{ fontSize:"60px", fontWeight:"700", color:"#444", textAlign:"center", marginBottom:"25px" }}>Get some Headspace</h1>

        <div style={{ display:"table", margin: "0px auto" }}>

          <div style={{ borderRadius: "10px", backgroundColor:"#FA6400", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Wake up</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Travel</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Focus</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Destress</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Live Well</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"100px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Sleep</span>
          </div>

        </div>

        <PatternBackground>

          <div style={{ width:"35%", marginLeft:"auto", marginRight:"auto", textAlign:"center" }}>
            <div style={{ height:"100px" }}></div>
            <p style={{ fontSize:"18px" }}>Learn to manage feelings and thoughts with the lifelong skill of everyday mindfulness, any time of the day.</p>
          </div>

          <audio controls style={{ display:"table", margin: "0px auto", marginTop:"30px", width:"500px" }}>
            <source src={demo1} type="audio/ogg" />
            <source src={demo1} type="audio/mpeg" />
          </audio>

        </PatternBackground>


      </div>

      <div style={{ backgroundColor:"#413d45", margin:"120px 50px", borderRadius:"15px", padding:"100px", color:"white" }}>

        <table style={{ width:"100%" }}>
          <colgroup>
            <col style={{ width:"50%" }} />
            <col style={{ width:"50%" }} />
          </colgroup>
          <tbody>
            <tr>
              <td>

                <div style={{ marginRight:"100px" }}>
                  <h1 style={{ fontSize:"40px", marginBottom:"20px" }}>Meditate now</h1>
                  <p style={{ fontSize:"18px"}}>Get mindful with a free meditation. Try today’s meditation on stress right now.</p>
                </div>

              </td>
              <td style={{ width:"100%" }}>

                <div style={{ width:"100%", backgroundColor:"#f4f2ec", borderRadius:"15px", color:"#444" }}>
                  <div style={{ padding:"30px 30px 0px 30px" }}>
                    <div style={{ width:"70%" }}>
                      <p style={{ fontSize: "14px", marginBottom:"20px" }}>Tuesday, September 15th</p>
                      <h1 style={{ fontSize:"38px", lineHeight:"40px" }}>20-minute stress meditation</h1>
                    </div>
                  </div>
                  <audio controls style={{ display:"table", margin: "0px auto", paddingTop:"15px", paddingBottom:"30px", width:"500px" }}>
                    <source src={demo1} type="audio/ogg" />
                    <source src={demo1} type="audio/mpeg" />
                  </audio>
                </div>

              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <svg width="100%" height="auto" viewBox="0 0 3840 260" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Path</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M-9.09494702e-13,0.5 L-9.09494702e-13,259.5 C543.289571,86.8333333 1184.99624,0.5 1925.12,0.5 C2499.39149,0.5 3137.68482,86.8333333 3840,259.5 L3840,0.5 L-9.09494702e-13,0.5 Z" id="Path" fill="#413D45" transform="translate(1920.000000, 130.000000) scale(1, -1) translate(-1920.000000, -130.000000) "></path>
          </g>
      </svg>
      <div style={{ backgroundColor:"#413d45", marginTop:"-7px", textAlign:"center", color:"white", paddingBottom:"80px" }}>

        <div style={{ height:"150px" }}></div>

        <div style={{ marginLeft:"100px", marginRight:"100px" }}>
          <h1 style={{ fontSize:"60px" }}>Join millions getting more mindful with Vivablee App</h1>
          <div style={{ marginTop:"100px" }}>
            <img style={{ width:"250px", marginLeft:"40px", marginRight:"40px", borderRadius:"27px" }} src={require("../images/main/app1.jpg")}></img>
            <img style={{ width:"250px", marginLeft:"40px", marginRight:"40px", borderRadius:"27px"  }} src={require("../images/main/app2.jpg")}></img>
            <img style={{ width:"250px", marginLeft:"40px", marginRight:"40px", borderRadius:"27px"  }} src={require("../images/main/app3.jpg")}></img>
          </div>
          <h1 style={{ fontSize:"40px", marginTop:"100px" }}>Try Headspace Plus for free</h1>

          <p style={{ fontSize:"12px", width:"70%", margin:"10px auto" }}>After your free trial, the annual subscription is $69.99 and automatically renews each year. If you subscribe before your free trial ends, the rest of your free trial period will be forfeited as soon as your purchase is confirmed.</p>

          <div style={{ marginTop:"80px", position: "relative" }}>
            <div style={{ left: "50%", marginRight: "-50%", position: "absolute", transform: "translate(-50%, -50%)" }}>
              <BannerBtn>Try it for free</BannerBtn>
            </div>
          </div>

        </div>

      </div>

      <svg width="100%" height="auto" viewBox="0 0 3840 259" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Path</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M0,0 C539.876237,172.666667 1179.87624,259 1920,259 C2494.27149,259 3134.27149,172.666667 3840,0 L0,0 Z" id="Path" fill="#413D45"></path>
          </g>
      </svg>

      <svg style={{ marginTop:"-7px" }} width="100%" height="auto" viewBox="0 0 3815 394" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Path 6</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M-1.8189894e-12,259 C459.075022,86.3333333 973.340227,-2.27373675e-13 1542.79561,-2.27373675e-13 C2112.251,-2.27373675e-13 2869.65246,131.323801 3815,393.971403 L-1.8189894e-12,393.971403 L-1.8189894e-12,259 Z" id="Path-6" fill="#F4F2EC"></path>
          </g>
      </svg>

      <div style={{ backgroundColor:"#F4F2EC", marginTop:"-7px", padding:"0px 150px 200px 150px" }}>

        <p style={{ fontSize:"24px", fontWeight:"700", color:"#444" }}>Get some Headspace</p>

      </div>

    </div>
  );
}

export default HomePage;

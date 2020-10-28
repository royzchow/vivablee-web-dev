import React, { useState, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivitySearchBox from "../components/ActivitySearchBox";
import Menu from "../components/Menu";
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import img from '../images/chillful/event_1.jpg';
import img_event_1 from '../images/chillful/event_1.jpg';
import banner_video from '../images/articles/banner_video.jpg';
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
  padding: 30px 33px;
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

const BannerVideo = styled.div`
  background-image: url(${banner_video});
  background-size: cover;
  background-position: center;
  width:100%;
  height:550px;
  margin-top:-15px;
  border-radius: 10px;
`;

function Articles() {

  return (
    <div style={{width: "100%"}}>

      <Menu />

      <div style={{ padding:"150px 150px" }}>

        <table>
          <colgroup>
            <col style={{ width:"50%" }} />
            <col style={{ width:"50%" }} />
          </colgroup>
          <tbody>

            <tr>

              <td>
                <div style={{ marginRight:"100px" }}>

                  <h1 style={{ fontSize:"60px", color:"#444" }}>All articles</h1>
                  <p style={{ marginTop:"20px", fontSize:"18px", color:"#777" }}>Hundreds of articles for any mind, any mood, any goal. Browse all of our articles on meditation, mindfulness, sleep, and more.</p>

                  <audio controls style={{ display:"table", margin: "0px auto", paddingTop:"15px", paddingBottom:"30px", width:"100%" }}>
                    <source src={demo1} type="audio/ogg" />
                    <source src={demo1} type="audio/mpeg" />
                  </audio>

                  <BannerBtn>Try Vivablee for free</BannerBtn>

                </div>
              </td>

              <td>

                <BannerVideo></BannerVideo>
                <div style={{ position:"absolute", backgroundColor:"red", width:"calc( 50% - 150px )", height:"550px", borderRadius:"10px", marginTop:"-550px", backgroundColor: "rgba(0, 0, 0, 0.4)" }}>

                  <img style={{ height:"40px", marginTop:"30px", marginLeft:"30px", opacity:"0.8" }} src={require("../images/general/logo_original.png")}></img>
                  <div style={{ left: "50%", marginRight: "-50%", marginTop:"190px", position: "absolute", transform: "translate(-50%, -50%)" }}>
                    <BannerBtn2>
                      <img style={{ width:"24px", marginLeft:"5px", marginTop:"5px" }} src={require("../images/general/play_white.png")}></img>
                    </BannerBtn2>
                  </div>

                  <div style={{ bottom:"0", position: "absolute", color:"white", marginBottom:"30px", marginLeft:"30px", fontSize:"40px", fontWeight:"700" }}>The Power of <br />Mindfulness</div>

                </div>

              </td>

            </tr>

          </tbody>
        </table>

      </div>

      <div>

        <img src={require("../images/main/app1.jpg"}></img>

      </div>

    </div>
  );
}

export default Articles;

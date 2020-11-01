import React, { useState, useEffect } from "react";
import AmbientMusicCard from "../components/AmbientMusicCard";
import MeditationCard from "../components/MeditationCard";
import MeditationSearchBox from "../components/MeditationSearchBox";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import img from '../images/mindful/sleep.png';
import img_event_1 from '../images/chillful/event_1.jpg';
import pattern_background from '../images/general/pattern_background.jpg';
import demo1 from '../images/mp3/demo1.mp3';
import { storage, db } from "../firebase";
import Slider from 'infinite-react-carousel';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


// define css class
const ChillfulMargin10 = styled.div`
  height:10px;
`;
const ChillfulMargin40 = styled.div`
  height:40px;
`;
const ChillfulBanner = styled.div`
  margin-top:30px;
  margin-left:100px;
  margin-right:100px;
  height:550px;
  background-size: cover;
  background-image: url(${img});
  border-radius:30px;
`;
const ChillfulMargin160 = styled.div`
  height:160px;
`;
const ChillfulMargin120 = styled.div`
  height:120px;
`;
const ChillfulBannerText = styled.div`
  margin-left:180px;
  margin-right:180px;
  color:white;
  transition: all 0.5s;
  @media only screen and (max-width: 1100px) {
    margin-left:100px;
    margin-right:100px;
  }
  @media only screen and (max-width: 800px) {
    margin-left:30px;
    margin-right:30px;
  }
`;
const ChillfulBannerText1 = styled.span`
  margin-left: 10px;
  color: #FF9700;
  font-weight: 800;
  font-size: 24px;
  transition: all 0.5s;
  @media only screen and (max-width: 800px) {
    font-size: 18px;
  }
`;
const ChillfulBannerText2 = styled.p`
  font-weight: 600;
  font-size: 42px;
  margin-top:10px;
  transition: all 0.5s;
  max-width:700px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media only screen and (max-width: 800px) {
    font-size: 36px;
  }
`;
const ChillfulBannerText3 = styled.p`
  font-weight: 500;
  font-size: 24px;
  margin-top:5px;
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: all 0.5s;
  @media only screen and (max-width: 800px) {
    font-size: 20px;
  }
`;
const ChillfulBannerText4 = styled.p`
  font-weight: 500;
  font-size: 24px;
  margin-top:5px;
  transition: all 0.5s;
  @media only screen and (max-width: 800px) {
    font-size: 20px;
  }
`;
const ChillfulBannerBtn = styled.div`
  margin-top:15px;
  background-color:#FF9700;
  padding:10px 20px;
  width:100px;
  border-radius:50px;
  cursor:pointer;
  @media only screen and (max-width: 800px) {
    padding:9px 18px;
    width:92px;
  }
`;
const ChillfulBannerBtnIcon = styled.img`
  width:17px;
  vertical-align:middle;
  margin-bottom:6px;
  margin-right:4px;
  @media only screen and (max-width: 800px) {
    font-size: 16px;
  }
`;
const ChillfulBannerBtnText = styled.span`
  margin-left:5px;
  font-size:18px;
  @media only screen and (max-width: 800px) {
    font-size: 16px;
  }
`;
const ChillfulBannerIcon = styled.img`
  height:24px;
  transition: all 0.5s;
  @media only screen and (max-width: 800px) {
    height:18px;
  }
`;
const ChillfulBody = styled.div`
  width:100%;
`;
const ChillfulBodySubHeading = styled.div`
  text-align:center;
`;
const ChillfulBodySubHeadingText1 = styled.p`
  font-size:20px;
  color:#444;
  font-weight:900;
`;
const ChillfulBodySubHeadingText2 = styled.p`
  font-size:50px;
  margin-bottom:5px;
  display:inline;
  color:#FF9700;
  font-weight:600;
`;
const ChillfulBodySubHeadingText3 = styled.p`
  font-size:24px;
  line-height: 26px;
  color:#444;
  transition: all 0.5s;
  @media only screen and (max-width: 500px) {
    font-size:18px;
    line-height: 20px;
  }
`;
const ChillfulBodySubHeadingImage = styled.img`
  height:38px;
  margin-right:15px;
  display:inline;
`;
const ChillfulBodySubHeadingSpan1 = styled.span`
  font-weight:800;
`;
const ChillfulBodySubHeadingSpan2 = styled.span`
  color:#FF9700;
  font-weight:800;
`;
const ChillfulMargin50 = styled.div`
  height:50px;
`;
const ChillfulActivityListStyle2 = styled.div`
  margin-left:150px;
  margin-right:150px;
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
  margin-bottom: -1px;
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
  color: #FF9700;
  display:inline;
  margin-left:3px;
  font-weight:700;
  text-transform: uppercase;
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
  text-transform: capitalize;
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
const ChillfulActivityListStyle1 = styled.div`
  overflow-x: scroll;
  height:550px;
  padding-top:70px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ChillfulActivityListStyle1Title = styled.span`
  font-size:18px;
`;
const ChillfulActivityListStyle1TitleDiv = styled.div`
  position:absolute;
  left:100px;
  @media only screen and (max-width: 1300px) {
    left:50px;
  }
  @media only screen and (max-width: 900px) {
    left:20px;
  }
`;
const ChillfulActivityListStyle1Margin = styled.div`
  width:100px;
  @media only screen and (max-width: 1300px) {
    width:50px;
  }
  @media only screen and (max-width: 900px) {
    width:20px;
  }
`;
const ChillfulActivityListStyle1Margin2 = styled.div`
  width:15px;
`;
const ChillfulActivityListStyle1Td = styled.td`
  min-width:350px;
  max-width:350px;
`;
const ChillfulActivityListStyle1Table = styled.table`
  width:100%
`;

function Meditation() {


  const [chillfulBannerTitle, setChillfulBannerTitle] = useState("");
  const [chillfulBannerDescription, setChillfulBannerDescription] = useState("");

  const [chillfulActivityTitle, setChillfulActivityTitle] = useState("");
  const [chillfulActivityDescription, setChillfulActivityDescription] = useState("");
  const [chillfulActivityCategory, setChillfulActivityCategory] = useState("");
  const [chillfulActivitySubCategory, setChillfulActivitySubCategory] = useState("");

  const [guidedMeditationTitle1, setGuidedMeditationTitle1] = useState("");
  const [guidedMeditationDescription1, setGuidedMeditationDescription1] = useState("");
  const [guidedMeditationCategory1, setGuidedMeditationCategory1] = useState("");
  const [guidedMeditationSubCategory1, setGuidedMeditationSubCategory1] = useState("");
  const [guidedMeditationImagesLarge1, setGuidedMeditationImagesLarge1] = useState("");
  const [guidedMeditationImagesSmall1, setGuidedMeditationImagesSmall1] = useState("");

  const [guidedMeditationTitle2, setGuidedMeditationTitle2] = useState("");
  const [guidedMeditationDescription2, setGuidedMeditationDescription2] = useState("");
  const [guidedMeditationCategory2, setGuidedMeditationCategory2] = useState("");
  const [guidedMeditationSubCategory2, setGuidedMeditationSubCategory2] = useState("");
  const [guidedMeditationImagesLarge2, setGuidedMeditationImagesLarge2] = useState("");
  const [guidedMeditationImagesSmall2, setGuidedMeditationImagesSmall2] = useState("");

  const [guidedMeditationTitle3, setGuidedMeditationTitle3] = useState("");
  const [guidedMeditationDescription3, setGuidedMeditationDescription3] = useState("");
  const [guidedMeditationCategory3, setGuidedMeditationCategory3] = useState("");
  const [guidedMeditationSubCategory3, setGuidedMeditationSubCategory3] = useState("");
  const [guidedMeditationImagesLarge3, setGuidedMeditationImagesLarge3] = useState("");
  const [guidedMeditationImagesSmall3, setGuidedMeditationImagesSmall3] = useState("");

  const [guidedMeditationTitle4, setGuidedMeditationTitle4] = useState("");
  const [guidedMeditationDescription4, setGuidedMeditationDescription4] = useState("");
  const [guidedMeditationCategory4, setGuidedMeditationCategory4] = useState("");
  const [guidedMeditationSubCategory4, setGuidedMeditationSubCategory4] = useState("");
  const [guidedMeditationImagesLarge4, setGuidedMeditationImagesLarge4] = useState("");
  const [guidedMeditationImagesSmall4, setGuidedMeditationImagesSmall4] = useState("");

  var chillfulActivityCategoryId = "";

  useEffect(() => {

    // to get the information for banner
    db.collection("chillfulActivities").doc('12DxUVuZ8qwC3xLvbv16')
      .get()
      .then( doc => {
        const title = []
        const description = []
        const data = doc.data()
        setChillfulBannerTitle(data['title']);
        setChillfulBannerDescription(data['description']);
      })

    // to get the information for activity
    db.collection("chillfulActivities").doc('12DxUVuZ8qwC3xLvbv16')
      .get()
      .then( doc => {
        const data = doc.data()
        setChillfulActivityTitle(data['title']);
        setChillfulActivityDescription(data['description']);
        setChillfulActivityCategory(data['category']);
        setChillfulActivitySubCategory(data['subCategory']);
    })

    db.collection("mindfulGuidedMeditation").doc('wDyKEgsenIR9MoXUTCXe')
      .get()
      .then( doc => {
        const data = doc.data()
        setGuidedMeditationTitle1(data['title']);
        setGuidedMeditationDescription1(data['description']);
        setGuidedMeditationCategory1(data['category']);
        setGuidedMeditationSubCategory1(data['subCategory']);
        setGuidedMeditationImagesLarge1(data['imagesLarge']);
        setGuidedMeditationImagesSmall1(data['imagesSmall']);
    })

    db.collection("mindfulGuidedMeditation").doc('q8SfxV4oyuVCf0aUnz3i')
      .get()
      .then( doc => {
        const data = doc.data()
        setGuidedMeditationTitle2(data['title']);
        setGuidedMeditationDescription2(data['description']);
        setGuidedMeditationCategory2(data['category']);
        setGuidedMeditationSubCategory2(data['subCategory']);
        setGuidedMeditationImagesLarge2(data['imagesLarge']);
        setGuidedMeditationImagesSmall2(data['imagesSmall']);
    })

    db.collection("mindfulGuidedMeditation").doc('nKUfOSSkQeTFHk8uXVTa')
      .get()
      .then( doc => {
        const data = doc.data()
        setGuidedMeditationTitle3(data['title']);
        setGuidedMeditationDescription3(data['description']);
        setGuidedMeditationCategory3(data['category']);
        setGuidedMeditationSubCategory3(data['subCategory']);
        setGuidedMeditationImagesLarge3(data['imagesLarge']);
        setGuidedMeditationImagesSmall3(data['imagesSmall']);
    })

    db.collection("mindfulGuidedMeditation").doc('ezFCn8PgiHBClil3rFqz')
      .get()
      .then( doc => {
        const data = doc.data()
        setGuidedMeditationTitle4(data['title']);
        setGuidedMeditationDescription4(data['description']);
        setGuidedMeditationCategory4(data['category']);
        setGuidedMeditationSubCategory4(data['subCategory']);
        setGuidedMeditationImagesLarge4(data['imagesLarge']);
        setGuidedMeditationImagesSmall4(data['imagesSmall']);
    })

  }, []);

  return (
    <div style={{width: "100%"}}>

      <Menu page={"meditation"} />

      {/* Be Chillful top banner */}
      <ChillfulBanner>

        <ChillfulMargin120/>

        <ChillfulBannerText>
          <ChillfulBannerIcon style={{ marginBottom:"-3px" }} src={require("../images/general/mindful_icon_original.png")}></ChillfulBannerIcon>
          <ChillfulBannerText1>SLEEP</ChillfulBannerText1>
          <ChillfulBannerText2>Sleeping Meditation</ChillfulBannerText2>
          <ChillfulBannerText3>A guided meditation to let you sleep in a relax mode...</ChillfulBannerText3>
          <ChillfulBannerText4>Guided meditation ● 5 minutes</ChillfulBannerText4>
          <audio controls style={{ marginTop:"30px", width:"500px" }}>
            <source src={"https://firebasestorage.googleapis.com/v0/b/vivablee-dev.appspot.com/o/mindfulAudios%2FguidedMeditations%2FHekxGx54Im57AAObluOj%2Fsleep-meditation.mp3?alt=media&token=8f115cf8-e0a0-44c6-952a-6b7ae343b550"} type="audio/ogg" />
            <source src={"https://firebasestorage.googleapis.com/v0/b/vivablee-dev.appspot.com/o/mindfulAudios%2FguidedMeditations%2FHekxGx54Im57AAObluOj%2Fsleep-meditation.mp3?alt=media&token=8f115cf8-e0a0-44c6-952a-6b7ae343b550"} type="audio/mpeg" />
          </audio>
        </ChillfulBannerText>

      </ChillfulBanner>

      <MeditationSearchBox />

      <div style={{ marginLeft:"150px", marginRight:"150px", marginTop:"180px", marginBottom:"70px" }}>

        <h1 style={{ fontSize:"60px", fontWeight:"700", color:"#444", textAlign:"center", marginBottom:"25px" }}>Get some Guided Meditation</h1>

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

      </div>

      <ChillfulBody>

        <ChillfulActivityListStyle2>
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
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + guidedMeditationImagesLarge1 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container>
                      <ChillfulActivityListStyle2ClassBottom>
                        <ChillfulActivityListIcon src={require("../images/general/mindful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ guidedMeditationCategory1 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomText2>{ guidedMeditationTitle1 }</ChillfulActivityListStyle2ClassBottomText2>
                        <ChillfulActivityListStyle2ClassBottomText3>{ guidedMeditationDescription1 }</ChillfulActivityListStyle2ClassBottomText3>
                        <ChillfulActivityListStyle2ClassBottomText4>{ guidedMeditationSubCategory1 } ● 5 minutes</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom>
                    </ChillfulActivityListStyle2ContainerDiv1>
                  </td>

                  <ChillfulActivityListStyle2ContainerTd>
                    <ChillfulActivityListStyle2ContainerDiv2>

                      <ChillfulActivityListStyle2Container>
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + guidedMeditationImagesLarge2 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container>
                      <ChillfulActivityListStyle2ClassBottom>
                        <ChillfulActivityListIcon src={require("../images/general/mindful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ guidedMeditationCategory2 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomText2>{ guidedMeditationTitle2 }</ChillfulActivityListStyle2ClassBottomText2>
                        <ChillfulActivityListStyle2ClassBottomText3>{ guidedMeditationDescription2 }</ChillfulActivityListStyle2ClassBottomText3>
                        <ChillfulActivityListStyle2ClassBottomText4>{ guidedMeditationSubCategory2 } ● 5 minutes</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom>

                    </ChillfulActivityListStyle2ContainerDiv2>
                  </ChillfulActivityListStyle2ContainerTd>

                  <ChillfulActivityListStyle2TdLong2>
                    <ChillfulActivityListStyle2Small1>
                      <ChillfulActivityListStyle2Container2>
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + guidedMeditationImagesLarge2 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container2>
                      <ChillfulActivityListStyle2ClassBottom2>
                        <ChillfulActivityListIcon src={require("../images/general/mindful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ guidedMeditationCategory2 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomSmallText2>{ guidedMeditationTitle2 }</ChillfulActivityListStyle2ClassBottomSmallText2>
                        <ChillfulActivityListStyle2ClassBottomText4>{ guidedMeditationSubCategory2 } ● 12 minutes</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom2>
                    </ChillfulActivityListStyle2Small1>
                  </ChillfulActivityListStyle2TdLong2>

                  <ChillfulActivityListStyle2TdLong>
                    <ChillfulActivityListStyle2Small1>
                      <ChillfulActivityListStyle2Container2>
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + guidedMeditationImagesLarge3 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container2>
                      <ChillfulActivityListStyle2ClassBottom2>
                        <ChillfulActivityListIcon src={require("../images/general/mindful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ guidedMeditationCategory3 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomSmallText2>{ guidedMeditationTitle3 }</ChillfulActivityListStyle2ClassBottomSmallText2>
                        <ChillfulActivityListStyle2ClassBottomText4>{ guidedMeditationSubCategory3 } ● 7 minutes</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom2>
                    </ChillfulActivityListStyle2Small1>
                  </ChillfulActivityListStyle2TdLong>

                </tr>
                <tr>

                  <td colSpan="2">
                    <ChillfulActivityListStyle2Small2>
                      <ChillfulActivityListStyle2Container3>
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + guidedMeditationImagesLarge4 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container3>
                      <ChillfulActivityListStyle2ClassBottom>
                        <ChillfulActivityListIcon src={require("../images/general/mindful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ guidedMeditationCategory4 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomText2>{ guidedMeditationTitle4 }</ChillfulActivityListStyle2ClassBottomText2>
                        <ChillfulActivityListStyle2ClassBottomText3>{ guidedMeditationDescription4 }</ChillfulActivityListStyle2ClassBottomText3>
                        <ChillfulActivityListStyle2ClassBottomText4>{ guidedMeditationSubCategory4 } ● 4 minutes</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom>
                    </ChillfulActivityListStyle2Small2>

                    <ChillfulActivityListStyle2Small3>
                      <ChillfulActivityListStyle2Container2>
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + guidedMeditationImagesLarge3 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container2>
                      <ChillfulActivityListStyle2ClassBottom2>
                        <ChillfulActivityListIcon src={require("../images/general/mindful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ guidedMeditationCategory3 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomSmallText2>{ guidedMeditationTitle3 }</ChillfulActivityListStyle2ClassBottomSmallText2>
                        <ChillfulActivityListStyle2ClassBottomText4>{ guidedMeditationSubCategory3 } ● 7 minutes</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom2>
                    </ChillfulActivityListStyle2Small3>

                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </ChillfulActivityListStyle2>

        <div style={{ marginTop:"100px" }}>

          <img style={{ width:"calc( 100% - 400px)", marginLeft:"200px", marginRight:"200px" }} src={require("../images/mindful/article3.png")}></img>

          <table style={{ marginLeft:"200px", marginRight:"200px", marginTop:"30px", width:"calc( 100% - 400px )" }}>

            <colgroup>
              <col style={{ width:"25%" }} />
              <col style={{ width:"25%" }} />
              <col style={{ width:"25%" }} />
              <col style={{ width:"25%" }} />
            </colgroup>

            <tbody>

              <tr>
                <td>
                  <p style={{ fontSize:"15px", color:"#aaa", cursor:"pointer" }}>01 - How to be more empathetic</p>
                </td>
                <td>
                  <p style={{ fontSize:"15px", color:"#aaa", cursor:"pointer" }}>02 - How to sleep better</p>
                </td>
                <td>
                  <p style={{ fontSize:"15px", color:"#444", cursor:"pointer" }}>03 - Meditation for productivity</p>
                </td>
                <td>
                  <p style={{ fontSize:"15px", color:"#aaa", cursor:"pointer" }}>04 - Mental toughness</p>
                </td>
              </tr>

              <tr>
                <td><div style={{ width:"90%", height:"2px", backgroundColor:"#ccc", cursor:"pointer" }}></div></td>
                <td><div style={{ width:"90%", height:"2px", backgroundColor:"#ccc", cursor:"pointer" }}></div></td>
                <td><div style={{ width:"90%", height:"2px", backgroundColor:"#444", cursor:"pointer" }}></div></td>
                <td><div style={{ width:"90%", height:"2px", backgroundColor:"#ccc", cursor:"pointer" }}></div></td>
              </tr>

            </tbody>

          </table>

        </div>

        <svg style={{ marginTop:"100px", marginBottom:"-7px" }} width="100%" height="auto" viewBox="0 0 3840 260" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Path</title>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M-9.09494702e-13,0.5 L-9.09494702e-13,259.5 C543.289571,86.8333333 1184.99624,0.5 1925.12,0.5 C2499.39149,0.5 3137.68482,86.8333333 3840,259.5 L3840,0.5 L-9.09494702e-13,0.5 Z" id="Path" fill="#f3f3f3" transform="translate(1920.000000, 130.000000) scale(1, -1) translate(-1920.000000, -130.000000) "></path>
            </g>
        </svg>

        <ChillfulActivityListStyle1 style={{ backgroundColor:"#f3f3f3" }}>
          <ChillfulActivityListStyle1TitleDiv>
            <h1 style={{ color:"#999", fontWeight:"600", fontSize:"100px", marginLeft:"50px"}}>Ambient music</h1>
          </ChillfulActivityListStyle1TitleDiv>
          <div style={{ height:"95px" }}></div>

            <ChillfulActivityListStyle1Table>
              <tbody>
                <tr>
                  <td><ChillfulActivityListStyle1Margin /></td>
                  <ChillfulActivityListStyle1Td><AmbientMusicCard id={"test6"} activity_id={"uxdypsOrmr55QisN0Wdv"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><AmbientMusicCard id={"test7"} activity_id={"9vjYN5vkmRj19Dky2t2R"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><AmbientMusicCard id={"test8"} activity_id={"IDAYNJaWKVJS2S5yyMTn"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><AmbientMusicCard id={"test9"} activity_id={"Nq3t55WuJMDEMW1REURW"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><AmbientMusicCard id={"test10"} activity_id={"xLXg8hmaY1mtfwwctaWb"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin /></td>
                </tr>
              </tbody>
            </ChillfulActivityListStyle1Table>

        </ChillfulActivityListStyle1>

      </ChillfulBody>

      <svg style={{ backgroundColor:"white", marginTop:"-80px", zIndex:"3", position:"relative" }} width="100%" height="auto" viewBox="0 0 3840 259" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Path</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M0,0 C539.876237,172.666667 1179.87624,259 1920,259 C2494.27149,259 3134.27149,172.666667 3840,0 L0,0 Z" id="Path" fill="#f3f3f3"></path>
          </g>
      </svg>

      <Footer />

    </div>
  );
}

export default Meditation;

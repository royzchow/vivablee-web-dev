import React, { useState, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivitySearchBox from "../components/ActivitySearchBox";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import img_article_1 from '../images/articles/article1.jpg';
import img_article_2 from '../images/articles/article2.jpg';
import img_article_3 from '../images/articles/article3.jpg';
import img_article_4 from '../images/articles/article4.jpg';
import img from '../images/chillful/food.png';
import img_event_1 from '../images/chillful/event_1.jpg';
import { db } from "../firebase";

// define css class
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
const BannerBtn3 = styled.button`
  padding: 0px 7px 1px 7px;
  color:white;
  border-radius: 50px;
  border-style: none;
  background-color:#FF9700;
  font-weight:700;
  font-size:16px;
  box-shadow: 0px 3px 12px 2px rgba(0,0,0,0.05);
  cursor:pointer;
  margin-left: 20px;
`;

const ArticleCardDiv1 = styled.div`
  width: calc( 100% - 10px );
  height:300px;
  background-image: url(${img_article_1});
  background-position: center;
  border-radius:15px;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
`;
const ArticleCardDiv2 = styled.div`
  width: calc( 100% - 10px );
  height:300px;
  background-image: url(${img_article_2});
  background-position: center;
  border-radius:15px;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
`;
const ArticleCardDiv3 = styled.div`
  width: calc( 100% - 10px );
  height:300px;
  background-image: url(${img_article_3});
  background-position: center;
  border-radius:15px;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
`;
const ArticleCardDiv4 = styled.div`
  width: calc( 100% - 10px );
  height:300px;
  background-image: url(${img_article_4});
  background-position: center;
  border-radius:15px;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
`;
const ArticleCardDivGrey = styled.div`
  width: calc( 50% - 13px );
  height:300px;
  border-radius:15px;
  margin-left:5px;
  margin-right:5px;
  margin-bottom:10px;
  position:absolute;
  margin-top:-310px;
  background-color: rgba(0, 0, 0, 0.1);
  cursor:pointer;
`;

const ChillfulMargin10 = styled.div`
  height:10px;
`;
const ChillfulMargin40 = styled.div`
  height:40px;
`;
const ChillfulBanner = styled.div`
  height:600px;
  background-size: cover;
  background-image: url(${img});
  background-position: center;
  border-radius:30px;
`;
const ChillfulMargin160 = styled.div`
  height:160px;
`;
const ChillfulBannerText = styled.div`
  margin-right:100px;
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
  color: #FF585D;
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
  background-color:#FF585D;
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
  background-color:#f9f9f9;
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
  color:#FF585D;
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
  color:#FF585D;
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
  margin-top:1px;
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
  @media only screen and (max-width: 800px) {
    margin-right:5px;
  }
`;
const ChillfulActivityListStyle2ContainerDiv2 = styled.div`
  cursor:pointer;
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
`;
const ChillfulActivityListStyle2Small2 = styled.div`
  margin-left:24px;
  margin-top: 24px;
  cursor:pointer;
  @media only screen and (max-width: 1200px) {
    display:none;
  }
`;
const ChillfulActivityListStyle2Small3 = styled.div`
  margin-left:24px;
  margin-top: 24px;
  display:none;
  cursor:pointer;
  @media only screen and (max-width: 1200px) {
    display:inline-block;
  }
  @media only screen and (max-width: 800px) {
    display:none;
  }
`;
const ChillfulActivityListStyle1 = styled.div`
  overflow-x: scroll;
  height:500px;
  padding-top:70px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ChillfulActivityListStyle1Title = styled.span`
  font-weight:600;
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

function Chillful() {


  const [chillfulBannerTitle, setChillfulBannerTitle] = useState("");
  const [chillfulBannerDescription, setChillfulBannerDescription] = useState("");

  const [chillfulActivityTitle, setChillfulActivityTitle] = useState("");
  const [chillfulActivityDescription, setChillfulActivityDescription] = useState("");
  const [chillfulActivityCategory, setChillfulActivityCategory] = useState("");
  const [chillfulActivitySubCategory, setChillfulActivitySubCategory] = useState("");

  const [chillfulActivityTitle1, setChillfulActivityTitle1] = useState("");
  const [chillfulActivityDescription1, setChillfulActivityDescription1] = useState("");
  const [chillfulActivityCategory1, setChillfulActivityCategory1] = useState("");
  const [chillfulActivitySubCategory1, setChillfulActivitySubCategory1] = useState("");
  const [chillfulActivityImagesLarge1, setChillfulActivityImagesLarge1] = useState("");
  const [chillfulActivityImagesSmall1, setChillfulActivityImagesSmall1] = useState("");
  const [chillfulActivityDuration1, setChillfulActivityDuration1] = useState("");

  const [chillfulActivityTitle2, setChillfulActivityTitle2] = useState("");
  const [chillfulActivityDescription2, setChillfulActivityDescription2] = useState("");
  const [chillfulActivityCategory2, setChillfulActivityCategory2] = useState("");
  const [chillfulActivitySubCategory2, setChillfulActivitySubCategory2] = useState("");
  const [chillfulActivityImagesLarge2, setChillfulActivityImagesLarge2] = useState("");
  const [chillfulActivityImagesSmall2, setChillfulActivityImagesSmall2] = useState("");
  const [chillfulActivityDuration2, setChillfulActivityDuration2] = useState("");

  const [chillfulActivityTitle3, setChillfulActivityTitle3] = useState("");
  const [chillfulActivityDescription3, setChillfulActivityDescription3] = useState("");
  const [chillfulActivityCategory3, setChillfulActivityCategory3] = useState("");
  const [chillfulActivitySubCategory3, setChillfulActivitySubCategory3] = useState("");
  const [chillfulActivityImagesLarge3, setChillfulActivityImagesLarge3] = useState("");
  const [chillfulActivityImagesSmall3, setChillfulActivityImagesSmall3] = useState("");
  const [chillfulActivityDuration3, setChillfulActivityDuration3] = useState("");

  const [chillfulActivityTitle4, setChillfulActivityTitle4] = useState("");
  const [chillfulActivityDescription4, setChillfulActivityDescription4] = useState("");
  const [chillfulActivityCategory4, setChillfulActivityCategory4] = useState("");
  const [chillfulActivitySubCategory4, setChillfulActivitySubCategory4] = useState("");
  const [chillfulActivityImagesLarge4, setChillfulActivityImagesLarge4] = useState("");
  const [chillfulActivityImagesSmall4, setChillfulActivityImagesSmall4] = useState("");
  const [chillfulActivityDuration4, setChillfulActivityDuration4] = useState("");

  var chillfulActivityCategoryId = "";

  const [category, setCategory] = useState("");
  const [category_chi, setCategory_chi] = useState("");
  const [description, setDescription] = useState("");
  const [description_chi, setDescription_chi] = useState("");

  const [packages, setPackages] = useState([""]);
  const [packages_chi, setPackages_chi] = useState([""]);
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategory_chi, setSubCategory_chi] = useState("");
  const [targets, setTargets] = useState([""]);
  const [targets_chi, setTargets_chi] = useState([""]);
  const [title, setTitle] = useState("");
  const [title_chi, setTitle_chi] = useState("");

  const [loader, setLoader] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [timeslots, setTimeslots] = useState([]);

  const [images, setImages] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);

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

    db.collection("chillfulActivities").doc('3GxfNyB6G3tyFnT15EsZ')
      .get()
      .then( doc => {
        const data = doc.data()
        setChillfulActivityTitle1(data['title']);
        setChillfulActivityDescription1(data['description']);
        setChillfulActivityCategory1(data['category']);
        setChillfulActivitySubCategory1(data['subCategory']);
        setChillfulActivityDuration1(data['duration']/3600);
        setChillfulActivityImagesSmall1(data['imagesSmall']);
        setChillfulActivityImagesLarge1(data['imagesLarge']);
    })

    db.collection("chillfulActivities").doc('4PnOPjTFzozWJYiLqr5n')
      .get()
      .then( doc => {
        const data = doc.data()
        setChillfulActivityTitle2(data['title']);
        setChillfulActivityDescription2(data['description']);
        setChillfulActivityCategory2(data['category']);
        setChillfulActivitySubCategory2(data['subCategory']);
        setChillfulActivityDuration2(data['duration']/3600);
        setChillfulActivityImagesSmall2(data['imagesSmall']);
        setChillfulActivityImagesLarge2(data['imagesLarge']);
    })

    db.collection("chillfulActivities").doc('4oy8SjLTk3GsIU1Fwuif')
      .get()
      .then( doc => {
        const data = doc.data()
        setChillfulActivityTitle3(data['title']);
        setChillfulActivityDescription3(data['description']);
        setChillfulActivityCategory3(data['category']);
        setChillfulActivitySubCategory3(data['subCategory']);
        setChillfulActivityDuration3(data['duration']/3600);
        setChillfulActivityImagesSmall3(data['imagesSmall']);
        setChillfulActivityImagesLarge3(data['imagesLarge']);
    })

    db.collection("chillfulActivities").doc('6mHQUu0lBOwlBsElBKQ5')
      .get()
      .then( doc => {
        const data = doc.data()
        setChillfulActivityTitle4(data['title']);
        setChillfulActivityDescription4(data['description']);
        setChillfulActivityCategory4(data['category']);
        setChillfulActivitySubCategory4(data['subCategory']);
        setChillfulActivityDuration4(data['duration']/3600);
        setChillfulActivityImagesSmall4(data['imagesSmall']);
        setChillfulActivityImagesLarge4(data['imagesLarge']);
    })

      $("#article_1").hover(
        function() {
          $("#article_1_hover_box").css("transform", "translate(8px, -8px)");
        }, function() {
          $("#article_1_hover_box").css("transform", "translate(0px, 0px)");
        }
      );
      $("#article_2").hover(
        function() {
          $("#article_2_hover_box").css("transform", "translate(8px, -8px)");
        }, function() {
          $("#article_2_hover_box").css("transform", "translate(0px, 0px)");
        }
      );
      $("#article_3").hover(
        function() {
          $("#article_3_hover_box").css("transform", "translate(8px, -8px)");
        }, function() {
          $("#article_3_hover_box").css("transform", "translate(0px, 0px)");
        }
      );
      $("#article_4").hover(
        function() {
          $("#article_4_hover_box").css("transform", "translate(8px, -8px)");
        }, function() {
          $("#article_4_hover_box").css("transform", "translate(0px, 0px)");
        }
      );

  }, []);

  return (
    <div style={{width: "100%"}}>

      <Menu page={"activities"} />

      {/* Be Chillful top banner */}

      <div style={{ padding:"50px 150px 100px 150px" }}>

        <table>
          <colgroup>
            <col style={{ width:"50%" }} />
            <col style={{ width:"50%" }} />
          </colgroup>
          <tbody>
            <tr>
              <td>
                <ChillfulBannerText>
                  <ChillfulBannerIcon style={{ marginBottom:"-3px" }} src={require("../images/general/chillful_icon_original.png")}></ChillfulBannerIcon>
                  <ChillfulBannerText1>MORE THAN FOOD</ChillfulBannerText1>
                  <ChillfulBannerText2>Mindful Eat in the Restaurant</ChillfulBannerText2>
                  <ChillfulBannerText3>Try feel the food for every lunch and dinner to feel the current moment...</ChillfulBannerText3>
                  <ChillfulBannerText4>Mindful eat ● 2 hours</ChillfulBannerText4>
                  <ChillfulBannerBtn>
                    <ChillfulBannerBtnIcon src={require("../images/general/play_white.png")}></ChillfulBannerBtnIcon>
                    <ChillfulBannerBtnText style={{ color:"white" }}>Join Now</ChillfulBannerBtnText>
                  </ChillfulBannerBtn>
                </ChillfulBannerText>
              </td>

              <td>
                <ChillfulBanner />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <svg style={{ backgroundColor:"white", marginBottom:"-40px" }} width="100%" height="auto" viewBox="0 0 3840 260" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Path</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M-9.09494702e-13,0.5 L-9.09494702e-13,259.5 C543.289571,86.8333333 1184.99624,0.5 1925.12,0.5 C2499.39149,0.5 3137.68482,86.8333333 3840,259.5 L3840,0.5 L-9.09494702e-13,0.5 Z" id="Path" fill="#f9f9f9" transform="translate(1920.000000, 130.000000) scale(1, -1) translate(-1920.000000, -130.000000) "></path>
          </g>
      </svg>

      <ActivitySearchBox />

      <div style={{ paddingLeft:"150px", paddingRight:"150px", paddingTop:"180px", paddingBottom:"70px", backgroundColor:"#f9f9f9" }}>

        <h1 style={{ fontSize:"60px", fontWeight:"700", color:"#444", textAlign:"center", marginBottom:"25px" }}>Explore the World</h1>

        <div style={{ display:"table", margin: "0px auto" }}>

          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"150px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Active Fitness</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"150px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Arts & Crafts</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"150px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Body Wellness</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"150px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>More than Food</span>
          </div>
          <div style={{ borderRadius: "10px", backgroundColor:"#FF9700", color:"white", padding:"5px", width:"150px", textAlign:"center", display:"inline-block", margin:"0px 10px", cursor:"pointer"}}>
            <span style={{  }}>Go Out & Discover</span>
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
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + chillfulActivityImagesLarge1 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container>
                      <ChillfulActivityListStyle2ClassBottom>
                        <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ chillfulActivityCategory1 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomText2>{ chillfulActivityTitle1 }</ChillfulActivityListStyle2ClassBottomText2>
                        <ChillfulActivityListStyle2ClassBottomText3>{ chillfulActivityDescription1 }</ChillfulActivityListStyle2ClassBottomText3>
                        <ChillfulActivityListStyle2ClassBottomText4>{ chillfulActivitySubCategory1 } ● { chillfulActivityDuration1 } hours</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom>
                    </ChillfulActivityListStyle2ContainerDiv1>
                  </td>

                  <ChillfulActivityListStyle2ContainerTd>
                    <ChillfulActivityListStyle2ContainerDiv2>

                      <ChillfulActivityListStyle2Container>
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + chillfulActivityImagesLarge2 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container>
                      <ChillfulActivityListStyle2ClassBottom>
                        <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ chillfulActivityCategory2 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomText2>{ chillfulActivityTitle2 } </ChillfulActivityListStyle2ClassBottomText2>
                        <ChillfulActivityListStyle2ClassBottomText3>{ chillfulActivityDescription2 }</ChillfulActivityListStyle2ClassBottomText3>
                        <ChillfulActivityListStyle2ClassBottomText4>{ chillfulActivitySubCategory2 } ● { chillfulActivityDuration1 } hours</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom>

                    </ChillfulActivityListStyle2ContainerDiv2>
                  </ChillfulActivityListStyle2ContainerTd>

                  <ChillfulActivityListStyle2TdLong2>
                    <ChillfulActivityListStyle2Small1>
                      <ChillfulActivityListStyle2Container2>
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + chillfulActivityImagesLarge2 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container2>
                      <ChillfulActivityListStyle2ClassBottom2>
                        <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ chillfulActivityCategory2 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomSmallText2>{ chillfulActivityTitle2 }</ChillfulActivityListStyle2ClassBottomSmallText2>
                        <ChillfulActivityListStyle2ClassBottomText4>{ chillfulActivitySubCategory2 } ● { chillfulActivityDuration1 } hours</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom2>
                    </ChillfulActivityListStyle2Small1>
                  </ChillfulActivityListStyle2TdLong2>

                  <ChillfulActivityListStyle2TdLong>
                    <ChillfulActivityListStyle2Small1>
                      <ChillfulActivityListStyle2Container2>
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + chillfulActivityImagesLarge3 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container2>
                      <ChillfulActivityListStyle2ClassBottom2>
                        <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ chillfulActivityCategory3 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomSmallText2>{ chillfulActivityTitle3 }</ChillfulActivityListStyle2ClassBottomSmallText2>
                        <ChillfulActivityListStyle2ClassBottomText4>{ chillfulActivitySubCategory3 } ● { chillfulActivityDuration1 } hours</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom2>
                    </ChillfulActivityListStyle2Small1>
                  </ChillfulActivityListStyle2TdLong>

                </tr>
                <tr>

                  <td colSpan="2">
                    <ChillfulActivityListStyle2Small2>
                      <ChillfulActivityListStyle2Container3>
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + chillfulActivityImagesLarge4 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container3>
                      <ChillfulActivityListStyle2ClassBottom>
                        <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ chillfulActivityCategory4 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomText2>{ chillfulActivityTitle4 }</ChillfulActivityListStyle2ClassBottomText2>
                        <ChillfulActivityListStyle2ClassBottomText3>{ chillfulActivityDescription4 }</ChillfulActivityListStyle2ClassBottomText3>
                        <ChillfulActivityListStyle2ClassBottomText4>{ chillfulActivitySubCategory4 } ● { chillfulActivityDuration4 } hours</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom>
                    </ChillfulActivityListStyle2Small2>

                    <ChillfulActivityListStyle2Small3>
                      <ChillfulActivityListStyle2Container2>
                        <ChillfulActivityListStyle2ImageCover style={{backgroundImage: "url(" + chillfulActivityImagesLarge3 + ")"}}></ChillfulActivityListStyle2ImageCover>
                      </ChillfulActivityListStyle2Container2>
                      <ChillfulActivityListStyle2ClassBottom2>
                        <ChillfulActivityListIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulActivityListIcon>
                        <ChillfulActivityListStyle2ClassBottomText1>{ chillfulActivityCategory3 }</ChillfulActivityListStyle2ClassBottomText1>
                        <ChillfulActivityListStyle2ClassBottomSmallText2>{ chillfulActivityTitle3 }</ChillfulActivityListStyle2ClassBottomSmallText2>
                        <ChillfulActivityListStyle2ClassBottomText4>{ chillfulActivitySubCategory3 } ● { chillfulActivityDuration1 } hours</ChillfulActivityListStyle2ClassBottomText4>
                      </ChillfulActivityListStyle2ClassBottom2>
                    </ChillfulActivityListStyle2Small3>

                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </ChillfulActivityListStyle2>

        <svg style={{ backgroundColor:"white", marginTop:"100px", marginBottom:"-7px" }} width="100%" height="auto" viewBox="0 0 3840 259" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Path</title>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M0,0 C539.876237,172.666667 1179.87624,259 1920,259 C2494.27149,259 3134.27149,172.666667 3840,0 L0,0 Z" id="Path" fill="#f9f9f9"></path>
            </g>
        </svg>

        <div style={{ paddingLeft:"140px", paddingRight:"140px", paddingTop:"50px", paddingBottom:"120px", backgroundColor:"white" }}>

          <h1 style={{ fontSize:"100px", color:"#f8f4ec", marginLeft:"30px", zIndex:"1", position:"relative" }}>Latest articles</h1>

          <table style={{ width:"100%", marginTop:"-45px", zIndex:"2", position:"relative" }}>

            <colgroup>
              <col style={{ width:"50%" }} />
              <col style={{ width:"50%" }} />
            </colgroup>

            <tbody>

              <tr>
                <td>
                  <ArticleCardDiv1></ArticleCardDiv1>
                  <ArticleCardDivGrey id="article_1">
                    <div style={{ position:"absolute", width:"calc( 100% - 24px )", marginTop:"20px" }}>
                      <div style={{ float:"right", backgroundColor:"#FF9700", padding:"2px 8px 4px 8px", borderRadius:"50px" }}>
                        <img style={{ width:"12px", marginBottom:"-2px" }} src={require("../images/general/mindful_icon_white.png")}></img>
                        <span style={{ color:"white", fontSize:"12px", fontWeight:"700", marginLeft:"4px" }}>SLEEP</span>
                      </div>
                    </div>
                    <div style={{ position:"relative", width:"calc( 100% - 100px )", borderRadius:"10px", height:"80px", margin:"210px 0px 0px 10px", backgroundColor:"white", zIndex:"3"}}>
                      <div style={{ padding:"15px 20px 5px 20px"  }}>
                        <p style={{ color:"#333", fontSize:"18px", fontWeight:"700" }}>How to sleep better?</p>
                      </div>
                      <BannerBtn3>
                        <img style={{ width:"8px", marginLeft:"1px", marginTop:"0px" }} src={require("../images/general/play_white.png")}></img>
                      </BannerBtn3>
                    </div>
                    <div id="article_1_hover_box" style={{ transition:"all 0.5s", width:"calc( 100% - 100px )", position:"absolute", borderRadius:"10px", height:"80px", margin:"-80px 0px 0px 10px", backgroundColor:"#FF9700"}}></div>
                  </ArticleCardDivGrey>
                </td>
                <td>
                  <ArticleCardDiv2></ArticleCardDiv2>
                  <ArticleCardDivGrey id="article_2">
                    <div style={{ position:"absolute", width:"calc( 100% - 24px )", marginTop:"20px" }}>
                      <div style={{ float:"right", backgroundColor:"#FF9700", padding:"2px 8px 4px 8px", borderRadius:"50px" }}>
                        <img style={{ width:"12px", marginBottom:"-2px" }} src={require("../images/general/mindful_icon_white.png")}></img>
                        <span style={{ color:"white", fontSize:"12px", fontWeight:"700", marginLeft:"4px" }}>FOCUS</span>
                      </div>
                    </div>
                    <div style={{ position:"relative", width:"calc( 100% - 100px )", borderRadius:"10px", height:"80px", margin:"210px 0px 0px 10px", backgroundColor:"white", zIndex:"3"}}>
                      <div style={{ padding:"15px 20px 5px 20px"  }}>
                        <p style={{ color:"#333", fontSize:"18px", fontWeight:"700" }}>How's meditation work?</p>
                      </div>
                      <BannerBtn3>
                        <img style={{ width:"8px", marginLeft:"1px", marginTop:"0px" }} src={require("../images/general/play_white.png")}></img>
                      </BannerBtn3>
                    </div>
                    <div id="article_2_hover_box" style={{ transition:"all 0.5s", width:"calc( 100% - 100px )", position:"absolute", borderRadius:"10px", height:"80px", margin:"-80px 0px 0px 10px", backgroundColor:"#FF9700"}}></div>
                  </ArticleCardDivGrey>
                </td>
              </tr>
              <tr>
                <td>
                  <ArticleCardDiv3></ArticleCardDiv3>
                  <ArticleCardDivGrey id="article_3">
                    <div style={{ position:"absolute", width:"calc( 100% - 24px )", marginTop:"20px" }}>
                      <div style={{ float:"right", backgroundColor:"#FF585D", padding:"2px 8px 4px 10px", borderRadius:"50px" }}>
                        <img style={{ width:"12px", marginBottom:"-2px" }} src={require("../images/general/chillful_icon_white.png")}></img>
                        <span style={{ color:"white", fontSize:"12px", fontWeight:"700", marginLeft:"6px" }}>MORE THAN FOOD</span>
                      </div>
                    </div>
                    <div style={{ position:"relative", width:"calc( 100% - 100px )", borderRadius:"10px", height:"80px", margin:"210px 0px 0px 10px", backgroundColor:"white", zIndex:"3"}}>
                      <div style={{ padding:"15px 20px 5px 20px"  }}>
                        <p style={{ color:"#333", fontSize:"18px", fontWeight:"700" }}>What is mindful eating?</p>
                      </div>
                      <BannerBtn3>
                        <img style={{ width:"8px", marginLeft:"1px", marginTop:"0px" }} src={require("../images/general/play_white.png")}></img>
                      </BannerBtn3>
                    </div>
                    <div id="article_3_hover_box" style={{ transition:"all 0.5s", width:"calc( 100% - 100px )", position:"absolute", borderRadius:"10px", height:"80px", margin:"-80px 0px 0px 10px", backgroundColor:"#FF585D"}}></div>
                  </ArticleCardDivGrey>
                </td>
                <td>
                  <ArticleCardDiv4></ArticleCardDiv4>
                  <ArticleCardDivGrey id="article_4">
                    <div style={{ position:"absolute", width:"calc( 100% - 24px )", marginTop:"20px" }}>
                      <div style={{ float:"right", backgroundColor:"#FF9700", padding:"2px 8px 4px 8px", borderRadius:"50px" }}>
                        <img style={{ width:"12px", marginBottom:"-2px" }} src={require("../images/general/mindful_icon_white.png")}></img>
                        <span style={{ color:"white", fontSize:"12px", fontWeight:"700", marginLeft:"4px" }}>DESTRESS</span>
                      </div>
                    </div>
                    <div style={{ position:"relative", width:"calc( 100% - 100px )", borderRadius:"10px", height:"80px", margin:"210px 0px 0px 10px", backgroundColor:"white", zIndex:"3"}}>
                      <div style={{ padding:"15px 20px 5px 20px"  }}>
                        <p style={{ color:"#333", fontSize:"18px", fontWeight:"700" }}>Mindful Walk!</p>
                      </div>
                      <BannerBtn3>
                        <img style={{ width:"8px", marginLeft:"1px", marginTop:"0px" }} src={require("../images/general/play_white.png")}></img>
                      </BannerBtn3>
                    </div>
                    <div id="article_4_hover_box" style={{ transition:"all 0.5s", width:"calc( 100% - 100px )", position:"absolute", borderRadius:"10px", height:"80px", margin:"-80px 0px 0px 10px", backgroundColor:"#FF9700"}}></div>
                  </ArticleCardDivGrey>
                </td>
              </tr>

            </tbody>

          </table>

          <div style={{ marginTop:"50px", position: "relative", backgroundColor:"white" }}>
            <div style={{ left: "50%", marginRight: "-50%", position: "absolute", transform: "translate(-50%, -50%)" }}>
              <BannerBtn>View all articles</BannerBtn>
            </div>
          </div>

        </div>

        <svg style={{ backgroundColor:"white", marginTop:"-7px", marginBottom:"-30px" }} width="100%" height="auto" viewBox="0 0 3815 394" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Path 6</title>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M-1.8189894e-12,259 C459.075022,86.3333333 973.340227,-2.27373675e-13 1542.79561,-2.27373675e-13 C2112.251,-2.27373675e-13 2869.65246,131.323801 3815,393.971403 L-1.8189894e-12,393.971403 L-1.8189894e-12,259 Z" id="Path-6" fill="#f9f9f9"></path>
            </g>
        </svg>

        <div style={{ position:"absolute", right:"100px", marginTop:"-60px" }}>
          <h1 style={{ fontSize:"100px", color:"#333" }}>All Activities</h1>
        </div>

        <ChillfulActivityListStyle1>

          <ChillfulActivityListStyle1TitleDiv>
            <ChillfulActivityListStyle1Title>ARTS & CRAFTS</ChillfulActivityListStyle1Title>
            <ChillfulActivityListStyle2Arrow src={require("../images/general/arrow_right_black.png")}></ChillfulActivityListStyle2Arrow>
          </ChillfulActivityListStyle1TitleDiv>
          <ChillfulMargin40 />

            <ChillfulActivityListStyle1Table>
              <tbody>
                <tr>
                  <td><ChillfulActivityListStyle1Margin /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test1"} activity_id={"82igyMKjFbohQqJp30zZ"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test2"} activity_id={"8ftzCGjzD5MW40yINnkQ"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test3"} activity_id={"9nJ0oYIfItozPSx1EDMS"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test4"} activity_id={"AJfCx6bE5QhgzsBm2e5G"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test5"} activity_id={"Ad5IRMIjIowLup1z2068"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin /></td>
                </tr>
              </tbody>
            </ChillfulActivityListStyle1Table>

        </ChillfulActivityListStyle1>

        <ChillfulActivityListStyle1 style={{marginTop:"-150px"}}>
          <ChillfulActivityListStyle1TitleDiv>
            <ChillfulActivityListStyle1Title>ACTIVE FITNESS</ChillfulActivityListStyle1Title>
            <ChillfulActivityListStyle2Arrow src={require("../images/general/arrow_right_black.png")}></ChillfulActivityListStyle2Arrow>
          </ChillfulActivityListStyle1TitleDiv>
          <ChillfulMargin40 />

            <ChillfulActivityListStyle1Table>
              <tbody>
                <tr>
                  <td><ChillfulActivityListStyle1Margin /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test6"} activity_id={"Al5QUMTaHqOMlIUK9piz"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test7"} activity_id={"CARezGIaP9gKpUTIVmJ9"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test8"} activity_id={"DcZJKOmJbA7lvPOvIm88"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test9"} activity_id={"DkLnYtCv3qlVU9WgzUPc"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test10"} activity_id={"DqLp3MZwlhyRF9Ya6UGz"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin /></td>
                </tr>
              </tbody>
            </ChillfulActivityListStyle1Table>

        </ChillfulActivityListStyle1>

        <ChillfulActivityListStyle1 style={{marginTop:"-150px"}}>
          <ChillfulActivityListStyle1TitleDiv>
            <ChillfulActivityListStyle1Title>BODY WELLNESS</ChillfulActivityListStyle1Title>
            <ChillfulActivityListStyle2Arrow src={require("../images/general/arrow_right_black.png")}></ChillfulActivityListStyle2Arrow>
          </ChillfulActivityListStyle1TitleDiv>
          <ChillfulMargin40 />

            <ChillfulActivityListStyle1Table>
              <tbody>
                <tr>
                  <td><ChillfulActivityListStyle1Margin /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test16"} activity_id={"DtcJee2ap2eHA7fPkIWA"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test17"} activity_id={"EhpfxERRVvznkLylnasp"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test18"} activity_id={"GI0ebzy9ztSbBy0bDFJB"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test19"} activity_id={"GWq9WdYAJEQs6LvZ9US3"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test110"} activity_id={"KdCb58sTrbDhkfS1RpHE"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin /></td>
                </tr>
              </tbody>
            </ChillfulActivityListStyle1Table>

        </ChillfulActivityListStyle1>

        <ChillfulActivityListStyle1 style={{marginTop:"-150px"}}>
          <ChillfulActivityListStyle1TitleDiv>
            <ChillfulActivityListStyle1Title>MORE THAN FOOD</ChillfulActivityListStyle1Title>
            <ChillfulActivityListStyle2Arrow src={require("../images/general/arrow_right_black.png")}></ChillfulActivityListStyle2Arrow>
          </ChillfulActivityListStyle1TitleDiv>
          <ChillfulMargin40 />

            <ChillfulActivityListStyle1Table>
              <tbody>
                <tr>
                  <td><ChillfulActivityListStyle1Margin /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test26"} activity_id={"LDJoY4kgeZJprIawc953"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test27"} activity_id={"Lh8rZY7o6RqnQkr6Li91"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test28"} activity_id={"MASdAFFvJ9m6ZwaRWTim"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test29"} activity_id={"PbwMw3I3Jqe6nQvZT2FN"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test210"} activity_id={"Q3lLt3MNfpq7ghsaEaYj"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin /></td>
                </tr>
              </tbody>
            </ChillfulActivityListStyle1Table>

        </ChillfulActivityListStyle1>

        <ChillfulActivityListStyle1 style={{marginTop:"-150px"}}>
          <ChillfulActivityListStyle1TitleDiv>
            <ChillfulActivityListStyle1Title>GO OUT & DISCOVER</ChillfulActivityListStyle1Title>
            <ChillfulActivityListStyle2Arrow src={require("../images/general/arrow_right_black.png")}></ChillfulActivityListStyle2Arrow>
          </ChillfulActivityListStyle1TitleDiv>
          <ChillfulMargin40 />

            <ChillfulActivityListStyle1Table>
              <tbody>
                <tr>
                  <td><ChillfulActivityListStyle1Margin /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test36"} activity_id={"S3zNFNnUIH1FXu84QraU"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test37"} activity_id={"S4cDLXGlc3VPBniOQZ1l"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test38"} activity_id={"TQSFDRUyCGIM5Fh3w5sC"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test39"} activity_id={"V7f3G5i9a6G53FqFKrXK"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test310"} activity_id={"12DxUVuZ8qwC3xLvbv16"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin /></td>
                </tr>
              </tbody>
            </ChillfulActivityListStyle1Table>

        </ChillfulActivityListStyle1>

      </ChillfulBody>

      <svg style={{ marginTop:"-50px", backgroundColor:"white" }} width="100%" height="auto" viewBox="0 0 3840 259" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Path</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M0,0 C539.876237,172.666667 1179.87624,259 1920,259 C2494.27149,259 3134.27149,172.666667 3840,0 L0,0 Z" id="Path" fill="#f9f9f9"></path>
          </g>
      </svg>

      <Footer />

    </div>
  );
}

export default Chillful;

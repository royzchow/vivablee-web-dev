import React, { useState, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import Menu from "../components/Menu";
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import img from '../images/chillful/event_1.jpg';
import img_event_1 from '../images/chillful/event_1.jpg';
import { db } from "../firebase";

// define css class
const ChillfulBanner = styled.div`
  height:600px;
  background-size: cover;
  background-image: url(${img});
`;
const ChillfulMargin160 = styled.div`
  height:160px;
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
const ChillfulSearchBoxFrame = styled.div`
  position:absolute;
  width:100%;
`;
const ChillfulSearchBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 700px;
  margin-top:-70px;
  border-radius:10px;
  position:absolute;
  right: 50%;
  @media only screen and (max-width: 740px) {
    width: calc(100vw - 40px);
  }
`;
const ChillfulSearchBoxInner = styled.div`
  border-radius:10px;
  background-color:white;
  position: relative;
  right: -50%;
  padding: 20px 30px;
`;
const ChillfulSearchBoxBtn = styled.div`
  border:2px solid #333;
  border-radius:100px;
  padding: 3px 5px 3px 5px;
  cursor:pointer;
  text-align:center;
  display: inline-block;
  font-size:14px;
  margin-right:3px;
`;
const ChillfulSearchBoxBtn2 = styled.div`
  border:2px solid #333;
  border-radius:100px;
  padding: 3px 5px 3px 5px;
  cursor:pointer;
  text-align:center;
  display: inline-block;
  font-size:14px;
  margin-right:3px;
  @media only screen and (max-width: 540px) {
    display: none;
  }
`;
const ChillfulSearchBoxBtn3 = styled.div`
  border:2px solid #333;
  border-radius:100px;
  padding: 3px 5px 3px 5px;
  cursor:pointer;
  text-align:center;
  display: inline-block;
  font-size:14px;
  margin-right:3px;
  @media only screen and (max-width: 640px) {
    display: none;
  }
`;
const ChillfulSearchBoxBtn4 = styled.div`
  border:2px solid #333;
  border-radius:100px;
  padding: 3px 5px 3px 5px;
  cursor:pointer;
  text-align:center;
  display: inline-block;
  font-size:14px;
  margin-right:3px;
  @media only screen and (max-width: 740px) {
    display: none;
  }
`;
const ChillfulSearchBoxBtnText = styled.div`
  cursor:pointer;
  display: none;
  font-size:14px;
  margin-left:10px;
  color: #FF585D;
  text-decoration:underline;
  font-weight:600;
  @media only screen and (max-width: 740px) {
    display: inline-block;
  }
`;
const ChillfulMargin10 = styled.div`
  height:10px;
`;
const ChillfulMargin40 = styled.div`
  height:40px;
`;
const ChillfulSearchBtn = styled.div`
  width:50px;
  height:50px;
  background-color: #FF9700;
  border-radius:100px;
  float: right;
  margin-right: 10px;
  cursor:pointer;
`;
const ChillfulSearchIcon = styled.img`
  height:22px;
  margin-top:14px;
  margin-left:14px;
`;
const ChillfulSearchInputBar = styled.input`
  width:100%;
  border-style: none;
  font-size:20px;
  background-color:transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  :focus {
     outline: none;
  }
`;
const ChillfulSearchSearchBar = styled.div`
  padding: 10px 0px 10px 20px;
  border-radius: 50px;
  background-color: white;
  max-width:800px;
  background-color: #f9f9f9;
`;
const ChillfulSearchIntro = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size:14px;
`;
const ChillfulSearchIntroStrong = styled.span`
  font-weight:700;
  color:#FF585D;
`;
const ChillfulSearchTable = styled.table`
  padding-left:10px;
  width:100%;
  border-collapse: separate;
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
  display:inline-block;
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

  var chillfulActivityCategoryId = "";

  useEffect(() => {

    // to get the information for banner
    db.collection("chillfulActivities").doc('Nig4oQbcVhA5J7Vjhs5a')
      .get()
      .then( doc => {
        const title = []
        const description = []
        const data = doc.data()
        setChillfulBannerTitle(data['title']);
        setChillfulBannerDescription(data['description']);
      })

    // to get the information for activity
    db.collection("chillfulActivities").doc('Nig4oQbcVhA5J7Vjhs5a')
      .get()
      .then( doc => {
        const data = doc.data()
        setChillfulActivityTitle(data['title']);
        setChillfulActivityDescription(data['description']);
        chillfulActivityCategoryId = data['categoryId'];
        db.collection("chillfulActivityCategories").doc(chillfulActivityCategoryId)
          .get()
          .then( doc => {
            const data = doc.data()
            setChillfulActivityCategory(data['category']);
            setChillfulActivitySubCategory(data['subCategory']);
          })
      })

  }, []);

  return (
    <div style={{width: "100%"}}>

      <Menu page={"chillful"} />

      {/* Be Chillful top banner */}
      <ChillfulBanner>

        <ChillfulMargin160/>

        <ChillfulBannerText>
          <ChillfulBannerIcon src={require("../images/general/chillful_icon_original.png")}></ChillfulBannerIcon>
          <ChillfulBannerText1>GO OUT & DISCOVER</ChillfulBannerText1>
          <ChillfulBannerText2>{ chillfulBannerTitle }</ChillfulBannerText2>
          <ChillfulBannerText3>{ chillfulBannerDescription }</ChillfulBannerText3>
          <ChillfulBannerText4>Guided tour ● 2 hours</ChillfulBannerText4>
          <ChillfulBannerBtn>
            <ChillfulBannerBtnIcon src={require("../images/general/play_white.png")}></ChillfulBannerBtnIcon>
            <ChillfulBannerBtnText>Join Now</ChillfulBannerBtnText>
          </ChillfulBannerBtn>
        </ChillfulBannerText>

      </ChillfulBanner>

      {/* Be Chillful search box */}
      <ChillfulSearchBoxFrame>
        <ChillfulSearchBox>
          <ChillfulSearchBoxInner>
            <div>
              <ChillfulSearchBoxBtn>Active Fitness</ChillfulSearchBoxBtn>
              <ChillfulSearchBoxBtn>Arts & Crafts</ChillfulSearchBoxBtn>
              <ChillfulSearchBoxBtn2>Body Wellness</ChillfulSearchBoxBtn2>
              <ChillfulSearchBoxBtn3>More than Food</ChillfulSearchBoxBtn3>
              <ChillfulSearchBoxBtn4>Go Out & Discover</ChillfulSearchBoxBtn4>
              <ChillfulSearchBoxBtnText>explore more...</ChillfulSearchBoxBtnText>
            </div>
            <ChillfulMargin10/>
            <ChillfulSearchSearchBar>
              <ChillfulSearchTable>
                <tbody>
                  <tr>
                    <td>
                      <ChillfulSearchIntro><ChillfulSearchIntroStrong>Chill out</ChillfulSearchIntroStrong> and partake in our diversed picks of <ChillfulSearchIntroStrong>relaxing activities and experiences...</ChillfulSearchIntroStrong></ChillfulSearchIntro>
                      <ChillfulSearchInputBar placeholder="Anything you wanna try and do?"></ChillfulSearchInputBar>
                    </td>
                    <td>
                      <ChillfulSearchBtn>
                        <ChillfulSearchIcon src={require("../images/general/search.png")} />
                      </ChillfulSearchBtn>
                    </td>
                  </tr>
                </tbody>
              </ChillfulSearchTable>
            </ChillfulSearchSearchBar>
          </ChillfulSearchBoxInner>

        </ChillfulSearchBox>
      </ChillfulSearchBoxFrame>

      <ChillfulBody>
        <ChillfulMargin160/>

        {/* Be Chillful sub-heading */}
        <ChillfulBodySubHeading>
          <ChillfulBodySubHeadingText1>BALANCE OF LIFE</ChillfulBodySubHeadingText1>
          <ChillfulBodySubHeadingImage src={require("../images/general/chillful_icon_original.png")}></ChillfulBodySubHeadingImage>
          <ChillfulBodySubHeadingText2>Be Chillful</ChillfulBodySubHeadingText2>
          <ChillfulBodySubHeadingText3><ChillfulBodySubHeadingSpan2>Chill out</ChillfulBodySubHeadingSpan2> and partake in our diversed picks of</ChillfulBodySubHeadingText3>
          <ChillfulBodySubHeadingText3><ChillfulBodySubHeadingSpan1>relaxing activities & experiences</ChillfulBodySubHeadingSpan1></ChillfulBodySubHeadingText3>
        </ChillfulBodySubHeading>

        <ChillfulMargin50/>

        <ChillfulActivityListStyle2>
          <ChillfulActivityListStyle2Title>RECOMMENDED FOR YOU</ChillfulActivityListStyle2Title>
          <ChillfulActivityListStyle2Arrow src={require("../images/general/arrow_right_black.png")}></ChillfulActivityListStyle2Arrow>
          <ChillfulMargin10 />
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
        </ChillfulActivityListStyle2>

        <ChillfulActivityListStyle1>
          <ChillfulActivityListStyle1TitleDiv>
            <ChillfulActivityListStyle1Title>FEATURED</ChillfulActivityListStyle1Title>
            <ChillfulActivityListStyle2Arrow src={require("../images/general/arrow_right_black.png")}></ChillfulActivityListStyle2Arrow>
          </ChillfulActivityListStyle1TitleDiv>
          <ChillfulMargin40 />

            <ChillfulActivityListStyle1Table>
              <tbody>
                <tr>
                  <td><ChillfulActivityListStyle1Margin /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test1"} activity_id={"Nig4oQbcVhA5J7Vjhs5a"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test2"} activity_id={"l6CFVZpuFLfgZy4bxXnI"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test3"} activity_id={"Nig4oQbcVhA5J7Vjhs5a"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test4"} activity_id={"Nig4oQbcVhA5J7Vjhs5a"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test5"} activity_id={"Nig4oQbcVhA5J7Vjhs5a"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin /></td>
                </tr>
              </tbody>
            </ChillfulActivityListStyle1Table>

        </ChillfulActivityListStyle1>

        <ChillfulActivityListStyle1 style={{marginTop:"-150px"}}>
          <ChillfulActivityListStyle1TitleDiv>
            <ChillfulActivityListStyle1Title>FEATURED</ChillfulActivityListStyle1Title>
            <ChillfulActivityListStyle2Arrow src={require("../images/general/arrow_right_black.png")}></ChillfulActivityListStyle2Arrow>
          </ChillfulActivityListStyle1TitleDiv>
          <ChillfulMargin40 />

            <ChillfulActivityListStyle1Table>
              <tbody>
                <tr>
                  <td><ChillfulActivityListStyle1Margin /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test6"} activity_id={"Nig4oQbcVhA5J7Vjhs5a"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test7"} activity_id={"Nig4oQbcVhA5J7Vjhs5a"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test8"} activity_id={"Nig4oQbcVhA5J7Vjhs5a"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test9"} activity_id={"Nig4oQbcVhA5J7Vjhs5a"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin2 /></td>
                  <ChillfulActivityListStyle1Td><ActivityCard id={"test10"} activity_id={"Nig4oQbcVhA5J7Vjhs5a"} /></ChillfulActivityListStyle1Td>
                  <td><ChillfulActivityListStyle1Margin /></td>
                </tr>
              </tbody>
            </ChillfulActivityListStyle1Table>

        </ChillfulActivityListStyle1>

      </ChillfulBody>

    </div>
  );
}

export default Chillful;

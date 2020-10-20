import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { db } from "../firebase";
import img from '../images/chillful/event_1.jpg';

// define css class
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
const ActivitySearchBoxPopUpDiv = styled.div`
  width:100%;
  position: absolute;
  left: 50%;
  border-radius:10px;
  box-shadow: 0px 0px 12px 5px rgba(0,0,0,0.20);
  margin-top:20px;
  background-color: #FF585D;
  opacity:0;
  visibility:hide;
  transition: all 0.5s;
  z-index:-1;
  @media only screen and (max-width: 740px) {
    display:none;
  }
`;

const ActivitySearchBoxPopUpTable = styled.table`
  width:100%;
  border-radius:10px;
`;
const ActivitySearchBoxPopUpTd = styled.td`
  cursor:pointer;
`;
const ActivitySearchBoxPopUpCategoryTop = styled.div`
  margin-left:20px;
  margin-bottom:15px;
  margin-top:20px;
  color:white;
  font-size:14px;
  font-weight:600;
  width:120px;
`;
const ActivitySearchBoxPopUpCategory = styled.div`
  margin-left:20px;
  margin-bottom:15px;
  margin-top:15px;
  color:white;
  font-size:14px;
  font-weight:600;
  width:120px;
`;
const ActivitySearchBoxPopUpCategoryBottom = styled.div`
  margin-left:20px;
  margin-bottom:20px;
  margin-top:15px;
  color:white;
  font-size:14px;
  font-weight:600;
  width:120px;
`;
const ActivitySearchBoxPopUpTdMargin10 = styled.td`
  width:10px;
`;
const ActivitySearchBoxPopUpDivMargin10 = styled.div`
  width:10px;
  background-color:white;
`;
const ActivitySearchBoxPopUpPointerTd = styled.td`
  background-color:white;
  width:10px;
`;
const ActivitySearchBoxPopUpPointerImage = styled.img`
  height:16px;
  width:10px;
  display:none;
`;
const ActivitySearchBoxPopUpActivityTable = styled.table`
  display:none;
`;
const ActivitySearchBoxPopUpActivityTableDiv = styled.div`
  overflow-x: scroll;
  width:540px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ActivitySearchBoxPopUpActivityTableTd = styled.td`
  background-color:white;
  width:100%;
  border-top-right-radius:10px;
  border-bottom-right-radius:10px;
`;
const ActivitySearchBoxPopUpColWidth50 = styled.col`
  width:50%;
`;
const ActivitySearchBoxPopUpActivityBox = styled.div`
  margin-left:10px;
  margin-right:5px;
  margin-top:10px;
  margin-bottom:10px;
  color:black;
  cursor: pointer;
  border-radius:30px;
  width: 300px;
  box-shadow: 0px 0px 12px 5px rgba(0,0,0,0.10);
`;
const ActivitySearchBoxPopUpActivityBox2 = styled.div`
  margin-left:5px;
  margin-right:10px;
  margin-top:10px;
  margin-bottom:10px;
  color:black;
  cursor: pointer;
  border-radius:30px;
  width: 300px;
  box-shadow: 0px 0px 12px 5px rgba(0,0,0,0.10);
  width: 300px;
`;
const ActivitySearchBoxPopUpActivityInner = styled.div`
  position: relative;
  width: 100%;
  padding-top: 50%;
`;
const ActivitySearchBoxPopUpActivityImageCover = styled.div`
  background-image: url(${img});
  background-size: cover;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const ActivitySearchBoxPopUpActivityBottom = styled.div`
  background-color:white;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  padding:10px 20px 10px 20px;
  color:black;
`;

const ActivitySearchBoxPopUpActivityBottomIcon = styled.img`
  display:inline;
  width:10px;
`;

const ActivitySearchBoxPopUpActivityBottomText1 = styled.p`
  display:inline;
  font-size: 12px;
  margin-left:5px;
  color: #FF585D;
  font-weight:700;
`;
const ActivitySearchBoxPopUpActivityBottomText2 = styled.p`
  font-size: 18px;
  font-weight:600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ActivitySearchBoxPopUpActivityBottomText3 = styled.p`
  display:inline;
  font-size: 12px;
`;

const ActivitySearchBoxPopUpCategoryMargin = styled.div`
  background-color:white;
  height:1px;
  width:140px;
`;
const ActivitySearchBoxPopUpCategoryMargin2 = styled.td`
  background-color:white;
`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).click(async function(event) {
  var $target = $(event.target);
  if(!$target.closest('#searchInput').length && !$target.closest('#searchPopup').length &&
  $('#searchPopup').is(":visible")) {
    $("#searchPopup").css("opacity", "0");
    $("#searchPopup").css("visibility", "hide");
    $('#searchPopup').css("marginTop", "20px");
    $('#searchPopup').css("zIndex", "-1");
    await sleep(500);
    hidePointer();
    hideTable();
    $('#popup_pointer_1').css("display", "block");
    $('#popup_table_1').css("display", "block");
  }
});

function hidePointer(){
  $('#popup_pointer_1').hide();
  $('#popup_pointer_2').hide();
  $('#popup_pointer_3').hide();
  $('#popup_pointer_4').hide();
  $('#popup_pointer_5').hide();
}
function hideTable(){
  $('#popup_table_1').hide();
  $('#popup_table_2').hide();
  $('#popup_table_3').hide();
  $('#popup_table_4').hide();
  $('#popup_table_5').hide();
}

function ActivitySearchBox({id,activity_id}) {

  useEffect(() => {
    $("#searchInput").click(function() {
      $("#searchPopup").css("opacity", "1");
      $("#searchPopup").css("visibility", "visible");
      $('#searchPopup').css("marginTop", "0px");
      $('#searchPopup').css("zIndex", "1");
      hidePointer();
      hideTable();
      $('#popup_pointer_1').css("display", "block");
      $('#popup_table_1').css("display", "block");
    });
    $( "#popup_btn_1").hover(function(){ hidePointer(); hideTable(); $('#popup_pointer_1').css("display", "block"); $('#popup_table_1').css("display", "block"); });
    $( "#popup_btn_2").hover(function(){ hidePointer(); hideTable(); $('#popup_pointer_2').css("display", "block"); $('#popup_table_2').css("display", "block"); });
    $( "#popup_btn_3").hover(function(){ hidePointer(); hideTable(); $('#popup_pointer_3').css("display", "block"); $('#popup_table_3').css("display", "block"); });
    $( "#popup_btn_4").hover(function(){ hidePointer(); hideTable(); $('#popup_pointer_4').css("display", "block"); $('#popup_table_4').css("display", "block"); });
    $( "#popup_btn_5").hover(function(){ hidePointer(); hideTable(); $('#popup_pointer_5').css("display", "block"); $('#popup_table_5').css("display", "block"); });
  }, []);

  // activity card content
  return (

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
                    <ChillfulSearchInputBar id="searchInput" placeholder="Anything you wanna try and do?"></ChillfulSearchInputBar>
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

        <ActivitySearchBoxPopUpDiv id="searchPopup">

          <ActivitySearchBoxPopUpTable cellSpacing="0" cellPadding="0">
            <tbody>
              <tr>
                <ActivitySearchBoxPopUpTd id="popup_btn_1">
                  <ActivitySearchBoxPopUpCategoryTop>Arts & Crafts</ActivitySearchBoxPopUpCategoryTop>
                </ActivitySearchBoxPopUpTd>
                <ActivitySearchBoxPopUpTdMargin10><ActivitySearchBoxPopUpDivMargin10></ActivitySearchBoxPopUpDivMargin10></ActivitySearchBoxPopUpTdMargin10>
                <ActivitySearchBoxPopUpPointerTd>
                  <div>
                    <ActivitySearchBoxPopUpPointerImage id="popup_pointer_1" src={require("../images/general/tiangle_chillful.png")}></ActivitySearchBoxPopUpPointerImage>
                  </div>
                </ActivitySearchBoxPopUpPointerTd>
                <ActivitySearchBoxPopUpActivityTableTd rowSpan="9">

                  <ActivitySearchBoxPopUpActivityTableDiv>

                    <ActivitySearchBoxPopUpActivityTable id="popup_table_1">
                      <tbody>
                        <tr>
                          <td>
                            <ActivitySearchBoxPopUpActivityBox>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox>
                          </td>

                          <td>
                            <ActivitySearchBoxPopUpActivityBox2>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox2>
                          </td>

                          <td>
                            <ActivitySearchBoxPopUpActivityBox2>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox2>
                          </td>

                        </tr>
                      </tbody>
                    </ActivitySearchBoxPopUpActivityTable>

                    <ActivitySearchBoxPopUpActivityTable id="popup_table_2">
                      <tbody>
                        <tr>
                          <td>
                            <ActivitySearchBoxPopUpActivityBox>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox>
                          </td>

                          <td>
                            <ActivitySearchBoxPopUpActivityBox2>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox2>
                          </td>

                          <td>
                            <ActivitySearchBoxPopUpActivityBox2>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox2>
                          </td>

                        </tr>
                      </tbody>
                    </ActivitySearchBoxPopUpActivityTable>

                    <ActivitySearchBoxPopUpActivityTable id="popup_table_3">
                      <tbody>
                        <tr>
                          <td>
                            <ActivitySearchBoxPopUpActivityBox>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox>
                          </td>

                          <td>
                            <ActivitySearchBoxPopUpActivityBox2>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox2>
                          </td>

                          <td>
                            <ActivitySearchBoxPopUpActivityBox2>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox2>
                          </td>

                        </tr>
                      </tbody>
                    </ActivitySearchBoxPopUpActivityTable>

                    <ActivitySearchBoxPopUpActivityTable id="popup_table_4">
                      <tbody>
                        <tr>
                          <td>
                            <ActivitySearchBoxPopUpActivityBox>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox>
                          </td>

                          <td>
                            <ActivitySearchBoxPopUpActivityBox2>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox2>
                          </td>

                          <td>
                            <ActivitySearchBoxPopUpActivityBox2>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox2>
                          </td>

                        </tr>
                      </tbody>
                    </ActivitySearchBoxPopUpActivityTable>

                    <ActivitySearchBoxPopUpActivityTable id="popup_table_5">
                      <tbody>
                        <tr>
                          <td>
                            <ActivitySearchBoxPopUpActivityBox>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox>
                          </td>

                          <td>
                            <ActivitySearchBoxPopUpActivityBox2>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox2>
                          </td>

                          <td>
                            <ActivitySearchBoxPopUpActivityBox2>
                              <ActivitySearchBoxPopUpActivityInner>
                                <ActivitySearchBoxPopUpActivityImageCover></ActivitySearchBoxPopUpActivityImageCover>
                              </ActivitySearchBoxPopUpActivityInner>
                              <ActivitySearchBoxPopUpActivityBottom>
                                <ActivitySearchBoxPopUpActivityBottomIcon src={require("../images/general/chillful_icon_original.png")}></ActivitySearchBoxPopUpActivityBottomIcon>
                                <ActivitySearchBoxPopUpActivityBottomText1>ARTS & CRAFTS</ActivitySearchBoxPopUpActivityBottomText1>
                                <ActivitySearchBoxPopUpActivityBottomText2>Handmade Necklace Workshop by HK Neckie</ActivitySearchBoxPopUpActivityBottomText2>
                                <ActivitySearchBoxPopUpActivityBottomText3>Necklace Class ● 3 hours</ActivitySearchBoxPopUpActivityBottomText3>
                              </ActivitySearchBoxPopUpActivityBottom>
                            </ActivitySearchBoxPopUpActivityBox2>
                          </td>

                        </tr>
                      </tbody>
                    </ActivitySearchBoxPopUpActivityTable>

                  </ActivitySearchBoxPopUpActivityTableDiv>



                </ActivitySearchBoxPopUpActivityTableTd>

              </tr>

              <tr>
                <td colSpan="2"><ActivitySearchBoxPopUpCategoryMargin></ActivitySearchBoxPopUpCategoryMargin></td>
                <ActivitySearchBoxPopUpCategoryMargin2></ActivitySearchBoxPopUpCategoryMargin2>
              </tr>

              <tr>
                <ActivitySearchBoxPopUpTd id="popup_btn_2">
                  <ActivitySearchBoxPopUpCategory>Active Fitness</ActivitySearchBoxPopUpCategory>
                </ActivitySearchBoxPopUpTd>
                <ActivitySearchBoxPopUpTdMargin10><ActivitySearchBoxPopUpDivMargin10></ActivitySearchBoxPopUpDivMargin10></ActivitySearchBoxPopUpTdMargin10>
                <ActivitySearchBoxPopUpPointerTd>
                  <div>
                    <ActivitySearchBoxPopUpPointerImage id="popup_pointer_2" src={require("../images/general/tiangle_chillful.png")}></ActivitySearchBoxPopUpPointerImage>
                  </div>
                </ActivitySearchBoxPopUpPointerTd>
              </tr>

              <tr>
                <td colSpan="2"><ActivitySearchBoxPopUpCategoryMargin></ActivitySearchBoxPopUpCategoryMargin></td>
                <ActivitySearchBoxPopUpCategoryMargin2></ActivitySearchBoxPopUpCategoryMargin2>
              </tr>

              <tr>
                <ActivitySearchBoxPopUpTd id="popup_btn_3">
                  <ActivitySearchBoxPopUpCategory>Body Wellness</ActivitySearchBoxPopUpCategory>
                </ActivitySearchBoxPopUpTd>
                <ActivitySearchBoxPopUpTdMargin10><ActivitySearchBoxPopUpDivMargin10></ActivitySearchBoxPopUpDivMargin10></ActivitySearchBoxPopUpTdMargin10>
                <ActivitySearchBoxPopUpPointerTd>
                  <div>
                    <ActivitySearchBoxPopUpPointerImage id="popup_pointer_3" src={require("../images/general/tiangle_chillful.png")}></ActivitySearchBoxPopUpPointerImage>
                  </div>
                </ActivitySearchBoxPopUpPointerTd>
              </tr>

              <tr>
                <td colSpan="2"><ActivitySearchBoxPopUpCategoryMargin></ActivitySearchBoxPopUpCategoryMargin></td>
                <ActivitySearchBoxPopUpCategoryMargin2></ActivitySearchBoxPopUpCategoryMargin2>
              </tr>

              <tr>
                <ActivitySearchBoxPopUpTd id="popup_btn_4">
                  <ActivitySearchBoxPopUpCategory>More Than Food</ActivitySearchBoxPopUpCategory>
                </ActivitySearchBoxPopUpTd>
                <ActivitySearchBoxPopUpTdMargin10><ActivitySearchBoxPopUpDivMargin10></ActivitySearchBoxPopUpDivMargin10></ActivitySearchBoxPopUpTdMargin10>
                <ActivitySearchBoxPopUpPointerTd>
                  <div>
                    <ActivitySearchBoxPopUpPointerImage id="popup_pointer_4" src={require("../images/general/tiangle_chillful.png")}></ActivitySearchBoxPopUpPointerImage>
                  </div>
                </ActivitySearchBoxPopUpPointerTd>
              </tr>

              <tr>
                <td colSpan="2"><ActivitySearchBoxPopUpCategoryMargin></ActivitySearchBoxPopUpCategoryMargin></td>
                <ActivitySearchBoxPopUpCategoryMargin2></ActivitySearchBoxPopUpCategoryMargin2>
              </tr>

              <tr>
                <ActivitySearchBoxPopUpTd id="popup_btn_5">
                  <ActivitySearchBoxPopUpCategoryBottom>Go Out & Discover</ActivitySearchBoxPopUpCategoryBottom>
                </ActivitySearchBoxPopUpTd>
                <ActivitySearchBoxPopUpTdMargin10><ActivitySearchBoxPopUpDivMargin10></ActivitySearchBoxPopUpDivMargin10></ActivitySearchBoxPopUpTdMargin10>
                <ActivitySearchBoxPopUpPointerTd>
                  <div>
                    <ActivitySearchBoxPopUpPointerImage id="popup_pointer_5" src={require("../images/general/tiangle_chillful.png")}></ActivitySearchBoxPopUpPointerImage>
                  </div>
                </ActivitySearchBoxPopUpPointerTd>
              </tr>

            </tbody>
          </ActivitySearchBoxPopUpTable>

        </ActivitySearchBoxPopUpDiv>
      </ChillfulSearchBox>
    </ChillfulSearchBoxFrame>
  );

}


export default ActivitySearchBox;

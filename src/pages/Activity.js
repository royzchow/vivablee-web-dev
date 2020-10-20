import React, { useState, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivitySearchBox from "../components/ActivitySearchBox";
import Menu from "../components/Menu";
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import img from '../images/chillful/event_1.jpg';
import { db } from "../firebase";
import Slider from 'infinite-react-carousel';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


// define js function
function minus_quality(id) {
  var q = parseInt($("#"+id+"Quantity").val(),10);
  if(q > 0){
    $("#"+id+"Quantity").val(q-1);
  }
}
function plus_quality(id) {
  var q = parseInt($("#"+id+"Quantity").val(),10);
  $("#"+id+"Quantity").val(q+1);
}

$(document).click(async function(event) {
  var $target = $(event.target);
  if(!$target.closest('#calendar').length && !$target.closest('#calendarBtn').length &&
  $('#calendar').is(":visible")) {
    $("#calendar").css("opacity", "0");
    $("#calendar").css("visibility", "hide");
    $('#calendar').css("zIndex", "-1");
  }
});

// define css class
const ActivityBannerDiv = styled.div`
  height:600px;
  margin-top:50px;
  margin-left:100px;
  margin-right:100px;
`;
const ActivityBanner = styled.div`
  background-image: url(${img});
  height:500px;
  background-size: cover;
  background-position: center;
  cursor:pointer;
`;
const ActivityMap = styled.div`
  margin-left:100px;
  margin-right:100px;
`;
const ActivityMapArrow = styled.img`
  margin-top:4px;
  margin-left:5px;
  margin-right:4px;
  height:10px;
`;
const ActivityMapText = styled.span`
  color:#FF585D;;
`;
const ActivityDetailDiv = styled.div`
  margin-left:100px;
  margin-right:100px;
`;
const ActivityDetailTable = styled.table`
  width:100%;
`;
const ActivityDetailTableHeading = styled.h1`
  font-size:36px;
`;
const ActivityDetailTableStart = styled.img`
  height:16px;
  margin-right:3px;
  margin-bottom:-1px;
`;
const ActivityDetailTableRating = styled.span`
  color:#ffc107
`;
const ActivityDetailTableReviewDiv = styled.div`
  font-size:16px
`;
const ActivityDetailTableReview = styled.span`
  margin-left:5px;
  margin-right:5px;
`;
const ActivityDetailTableReview2 = styled.span`
  color:#777
`;
const ActivityDetailTableReview3 = styled.span`
  margin-left:5px;
  margin-right:5px;
  color:#777
`;
const ActivityDetailTableSpacing = styled.div`
  width:100%;
  height:1px;
  background-color:#DDD;
  margin-top:20px;
  margin-bottom:20px;
`;
const ActivityDetailTableDiv2 = styled.div`
  line-height:36px;
`;
const ActivityDetailTableDiv2Text = styled.span`
  margin-right:20px
`;
const ActivityDetailTableDiv3 = styled.div`
  line-height:24px;
  font-size:14px;
`;
const ActivityDetailTableDiv3Text = styled.span`
  margin-right:10px
`;
const ActivityDetailTableTdMargin60 = styled.div`
  width:60px;
`;
const ActivityDetailTableTdTop = styled.td`
  vertical-align:top;
  width:100%;
`;
const ActivityDetailTableDiscount = styled.div`
  width:260px;
  padding:30px;
  border-radius:5px;
  box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.10);
`;
const ActivityDetailTableDiscountTitle = styled.span`
  color:#FF585D;
  font-weight:600;
`;
const ActivityDetailTableDiscountPrice = styled.span`
  font-size:22px;
  font-weight:bold;
`;
const ActivityDetailTableDiscountText = styled.div`
  font-size:14px;
  line-height:24px;
`;
const ActivityDetailTableMobile = styled.div`
  width:260px;
  padding:28px;
  border-radius:5px;
  box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.10);
  font-size:14px;
  margin-top:40px;
`;
const ActivityDetailTableMobileImage = styled.img`
  height:40px;
`;
const ActivityPackageOption = styled.div`

  padding-top:60px;
  width:100%;
`;
const ActivityPackageOptionChillfulImg = styled.img`
  width:25px;
  margin-right:10px;
  margin-bottom:-2px;
`;
const ActivityPackageOptionTitle = styled.h1`
  font-size:30px;
  display:inline;
`;
const ActivityPackageOptionTitleMargin = styled.div`
  height:25px;
`;
const ActivityPackageOptionTable = styled.table`
  width:100%;
`;
const ActivityPackageOptionTableTd = styled.td`
  width:100%;
  vertical-align:top;
`;
const ActivityPackageOptionTableDiv = styled.div`
  background-color:#f9f9f9;
  width:100%
`;
const ActivityPackageOptionTableDivInner = styled.div`
  padding:30px;
`;
const ActivityPackageOptionTableSubTitle = styled.p`
  font-weight:bold;
  font-size:20px
`;
const ActivityPackageOptionTableSubTitle1 = styled.p`
  margin-top:30px;
  font-size:16px;
`;
const ActivityPackageOptionTableCalendarDiv = styled.div`
  position:absolute;
  box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.10);
  margin-top:10px;
  opacity:0;
  visibility:hide;
  transition: all 0.5s;
  z-index:-1;
`;
const ActivityPackageOptionTablePackage = styled.div`
  width:100%;
  border:solid 2px #ddd;
  margin-top:10px;
  cursor:pointer;
  background-color:white;
  :hover{
    border:solid 2px #FF585D;
  }
`;
const ActivityPackageOptionTablePackageInner = styled.div`
  padding:8px;
  cursor:pointer;
`;
const ActivityPackageOptionTableQuantity = styled.div`
  width:100%;
  margin-top:10px;
  background-color:white;
`;
const ActivityPackageOptionTableQuantityInner = styled.div`
  padding:20px;
`;
const ActivityPackageOptionTableQuantityDisplayInline = styled.div`
  display:inline;
`;
const ActivityPackageOptionTableQuantityPrice = styled.div`
  float:right;
`;
const ActivityPackageOptionTableQuantityPriceAmount = styled.span`
  margin-right:20px;
  color:#FF585D;
  font-weight:bold
`;
const ActivityPackageOptionTableQuantityPriceMinus = styled.span`
  margin-right:-1px;
  padding:2px 10px 3px 10px;
  border:solid 1px #bbb;
  cursor:pointer;
  background-color:#f9f9f9;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
`;
const ActivityPackageOptionTableQuantityPriceQuantity = styled.input`
  margin-right:-1px;
  padding:4px 4px 4px 4px;
  border:solid 1px #bbb;
  background-color:white;
  font-size:14px;
  width:50px;
  text-align: center;
  :focus {
    outline-width: 0;
}
`;
const ActivityPackageOptionTableQuantityPricePlus = styled.span`
  padding:2px 10px 3px 10px;
  border:solid 1px #bbb;
  cursor:pointer;
  background-color:#f9f9f9
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
`;
const ActivityPackageOptionTableTotleAmountTitle = styled.span`
  font-size:20px;
  font-weight:bold;
  margin-right:5px;
  margin-left:10px;
`;
const ActivityPackageOptionTableTotleAmountTitleTopMargin = styled.div`
  height:40px;
`;
const ActivityPackageOptionTableTotleAmount = styled.span`
  font-size:20px;
  color:#FF585D
`;
const ActivityPackageOptionTableAddToCartBtn = styled.div`
  float:right;
  margin-right:160px;
  margin-top:-8px;
`;
const ActivityPackageOptionTableTdTop = styled.td`
  vertical-align:top;
`;
const ActivityPackageOptionTablePackageDetail = styled.div`
  width:260px;
  padding:30px;
  border-radius:5px;
  box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.10);
`;
const ActivityPackageOptionTablePackageDetailTitle = styled.span`
  color:#FF585D;
  font-weight:600;
`;
const ActivityPackageOptionTablePackageDetailOption = styled.div`
  font-size:14px; line-height:24px;
`;
const ActivityPackageOptionTablePackageDetailOptionText1 = styled.span`
  text-decoration:underline;
  cursor:pointer
`;
const ActivityPackageOptionTablePackageDetailOptionText2 = styled.span`
  cursor:pointer
`;
const ActivityPackageOptionTablePackageDetailChillfulIcon = styled.img`
  width:18px; margin-right:5px; margin-bottom:-2px;
`;
const ActivityPackageOptionTablePackageDetailOptionHeading = styled.h1`
  font-size:18px;
  display:inline;
`;
const ActivityPackageOptionTablePackageDetailOptionDiv = styled.div`
  font-size:14px;
`;
const ActivityPackageOptionTablePackageDetailOptionDivText1 = styled.p`
  margin-top:20px;
  font-weight:bold;
  font-size:16px;
  margin-bottom:10px;
`;
const ActivityPackageOptionTablePackageDetailOptionDivMargin10 = styled.span`
  margin-right:10px;
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
const ChillfulActivityListStyle2Arrow = styled.img`
  height:16px;
  vertical-align: middle;
  margin-bottom:6px;
  margin-top:4px;
  margin-left:5px;
`;
const ChillfulMargin40 = styled.div`
  height:40px;
`;
const ChillfulBannerBtn = styled.div`
  margin-top:15px;
  background-color:#FF585D;
  padding:10px 20px 10px 20px;
  width:135px;
  border-radius:50px;
  cursor:pointer;
`;
const ChillfulBannerBtnIcon = styled.img`
  width:12px;
  vertical-align:middle;
  margin-bottom:2px;
  margin-right:4px;
`;
const ChillfulBannerBtnText = styled.span`
  margin-left:5px;
  font-size:14px;
  color:white;
  font-weight:600;
`;
const ChillfulTimeslotsDiv = styled.div`
  width:100%;
  border:solid 2px #ddd;
  margin-top:10px;cursor:pointer;
  background-color:white;
  :hover{
    border:solid 2px #FF585D;
  }
`;
const ChillfulTimeslotsInnerDiv = styled.div`
  padding: 8px;
  cursor:pointer;
`;

function Activity() {

  const [chillfulActivityTitle, setChillfulActivityTitle] = useState("");
  const [chillfulActivityDescription, setChillfulActivityDescription] = useState("");
  const [chillfulActivityCategory, setChillfulActivityCategory] = useState("");
  const [chillfulActivitySubCategory, setChillfulActivitySubCategory] = useState("");
  const [chillfulActivityImagesSmall, setChillfulActivityImagesSmall] = useState("");
  const [chillfulActivityImagesLarge, setChillfulActivityImagesLarge] = useState("");
  const [chillfulActivityCurrency, setChillfulActivityCurrency] = useState("");
  const [chillfulActivityPrice, setChillfulActivityPrice] = useState("");
  const [chillfulActivityCalendar, setChillfulActivityCalendar] = useState([]);

  useEffect(() => {



    // to get the information for activity
    db.collection("chillfulActivities").doc('12DxUVuZ8qwC3xLvbv16')
      .get()
      .then( doc => {
        const data = doc.data()
        setChillfulActivityTitle(data['title']);
        setChillfulActivityDescription(data['description']);
        setChillfulActivityCategory(data['category']);
        setChillfulActivitySubCategory(data['subCategory']);
        setChillfulActivityImagesSmall(data['imagesSmall']);
        setChillfulActivityImagesLarge(data['imagesLarge']);
        setChillfulActivityCurrency(data['currency']);
        setChillfulActivityPrice(data['price']);
    });

    const availableDates = [];
    db.collection("chillfulActivities").doc('12DxUVuZ8qwC3xLvbv16').collection('timeslots')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          // to convert the dattimeFrom to date and to numeric date and append to availableDates Array
          availableDates.push(doc.data()['datetimeFrom'].toDate().setHours(0,0,0,0))
        });

        // to push disable date to an array
        var lastDate = new Date(Math.max.apply(null,availableDates));
        var today = new Date();
        var disabledDates = [];
        for (var d = today; d <= lastDate; d.setDate(d.getDate() + 1)) {
          var DateOfOrder = new Date(d).setHours(0,0,0,0);
          if ($.inArray(DateOfOrder, availableDates) <= -1) {
            disabledDates.push(new Date(d));
          }
        }

        // to show the calendar after click
        $("#calendarBtn").click(function() {
          $("#calendar").css("opacity", "1");
          $("#calendar").css("visibility", "visible");
          $('#calendar').css("zIndex", "1");
          setChillfulActivityCalendar([]);
          setChillfulActivityCalendar([...chillfulActivityCalendar,
            <Calendar
              minDate = {new Date()}
              maxDate = {lastDate}
              tileDisabled={({activeStartDate, date, view}) =>
                disabledDates.some(disabledDate =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getDate() === disabledDate.getDate()
              )}
              minDetail = "month"
              calendarType = "US"
              onClickDay = {(date) =>  chooseTime(date) }
            />
          ])
        });

    });

  }, []);

  const [items, setItems] = useState([]);

  function chooseTime(date) {

    $("#calendar").css("opacity", "0");
    $("#calendar").css("visibility", "hide");
    $('#calendar').css("zIndex", "-1");
    var startDate = date.setHours(0,0,0,0);
    var startDatePlusOne = date.setDate(date.getDate() + 1);
    db.collection("chillfulActivities").doc('12DxUVuZ8qwC3xLvbv16').collection('timeslots')
      .get()
      .then((snapshot) => {
        var d = [];
        snapshot.docs.forEach(doc => {
          var eventDate = doc.data()['datetimeFrom'].toDate().setHours(0,0,0,0);
          if(eventDate >= startDate && eventDate < startDatePlusOne){
            d.push({
              id: doc.id,
              value: doc.data()["datetimeFrom"].toDate().toString()
            });
          }

        });
      setItems(d);
    });
  }

  const [packages, setPackages] = useState([]);

  function chooseTimeslot(id){
    db.collection("chillfulActivities").doc('12DxUVuZ8qwC3xLvbv16').collection('timeslots').doc(id).collection('packages')
      .get()
      .then((snapshot) => {
        var p = [];
        snapshot.docs.forEach(doc => {
          p.push({
            id: doc.id,
            timeslots_id: id,
            packageName: doc.data()["packageName"]
          });
        });
      setPackages(p);
    });
  }

  const [targets, setTargets] = useState([]);

  function choosePackage(timeslots_id, id){
    db.collection("chillfulActivities").doc('12DxUVuZ8qwC3xLvbv16').collection('timeslots').doc(timeslots_id).collection('packages').doc(id).collection('targets')
      .get()
      .then((snapshot) => {
        var t = [];
        snapshot.docs.forEach(doc => {
          t.push({
            id: doc.id,
            target: doc.data()["target"]
          });
        });
      setTargets(t);
    });
  }

  function timeslotsClick(id){

    $(".ChillfulTimeslotsDiv").css("border", "solid 2px #ddd"); // to reset the border to be grey
    $(".ChillfulTimeslotsDiv").unbind('mouseenter mouseleave'); // to reset the hover effect for each button

    // to add the hover effect for all button except the clicked one
    $( ".ChillfulTimeslotsDiv" ).each(function( index ) {
      if($(this).attr('id') != id){
        $( this ).hover(
          function(){ $(this).css("border", "solid 2px #FF585D"); },
          function(){ $(this).css("border", "solid 2px #ddd");
        });
      }
    });

    $("#" + id).css("border", "solid 2px #FF585D"); // to add the css for the clicked button

  }

  function packagesClick(id){

    $(".ActivityPackageOptionTablePackage").css("border", "solid 2px #ddd"); // to reset the border to be grey
    $(".ActivityPackageOptionTablePackage").unbind('mouseenter mouseleave'); // to reset the hover effect for each button

    // to add the hover effect for all button except the clicked one
    $( ".ActivityPackageOptionTablePackage" ).each(function( index ) {
      if($(this).attr('id') != id){
        $( this ).hover(
          function(){ $(this).css("border", "solid 2px #FF585D"); },
          function(){ $(this).css("border", "solid 2px #ddd");
        });
      }
    });

    $("#" + id).css("border", "solid 2px #FF585D"); // to add the css for the clicked button

  }

  return (
    <div style={{width: "100%"}}>

      <Menu page={"chillful"} shadow />

      <ActivityBannerDiv>
        <Slider dots>
          <ActivityBanner></ActivityBanner>
          <ActivityBanner></ActivityBanner>
        </Slider>
      </ActivityBannerDiv>

      <ActivityMap>
        Chillful
        <ActivityMapArrow src={require("../images/general/arrow_right_black.png")}></ActivityMapArrow>
        Active Fitness
        <ActivityMapArrow src={require("../images/general/arrow_right_black.png")}></ActivityMapArrow>
        <ActivityMapText>Yoga Class</ActivityMapText>
      </ActivityMap>

      <ActivityDetailDiv>
        <ActivityDetailTable>
          <tbody>
            <tr>
              <ActivityDetailTableTdTop>
                <ActivityDetailTableHeading>Aerial Yoga taster with Emma in CWB</ActivityDetailTableHeading>

                <ActivityDetailTableReviewDiv>
                  <ActivityDetailTableStart src={require("../images/chillful/star.png")}></ActivityDetailTableStart>
                  <ActivityDetailTableRating>4.8</ActivityDetailTableRating>
                  <ActivityDetailTableReview>(24 reviews)</ActivityDetailTableReview>
                  <ActivityDetailTableReview2>|</ActivityDetailTableReview2>
                  <ActivityDetailTableReview3>200+ Booked</ActivityDetailTableReview3>
                </ActivityDetailTableReviewDiv>

                <ActivityDetailTableSpacing></ActivityDetailTableSpacing>

                <ActivityDetailTableDiv2>
                  <ActivityDetailTableDiv2Text>7-day free cancellation</ActivityDetailTableDiv2Text>
                  <ActivityDetailTableDiv2Text>Group Discount</ActivityDetailTableDiv2Text>
                  <ActivityDetailTableDiv2Text>5-min from Mtr station</ActivityDetailTableDiv2Text>
                </ActivityDetailTableDiv2>

                <ActivityDetailTableSpacing></ActivityDetailTableSpacing>

                <ActivityDetailTableDiv3>
                  <ActivityDetailTableDiv3Text>•</ActivityDetailTableDiv3Text> Build up your body shape<br />
                  <ActivityDetailTableDiv3Text>•</ActivityDetailTableDiv3Text> Try one of the most exciting and in-trend ways to stay fit and active<br />
                  <ActivityDetailTableDiv3Text>•</ActivityDetailTableDiv3Text> 1.5 hours trial. Commitment-free.<br />
                </ActivityDetailTableDiv3>

                <ActivityDetailTableSpacing></ActivityDetailTableSpacing>

              </ActivityDetailTableTdTop>

              <td><ActivityDetailTableTdMargin60></ActivityDetailTableTdMargin60></td>

              <ActivityDetailTableTdTop>
                <ActivityDetailTableDiscount>
                  <ActivityDetailTableDiscountTitle>Vivablee Discount</ActivityDetailTableDiscountTitle><br />
                  <ActivityDetailTableDiscountPrice>HKD100 / person</ActivityDetailTableDiscountPrice>
                  <ActivityDetailTableDiscountText>
                    Available Tomorrow for Hand Craft class<br />
                    24 Hours Confirmation for return policy
                  </ActivityDetailTableDiscountText>
                </ActivityDetailTableDiscount>

                <ActivityDetailTableMobile>
                  <table>
                    <tbody>
                      <tr>
                        <td><ActivityDetailTableMobileImage src={require("../images/general/download_mobile.png")}></ActivityDetailTableMobileImage></td>
                        <td>Get HK$10 off your first booking in the app with promo code mobile10</td>
                      </tr>
                    </tbody>
                  </table>
                </ActivityDetailTableMobile>
              </ActivityDetailTableTdTop>

            </tr>
          </tbody>
        </ActivityDetailTable>

        <ActivityPackageOption>

          <ActivityPackageOptionChillfulImg src={require("../images/general/chillful_icon_original.png")}></ActivityPackageOptionChillfulImg>
          <ActivityPackageOptionTitle>Package options</ActivityPackageOptionTitle>

          <ActivityPackageOptionTitleMargin></ActivityPackageOptionTitleMargin>

          <ActivityPackageOptionTable>
            <tbody>
              <tr>
                <ActivityPackageOptionTableTd>

                  <ActivityPackageOptionTableDiv>

                    <ActivityPackageOptionTableDivInner>

                      <ActivityPackageOptionTableSubTitle>Select date and package options</ActivityPackageOptionTableSubTitle>

                      <ActivityPackageOptionTableSubTitle1>Please select the date you are available</ActivityPackageOptionTableSubTitle1>

                      <ChillfulBannerBtn id="calendarBtn">
                        <ChillfulBannerBtnIcon src={require("../images/general/play_white.png")}></ChillfulBannerBtnIcon>
                        <ChillfulBannerBtnText>Check Availability</ChillfulBannerBtnText>
                      </ChillfulBannerBtn>

                      <ActivityPackageOptionTableCalendarDiv id="calendar">
                        { chillfulActivityCalendar }
                      </ActivityPackageOptionTableCalendarDiv>

                      {items.map(item => (
                        <ChillfulTimeslotsDiv className="ChillfulTimeslotsDiv" id={item.id} onClick={() => timeslotsClick(item.id)}>
                          <ChillfulTimeslotsInnerDiv onClick={() => chooseTimeslot(item.id)}>
                            {item.value}
                          </ChillfulTimeslotsInnerDiv>
                        </ChillfulTimeslotsDiv>
                      ))}

                      <ActivityPackageOptionTableSubTitle1>Please choose the package type</ActivityPackageOptionTableSubTitle1>

                      {packages.map(item => (
                        <ActivityPackageOptionTablePackage className="ActivityPackageOptionTablePackage" id={item.id} onClick={() => packagesClick(item.id)}>
                          <ActivityPackageOptionTablePackageInner onClick={() => choosePackage(item.timeslots_id,item.id)}>
                            {item.packageName}
                          </ActivityPackageOptionTablePackageInner>
                        </ActivityPackageOptionTablePackage>
                      ))}

                      <ActivityPackageOptionTableSubTitle1>Please input the quantity for the package</ActivityPackageOptionTableSubTitle1>

                      {targets.map(item => (
                        <ActivityPackageOptionTableQuantity>
                          <ActivityPackageOptionTableQuantityInner>
                            <ActivityPackageOptionTableQuantityDisplayInline>
                              {item.target}
                            </ActivityPackageOptionTableQuantityDisplayInline>
                            <ActivityPackageOptionTableQuantityPrice>
                              <ActivityPackageOptionTableQuantityPriceAmount>HKD100.00</ActivityPackageOptionTableQuantityPriceAmount>
                              <ActivityPackageOptionTableQuantityPriceMinus onClick={() => minus_quality(item.target)}>-</ActivityPackageOptionTableQuantityPriceMinus>
                              <ActivityPackageOptionTableQuantityPriceQuantity defaultValue="0" id={item.target + "Quantity"}></ActivityPackageOptionTableQuantityPriceQuantity>
                              <ActivityPackageOptionTableQuantityPricePlus onClick={() => plus_quality(item.target)}>+</ActivityPackageOptionTableQuantityPricePlus>
                            </ActivityPackageOptionTableQuantityPrice>
                          </ActivityPackageOptionTableQuantityInner>
                        </ActivityPackageOptionTableQuantity>
                      ))}

                      <ActivityPackageOptionTableTotleAmountTitleTopMargin></ActivityPackageOptionTableTotleAmountTitleTopMargin>

                      <ActivityPackageOptionTableTotleAmountTitle>Total Amount: </ActivityPackageOptionTableTotleAmountTitle>
                      <ActivityPackageOptionTableTotleAmount>HKD180.00</ActivityPackageOptionTableTotleAmount>

                      <ActivityPackageOptionTableAddToCartBtn>

                      </ActivityPackageOptionTableAddToCartBtn>


                    </ActivityPackageOptionTableDivInner>

                  </ActivityPackageOptionTableDiv>

                </ActivityPackageOptionTableTd>

                <td><ActivityDetailTableTdMargin60></ActivityDetailTableTdMargin60></td>

                <ActivityPackageOptionTableTdTop>
                  <ActivityPackageOptionTablePackageDetail>
                    <ActivityPackageOptionTablePackageDetailTitle>Selected Package Details</ActivityPackageOptionTablePackageDetailTitle>

                    <ActivityPackageOptionTablePackageDetailOption>
                      <ActivityPackageOptionTablePackageDetailOptionText1>Package Description</ActivityPackageOptionTablePackageDetailOptionText1> |
                      <ActivityPackageOptionTablePackageDetailOptionText2>How To Use</ActivityPackageOptionTablePackageDetailOptionText2> |
                      <ActivityPackageOptionTablePackageDetailOptionText2>Terms & Conditions</ActivityPackageOptionTablePackageDetailOptionText2>
                    </ActivityPackageOptionTablePackageDetailOption>

                    <ActivityPackageOptionTablePackageDetailChillfulIcon src={require("../images/general/chillful_icon_original.png")}></ActivityPackageOptionTablePackageDetailChillfulIcon>
                    <ActivityPackageOptionTablePackageDetailOptionHeading>Package Description</ActivityPackageOptionTablePackageDetailOptionHeading>

                    <ActivityPackageOptionTablePackageDetailOptionDiv>
                      <ActivityPackageOptionTablePackageDetailOptionDivText1>Inclusive Of</ActivityPackageOptionTablePackageDetailOptionDivText1>
                      <table>
                        <tr>
                          <ActivityPackageOptionTableTdTop><ActivityPackageOptionTablePackageDetailOptionDivMargin10>•</ActivityPackageOptionTablePackageDetailOptionDivMargin10></ActivityPackageOptionTableTdTop>
                          <ActivityPackageOptionTableTdTop>1.5 hours of Aerial Yoga Lesson</ActivityPackageOptionTableTdTop>
                        </tr>
                        <tr>
                          <ActivityPackageOptionTableTdTop><ActivityPackageOptionTablePackageDetailOptionDivMargin10>•</ActivityPackageOptionTablePackageDetailOptionDivMargin10></ActivityPackageOptionTableTdTop>
                          <ActivityPackageOptionTableTdTop>Free changing room service</ActivityPackageOptionTableTdTop>
                        </tr>
                        <tr>
                          <ActivityPackageOptionTableTdTop><ActivityPackageOptionTablePackageDetailOptionDivMargin10>•</ActivityPackageOptionTablePackageDetailOptionDivMargin10></ActivityPackageOptionTableTdTop>
                          <ActivityPackageOptionTableTdTop>Water and Towels</ActivityPackageOptionTableTdTop>
                        </tr>
                      </table>
                    </ActivityPackageOptionTablePackageDetailOptionDiv>
                    <ActivityPackageOptionTablePackageDetailOptionDiv>
                      <ActivityPackageOptionTablePackageDetailOptionDivText1>Not Inclusive Of</ActivityPackageOptionTablePackageDetailOptionDivText1>
                      <table>
                        <tr>
                          <ActivityPackageOptionTableTdTop><ActivityPackageOptionTablePackageDetailOptionDivMargin10>•</ActivityPackageOptionTablePackageDetailOptionDivMargin10></ActivityPackageOptionTableTdTop>
                          <ActivityPackageOptionTableTdTop>Other personal expenses</ActivityPackageOptionTableTdTop>
                        </tr>
                      </table>
                    </ActivityPackageOptionTablePackageDetailOptionDiv>

                  </ActivityPackageOptionTablePackageDetail>

                </ActivityPackageOptionTableTdTop>

              </tr>
            </tbody>
          </ActivityPackageOptionTable>

        </ActivityPackageOption>

      </ActivityDetailDiv>

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
                <ChillfulActivityListStyle1Td><ActivityCard id={"test1"} activity_id={"12DxUVuZ8qwC3xLvbv16"} /></ChillfulActivityListStyle1Td>
                <td><ChillfulActivityListStyle1Margin2 /></td>
                <ChillfulActivityListStyle1Td><ActivityCard id={"test2"} activity_id={"12DxUVuZ8qwC3xLvbv16"} /></ChillfulActivityListStyle1Td>
                <td><ChillfulActivityListStyle1Margin2 /></td>
                <ChillfulActivityListStyle1Td><ActivityCard id={"test3"} activity_id={"12DxUVuZ8qwC3xLvbv16"} /></ChillfulActivityListStyle1Td>
                <td><ChillfulActivityListStyle1Margin2 /></td>
                <ChillfulActivityListStyle1Td><ActivityCard id={"test4"} activity_id={"12DxUVuZ8qwC3xLvbv16"} /></ChillfulActivityListStyle1Td>
                <td><ChillfulActivityListStyle1Margin2 /></td>
                <ChillfulActivityListStyle1Td><ActivityCard id={"test5"} activity_id={"12DxUVuZ8qwC3xLvbv16"} /></ChillfulActivityListStyle1Td>
                <td><ChillfulActivityListStyle1Margin /></td>
              </tr>
            </tbody>
          </ChillfulActivityListStyle1Table>

      </ChillfulActivityListStyle1>

    </div>
  );
}

export default Activity;

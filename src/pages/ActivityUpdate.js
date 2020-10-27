import React, { useState, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivitySearchBox from "../components/ActivitySearchBox";
import Menu from "../components/Menu";
import styled from "styled-components"; // package to define css class
import $ from 'jquery'; // package to run jQuery
import img from '../images/chillful/event_1.jpg';
import { storage, db } from "../firebase";
import Slider from 'infinite-react-carousel';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DashboardMenuBar = styled.div`
  height: 100%;
  width: 260px;
  z-index: 1;
  top: 0;
  left: 0;
  position:fixed;
  border-right: 1px solid #ddd;
  background-color: #fcfcfc;
  box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.08);
`;
const DashboardMenuBarIcon = styled.img`
  width:150px;
  margin-left:30px;
  margin-top:20px;
`;
const DashboardMenuBarGreyLine = styled.div`
  width:100%;
  height:1px;
  background-color:#ddd;
  margin-top:10px;
`;
const DashboardMenuBarItem = styled.div`
  width:100%;
  margin: 20px 30px;
  cursor:pointer;
`;
const DashboardMenuBarItemIcon = styled.img`
  width:18px;
  vertical-align: middle;
`;
const DashboardMenuBarItemText = styled.span`
  vertical-align: middle;
  margin-left:10px;
  font-weight:600;
  color: #555;
`;

const DashboardBodyDiv = styled.div`
  margin-left:260px;
`;
const DashboardTopMenuBarDiv = styled.div`
  width:150px;
  margin-left:30px;
  margin-top:73px;
`;
const DashboardTopMenuBarGreyLine = styled.div`
  width:100%;
  height:1px;
  background-color:#ddd;
`;
const DashboardTopMenuRightDiv = styled.div`
  position:fixed;
  right:30px;
  top:28px;
  height:73px;
`;

function ActivityUpdate() {


  const handleSubmit = () => {

    db.collection("chillfulActivities").doc("4Ahg4cIPpG7dWuDbo8IB").update({
      title: chillfulActivityTitle,
      description: chillfulActivityDescription
    });

  }

  const [chillfulActivityTitle, setChillfulActivityTitle] = useState("");
  const [chillfulActivityDescription, setChillfulActivityDescription] = useState("");
  const [chillfulActivityCategory, setChillfulActivityCategory] = useState("");
  const [chillfulActivitySubCategory, setChillfulActivitySubCategory] = useState("");
  const [chillfulActivityImagesSmall, setChillfulActivityImagesSmall] = useState("");
  const [chillfulActivityImagesLarge, setChillfulActivityImagesLarge] = useState("");
  const [chillfulActivityCurrency, setChillfulActivityCurrency] = useState("");
  const [chillfulActivityPrice, setChillfulActivityPrice] = useState("");

  useEffect(() => {

    // to get the information for activity
    db.collection("chillfulActivities").doc("4Ahg4cIPpG7dWuDbo8IB")
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
      })

  }, []);

  return (
    <div style={{width: "100%"}}>

      <DashboardMenuBar>

        <DashboardMenuBarIcon src={require("../images/general/logo_original.png")}></DashboardMenuBarIcon>

        <DashboardMenuBarGreyLine />

        <DashboardMenuBarItem>
          <DashboardMenuBarItemIcon src={require("../images/dashboard/dashboard_mindful.png")}></DashboardMenuBarItemIcon>
          <DashboardMenuBarItemText style={{color: "#FF9700"}}>Dashboard</DashboardMenuBarItemText>
        </DashboardMenuBarItem>

        <DashboardMenuBarItem>
          <DashboardMenuBarItemIcon src={require("../images/dashboard/appointment_grey.png")}></DashboardMenuBarItemIcon>
          <DashboardMenuBarItemText>Appointment</DashboardMenuBarItemText>
        </DashboardMenuBarItem>

        <DashboardMenuBarItem>
          <DashboardMenuBarItemIcon src={require("../images/dashboard/dashboard_grey.png")}></DashboardMenuBarItemIcon>
          <DashboardMenuBarItemText>Create Activity</DashboardMenuBarItemText>
        </DashboardMenuBarItem>

        <DashboardMenuBarItem>
          <DashboardMenuBarItemIcon src={require("../images/dashboard/dashboard_grey.png")}></DashboardMenuBarItemIcon>
          <DashboardMenuBarItemText>Manage Calendar</DashboardMenuBarItemText>
        </DashboardMenuBarItem>

        <DashboardMenuBarItem>
          <DashboardMenuBarItemIcon src={require("../images/dashboard/dashboard_grey.png")}></DashboardMenuBarItemIcon>
          <DashboardMenuBarItemText>Analytics Report</DashboardMenuBarItemText>
        </DashboardMenuBarItem>

      </DashboardMenuBar>

      <DashboardBodyDiv>

        <DashboardTopMenuBarDiv>
          <DashboardTopMenuRightDiv>Logout</DashboardTopMenuRightDiv>
        </DashboardTopMenuBarDiv>
        <DashboardMenuBarGreyLine />

        <div style={{ marginLeft:"100px", marginTop:"100px" }}>
          <ActivityCard id={"test1"} activity_id={"4Ahg4cIPpG7dWuDbo8IB"} shadow />
        </div>

        <div style={{ marginTop:"600px", marginLeft:"100px", marginBottom:"100px" }}>


            Title
            <input
              value={ chillfulActivityTitle }
              onChange={(e) => setChillfulActivityTitle(e.target.value)}
            >
            </input>
            <br />
            Description
            <input
              value={ chillfulActivityDescription }
              onChange={(e) => setChillfulActivityDescription(e.target.value)}
            >
            </input>

            <button onClick={handleSubmit}>
              Update
            </button>


        </div>



      </DashboardBodyDiv>


    </div>
  );
}

export default ActivityUpdate;

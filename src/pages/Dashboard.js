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

function Dashboard() {

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

  const handleChange = (e) => {
    if(e.target.files[0]){
      setImages(e.target.files[0]);
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref('images/' + images.name).put(images);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref("images")
          .child(images.name)
          .getDownloadURL()
          .then(url => {
            console.log(url)
            let newArr = [...imagesURL];
            newArr[0] = url;
            setImagesURL(newArr);
          });
      }
    )
  }

  console.log("image: ", images)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("chillfulActivities")
      .add({
        archiveFlag: false,
        category: category,
        category_chi: category_chi,
        createdDate: new Date(),
        currency: "HKD",
        currency_chi: "港幣",
        deleteFlag: false,
        description: description,
        description_chi: description_chi,
        lastModifiedDate: new Date(),
        packages: packages,
        packages_chi: packages_chi,
        price: price,
        subCategory: subCategory,
        subCategory_chi: subCategory_chi,
        targets: targets,
        targets_chi: targets_chi,
        title: title,
        title_chi: title_chi,
        validateFlag: false,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
    });

  };

  useEffect(() => {

    // to get the category
    db.collection("chillfulActivities").doc('categories')
      .get()
      .then( doc => {
        const data = doc.data()
        setCategoryList(data['categories']);
    });

  }, []);

  function getSubCategory(e){
    // to get the sub category
    db.collection("chillfulActivities").doc('categories').collection(e).doc('subCategories')
      .get()
      .then( doc => {
        const data = doc.data()
        setSubCategoryList(data['subCategories']);
    });
  }

  const addPackage = () => {
    let newArr = [...packages];
    newArr.push("");
    setPackages(newArr);
  }

  function updatePackage (index, e) {
    let newArr = [...packages];
    newArr[index] = e;
    setPackages(newArr);

  }

  const addTarget = () => {
    let newArr = [...targets];
    newArr.push("");
    setTargets(newArr);
  }

  function updateTarget (index, e) {
    let newArr = [...targets];
    newArr[index] = e;
    setTargets(newArr);

  }

  function addTimeslots(){

    setTimeslots([...timeslots, {
      id: timeslots.length,
      datetimeFrom: null,
      datetimeFromStr: "",
      datetimeTo: null,
      datetimeToStr: "",
      hourFrom: null,
      minuteFrom: null,
    }]);

  }

  function addTimeslotsFrom(index, date){

    let newArr = [...timeslots];
    newArr[index].datetimeFrom = date;
    newArr[index].datetimeFromStr = date.toString();
    setTimeslots(timeslots);

  }

  function updateTimeslotsFromTime(index, time){
    var a = time.split(':');
    let newArr = [...timeslots];
    newArr[index].hourFrom = a[0];
    newArr[index].minuteFrom = a[1];
    setTimeslots(timeslots);
  }

  function updateTimeslotsToTime(index, time){
    var a = time.split(':');
    let newArr = [...timeslots];
    newArr[index].hourFo = a[0];
    newArr[index].minuteFo = a[1];
    setTimeslots(timeslots);
  }

  function addTimeslotsTo(index, date){

    let newArr = [...timeslots];
    newArr[index].datetimeTo = date;
    newArr[index].datetimeToStr = date.toString();
    setTimeslots(timeslots);

  }

  const submitTimeslots = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("chillfulActivities").doc('3vlYHhPKQBTkPKEJbUgs').collection("timeslots")
      .add({
        archiveFlag: false,
        datetimeFrom: new Date(timeslots[0].datetimeFrom.getTime()+(timeslots[0].hourFrom*3600+timeslots[0].minuteFrom*60)*1000),
        datetimeTo: new Date(timeslots[0].datetimeTo.getTime()+(timeslots[0].hourTo*3600+timeslots[0].minuteTo*60)*1000),
        deleteFlag: false,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
    });

  };

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

        <div style={{ padding:"50px" }}>
          <h1>Create Activity</h1>

          <div style={{ width:"100%", padding:"20px", border:"1px solid #ddd" }}>

            <h2 style={{  }}>Basic Information</h2>

            <form className="form" onSubmit={handleSubmit}>

              Activity Name:

              <br />

              Price:
              <input
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>

              <br />

              <select

                onChange={(e) => {setCategory(e.target.value); getSubCategory(e.target.value);} }

              >
                <option>Choose a category</option>
                {categoryList.map(item => (
                  <option>
                      {item}
                  </option>
                ))}

              </select>

              <br />

              <select

                onChange={(e) => {setSubCategory(e.target.value)}}

              >
                <option>Choose a sub category</option>
                {subCategoryList.map(item => (
                  <option>
                      {item}
                  </option>
                ))}

              </select>

              <br />

              Packages:
              {packages.map((item, index) => (
                <input
                  placeholder="packages"
                  onChange={(e) => updatePackage(index, e.target.value)}
                >
                </input>
              ))}

              <div style={{cursor:"pointer"}} onClick={ addPackage }>+</div>

              <br />

              Targets:
              {targets.map((item, index) => (
                <input
                  placeholder="targets"
                  onChange={(e) => updateTarget(index, e.target.value)}
                >
                </input>
              ))}

              <div style={{cursor:"pointer"}} onClick={ addTarget }>+</div>

              <br />


              <button type="submit">
                Submit
              </button>
            </form>




          </div>


        </div>

        <div style={{ marginTop:"100px", marginBottom:"100px" }}>
        Upload Image
        <input type="file" onChange={handleChange}>
        </input>

        <button onClick={handleUpload}>Upload</button>

        {imagesURL.map(item => (
            <img src={item}></img>
        ))}

        </div>

        Timeslots:
        <div onClick={addTimeslots} style={{cursor:"pointer"}}>+</div>

        <form className="form" onSubmit={submitTimeslots}>

        {timeslots.map(item => (

            <div>
              <div>From date</div>
              <Calendar
                minDate = {new Date()}
                minDetail = "month"
                calendarType = "US"
                onClickDay = {(date) =>  addTimeslotsFrom(item.id, date) }
              />
              <select>
                <option>repeat</option>
                <option>repeat daily</option>
                <option>repeat weekly</option>
                <option>repeat bi-weekly</option>
                <option>repeat monthly</option>
              </select>
              <select
                onChange={(e) => {updateTimeslotsFromTime(item.id, e.target.value)} }
              >
                <option>From Time</option>
                <option>00:00</option>
                <option>00:15</option>
                <option>00:30</option>
                <option>00:45</option>
              </select>
              <div>To date</div>
              <Calendar
                minDate = {new Date()}
                minDetail = "month"
                calendarType = "US"
                onClickDay = {(date) =>  addTimeslotsTo(item.id, date) }
              />
              <select
                onChange={(e) => {updateTimeslotsToTime(item.id, e.target.value)} }
              >
                <option>To Time</option>
                <option>00:00</option>
                <option>00:15</option>
                <option>00:30</option>
                <option>00:45</option>
              </select>

              Packages:
              {packages.map((item, index) => (
                <input
                  placeholder="packages"
                  onChange={(e) => updatePackage(index, e.target.value)}
                >
                </input>
              ))}

              Targets:
              {targets.map((item, index) => (
                <input
                  placeholder="packages"
                  onChange={(e) => updatePackage(index, e.target.value)}
                >
                </input>
              ))}


            </div>




        ))}

        <button type="submit">
          Submit2
        </button>

        </form>

      </DashboardBodyDiv>




    </div>
  );
}

export default Dashboard;

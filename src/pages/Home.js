import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import { db } from "../firebase";

const Contact = () => {
  const [category, setCategory] = useState("");
  const [category_chi, setCategory_chi] = useState("");
  const [currency, setCurrency] = useState("");
  const [currency_chi, setCurrency_chi] = useState("");
  const [description, setDescription] = useState("");
  const [description_chi, setDescription_chi] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategory_chi, setSubCategory_chi] = useState("");
  const [title, setTitle] = useState("");
  const [title_chi, setTitle_chi] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("chillfulActivities")
      .add({
        archiveFlag: false,
        deleteFlag: false,
        validatelag: true,
        category: "go out & discover",
        category_chi: "外出探索",
        currency: "HKD",
        currency_chi: "港幣",
        description: description,
        description_chi: description_chi,
        imageLarge1: "",
        imageSmall1: "",
        price: price,
        duration: duration,
        subCategory: subCategory,
        subCategory_chi: subCategory_chi,
        title: title,
        title_chi: title_chi,
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
    <form className="form" onSubmit={handleSubmit}>
      <h1>Add Activity</h1>

      <input
        placeholder="category"
        value="go out & discover"
        onChange={(e) => setCategory("go out & discover")}
      />

      <br />

      <input
        placeholder="category_chi"
        value="外出探索"
        onChange={(e) => setCategory_chi("外出探索")}
      />

      <br />

      <input
        placeholder="currency"
        value="HKD"
        onChange={(e) => setCurrency("HKD")}
      ></input>

      <br />

      <input
        placeholder="currency_chi"
        value="港幣"
        onChange={(e) => setCurrency_chi("港幣")}
      ></input>

      <br />

      <input
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>

      <br />

      <input
        placeholder="description_chi"
        value={description_chi}
        onChange={(e) => setDescription_chi(e.target.value)}
      ></input>

      <br />

      <input
        placeholder="duration"
        value={duration}
        onChange={(e) => setPrice(e.target.value)}
      ></input>

      <br />

      <input
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>

      <br />

      <input
        placeholder="subCategory"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
      ></input>

      <br />

      <input
        placeholder="subCategory_chi"
        value={subCategory_chi}
        onChange={(e) => setSubCategory_chi(e.target.value)}
      ></input>

      <br />

      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>

      <br />

      <input
        placeholder="title_chi"
        value={title_chi}
        onChange={(e) => setTitle_chi(e.target.value)}
      ></input>

      <br />

      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Contact;

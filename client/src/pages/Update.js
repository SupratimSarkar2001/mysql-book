import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./add.css"

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    bookholder: "",
    contact:"",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update The Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <input
        
        type="text"
        placeholder="Author name"
        name="author"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book Holder"
        name="bookholder"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Contact Number"
        name="contact"
        onChange={handleChange}
      />
      <button className="button" onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link className="Link" to="/">See all books</Link>
    </div>
  );
};

export default Update;
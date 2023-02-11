import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./add.css";

const AddBook = ()=> {
    const navigate = useNavigate();

    const [bookdata , setBookData] = useState({title:"" , isbn:"" , author:"" , description:"" , publishedDate:"" , publisher:""})
    // console.log(bookdata);
    // const token = localStorage.getItem('token')

    const handleSubmit = async ()=> {
        await fetch("http://127.0.0.1:5000/list", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            //   authorization: token
            },
            body: JSON.stringify({
                title:bookdata.title,
                isbn:bookdata.isbn,
                author:bookdata.author,
                description:bookdata.description,
                publishedDate:bookdata.publishedDate,
                publisher:bookdata.publisher
            }),
          }).then(res => {
            return res.json();
          }).then(data => {
            alert("Success")
            navigate('/posts')
            console.log(data.lists);
          })
    }


    return (
        <div className="full">
            <div>
                <button onClick={(e)=>{navigate("/posts")}}>Show Book List</button>
            </div>
            <h1 style={{textAlign:"center"}}>Add Book</h1>
            <p style={{textAlign:"center"}}>Create New Book</p>

            <div className="inp">
                <input type="text" placeholder="Title of the book" onChange={(e)=>{setBookData({...bookdata , title:e.target.value})}}/>
                <input type="text" placeholder="ISBN" onChange={(e)=>{setBookData({...bookdata , isbn:e.target.value})}}/>
                <input type="text" placeholder="Author" onChange={(e)=>{setBookData({...bookdata , author:e.target.value})}}/>
                <input type="text" placeholder="Describe this book" onChange={(e)=>{setBookData({...bookdata , description:e.target.value})}}/>
                <input type="text" placeholder="Published_Date" onChange={(e)=>{setBookData({...bookdata , publishedDate:e.target.value})}}/>
                <input type="text" placeholder="Publisher of this book" onChange={(e)=>{setBookData({...bookdata , publisher:e.target.value})}}/>
            </div>
            <button onClick={()=>{handleSubmit()}} id='button' >Submit</button>
        </div>
    )
}

export default AddBook;
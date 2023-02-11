import React, { useEffect, useState } from "react";
import "./navigation.css"
import { useNavigate } from "react-router-dom";
import logo from "../../images/theBook.jpg"

const Navbar = () => {
    const navigate = useNavigate();

    // if(!localStorage.getItem("token")) {
    //     navigate("/");
    // }


    const [blogData, setdata] = useState([]);
    const [data, setData] = useState(true)
    // console.log(data);
    const [recordData, setRecordData] = useState()
    console.log(recordData);

    useEffect(() => {
        // const token = getToken("token");
        //console.log(token);
        fetch("http://localhost:5000/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: token,
            },
        })
            .then((response) => {
                // if (response.status === 403) return navigate("/");
                return response.json();
            })
            .then((data) => {
                setdata(data.post);
                ///console.log(data);
            });
    }, [navigate]);

    const PassData = (data) => {
        setData(!data)
        setRecordData(data)
    }

    const logoutFunc = () => {
        console.log(("Inside logout func"));
        localStorage.removeItem("token");
        navigate("/")
    }

    return (
        <div>
            <div>
                {data ? (
                    <div>
                        <h1 style={{ textAlign: "center" }}>Book List</h1>

                        <div>
                            <button onClick={() => { navigate("/addbook") }}> + Add New Book</button>
                        </div>
                        <div className="flx">
                            {blogData.map((data, i) => {
                                return (
                                    <div className="book-content" key={i} onClick={() => { PassData(data) }}>
                                        <img src={logo} alt="book" style={{ width: "150px", height: "200px" }} />
                                        <div className="pad">
                                            <div style={{color:"brown" , fontWeight:"bold"}}>{data.title}</div>
                                            <div style={{opacity:"0.5"}}>{data.author}</div>
                                            <div>{data.description}</div>
                                        </div>
                                        
                                    </div>
                                )
                            })}
                        </div>
                        
                    </div>
                ) : (
                    <div>
                        <div>
                            <div className="btn1">
                                <button onClick={(e) => { setData(!data) }}>Show Book List</button>
                            </div>
                            <h1 style={{textAlign:"center"}}>Book's Record</h1>
                            <p style={{textAlign:"center"}}>View Book's Info</p>

                            <div className="record">
                                <ol>
                                    
                                        <li>Title: <span>{recordData.title}</span></li>
                                        <li>Author: <span>{recordData.author}</span></li>
                                        <li>ISBN: <span>{recordData.isbn}</span></li>
                                        <li>Publisher: <span>{recordData.publisher}</span></li>
                                        <li>Published Date: <span>{recordData.publishedDate}</span></li>
                                        <li>Description: <span>{recordData.description}</span></li>
                                   
                                    
                                </ol>
                                <div className="btns">
                                <button >Delete Book</button>
                                 <button>Edit Book</button>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                )}
            </div>

            <button onClick={() => { logoutFunc() }} style={{marginLeft:"900px" }} >LOGOUT</button>
        </div>
    )
}

export default Navbar;
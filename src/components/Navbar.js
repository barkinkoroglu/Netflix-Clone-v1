import React, { useEffect, useState } from 'react'
import './Navbar.css'

function Navbar() {
    const [show,handleShow] =  useState(false) 
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                handleShow(true)
            }else handleShow(false)
        })
        return () => {
            window.removeEventListener("scroll",()=>{})
        }
    },[])
    return (
        <div className={`nav ${show && "nav__black"}`}>
             <img
                alt="Netflix logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                className="nav__logo"
            />
            <img
                alt="User logged"
                src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                className="nav__avatar"
            />
        </div>
    )
}

export default Navbar

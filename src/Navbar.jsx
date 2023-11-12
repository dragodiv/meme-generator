import React from "react"

export default function Navbar(){
    return(
        <div className="nav">
            <div className="logo">
                <img src="/logo.png" alt="" className="meme-logo" />
                <h2>Meme Generator</h2>
            </div>
            <h3 className="nav-txt">React Project - 3</h3>
        </div>
    )
}
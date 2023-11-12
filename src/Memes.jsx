import React from "react";
// import MemeData from "./MemeData";

export default function Memes(){

    let url
    const [Meme, setMeme]=React.useState({
        topText:"",
        bottomText:"",
        randomImage:"https://i.imgflip.com/265k.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getNewImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        url = allMemes[randomNumber].url
        setMeme(prevMeme=>({
            ...prevMeme,
            randomImage:url
        }))
        console.log(url)
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return(
        <div className="form">
            <div className="txt-f">
                <input type="text" name="topText" id="top-text" value={Meme.topText} placeholder="Top Text" onChange={handleChange}/>
                <input type="text" name="bottomText" id="bottom-text" value={Meme.bottomText} placeholder="Bottom Text" onChange={handleChange}/>
            </div>
            <button className="meme-btn" onClick={getNewImage}>Get a new meme image 🖼</button>
            <div className="meme">
                <img src={Meme.randomImage} alt="" className="meme-image"/>
                <h2 className="top-txt">{Meme.topText}</h2>
                <h2 className="bottom-txt">{Meme.bottomText}</h2>
            </div>
        </div>
    )
}
import React from "react";
import Draggable from "react-draggable";
// import MemeData from "./MemeData";

export default function Memes() {

    let url

    async function fetchImageAndConvertToBase64(imageUrl) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob(); // Get image as a Blob

            const reader = new FileReader();
            reader.readAsDataURL(blob); // Read Blob as Data URI 

            return new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    resolve(reader.result);  // Resolve with Base64 Data URI
                };
                reader.onerror = () => {
                    reject('Error converting image to base64');
                };
            });

        } catch (error) {
            console.error('Error fetching or converting image:', error);
            return null;
        }
    }

    const [Meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => (setAllMemes(data.data.memes), fetchImageAndConvertToBase64(data.data.memes[Math.floor(Math.random() * 10)].url)
                .then(base64Image => {
                    setMeme(prevMeme => ({
                        ...prevMeme,
                        randomImage: base64Image
                    }))
                })));
        // fetchImageAndConvertToBase64(allMemes[0].url)
        //     .then(base64Image => {
        //         setMeme(prevMeme => ({
        //             ...prevMeme,
        //             randomImage: base64Image
        //         }))
        //     });
    }, [])


    function getNewImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        url = allMemes[randomNumber].url
        fetchImageAndConvertToBase64(url)
            .then(base64Image => {
                setMeme(prevMeme => ({
                    ...prevMeme,
                    randomImage: base64Image
                }))
            });
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function downloadMeme() {
        html2canvas(document.getElementById('meme')).then(function (canvas) {
            // Create an anchor element to trigger the download
            const link = document.createElement('a');
            link.download = 'meme.png';
            link.href = canvas.toDataURL('image/png'); // Set image format as PNG
            link.click();
        });
    }



    return (
        <div className="form">
            <div className="txt-f">
                <input type="text" name="topText" id="top-text" value={Meme.topText} placeholder="Top Text" onChange={handleChange} />
                <input type="text" name="bottomText" id="bottom-text" value={Meme.bottomText} placeholder="Bottom Text" onChange={handleChange} />
            </div>
            <button className="meme-btn" onClick={getNewImage} onLoad={() => document.getElementById("meme-btn").click()} id="meme-btn">Get a new meme image 🖼</button>
            <div className="meme" id="meme">
                <img src={Meme.randomImage} alt="" className="meme-image" crossOrigin="anonymous" />
                <Draggable>
                    <h2 className="top-txt">{Meme.topText}</h2>
                </Draggable>
                <Draggable>
                    <h2 className="bottom-txt">{Meme.bottomText}</h2>
                </Draggable>
            </div>
            <button id="download-meme" onClick={() => downloadMeme()}>Download Meme</button>
        </div>
    )
}
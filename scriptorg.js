<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,400;0,700;1,900&display=swap');
    </style>
</head>
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="utilary.css">

<body>
    <div class="container">
        <div class="left">
            <!-- home -->
            <div class="home">
                <div class="logo">
                    <img src="Asset/logo.svg" alt="">
                    <img src="Asset/cross.svg" alt="" id="cross">
                </div>
                <ul>
                    <li class="flex"> <img src="Asset/home.svg" alt="home">Home</li>
                    <li class="flex"><img src="Asset/search.svg" alt="search">Search</li>
                </ul>
            </div>
            <div class="library">
                <div class="library-inside flex">
                    <div>
                        <div class="head flex"><img src="Asset/library.svg" alt="" class="invert">
                            <div>Your Library</div>
                        </div>
                    </div>
                    <div> <img style="width: 25px;" src="Asset/plus.svg" alt=""></div>
                </div>
                <div class="list-of-songs">
                    <ul>

                    </ul>
                </div>
                <div class="card1">
                    <div>Create your first playlist</div>
                    <div>it's easy,we'll help you</div>
                    <button class="create-playlist">
                        Create playlist
                    </button>
                </div>
                <div class="card2">
                    <div>lets find some podcasts to follow</div>
                    <div>we'll keep you updated on new episodes</div>
                    <button class="browse-podcast">
                        browse-podcast
                    </button>
                </div>
                <div class="cookies">
                    <a href="www.cookies.com">cookies</a>
                </div>
                <div>
                    <button class="english-btn">English</button>
                </div>
            </div>

        </div>




        <div class="right">
            <div class="nav-head flex">
                <div class="arrows flex">
                    <img id="humburger" src="Asset/humburger.svg" alt="">
                    <img src="Asset/leftArrow.svg" alt="left arrow">
                    <img src="Asset/rightArrow.svg" alt="right arrow">
                </div>
                <div class="button flex">
                    <button class="signup">
                        Sign up
                    </button>
                    <button class="log-in">
                        Log in
                    </button>
                </div>
            </div>
            <div class="spotifyPlaylist">
                <h2>Spotify Playlists</h2>
                <div class="playlist flex">
                    <div class="playlist-card">
                        <img class="play-button" src="Asset/play-button.svg" alt="">
                        <img src="https://i.scdn.co/image/ab67706f0000000254473de875fea0fd19d39037" alt="">
                        <h2>lofi beats</h2>
                        <p>chill beats, lofi vibes, new tracks every week... </p>
                    </div>

                    <div class="playlist-card">
                        <img class="play-button" src="Asset/play-button.svg" alt="">
                        <img src="https://i.scdn.co/image/ab67706f0000000254473de875fea0fd19d39037" alt="">
                        <h2>lofi beats</h2>
                        <p>chill beats, lofi vibes, new tracks every week... </p>
                    </div>


                </div>
            </div>


            <div class="creator">
                <div class="profile">
                    <img id="crossbtn" src="Asset/cross.svg" alt="">
                    <img id="profile-img" src="profile-img.jpeg" alt="">
                  <div class="name">Vikas Jain</div>
                </div>
                <button id = "profileBtn" >Creator</button>
            </div>
            
            <div class="music-player flex">

                <div class="play-box flex">
                    <div class="song-name"></div>
                    <div class="music-btn flex">
                        <img id="prev" src="Asset/previous-999-svgrepo-com.svg" alt="">
                        <img id="play" src="Asset/play-circle-svgrepo-com.svg" alt="">
                        <img id="next" src="Asset/next-998-svgrepo-com.svg" alt="">
                    </div>
                    <div class="song-duration"></div>
                </div>


                

                <div class="play-bar">
                    <div class="play-ball"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
    <!-- <script src="scr.js"></script> -->
    <!-- <script src="script2.js"></script> -->
</body>

</html>


























let currentsong = new Audio();
let songs = [];
let currFolder;

function convertSecondsToMinutes(seconds) {
    let formattedMinutes = "00";
    let formattedSeconds = "00";
    if (isNaN(seconds)) {
        return formattedMinutes + ":" + formattedSeconds;
    }

    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Use String.padStart(2, '0') to add leading zeros
    formattedMinutes = String(minutes).padStart(2, '0');
    formattedSeconds = String(remainingSeconds.toFixed(0)).padStart(2, '0');

    return formattedMinutes + ":" + formattedSeconds;
}


async function getsong(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        if (as[i].href.endsWith(".mp3")) {
            songs.push(as[i].href.split(`/${folder}/`)[1]);

        }
    }
    return songs;
}
function playMusic(track) {

    currentsong.src = `/${currFolder}/` + track;
    highlightCurrentSong();
    // if(play){
        play.src = "Asset/pause.svg";
        currentsong.play();
        // }
        
    document.querySelector(".song-duration").innerHTML = "00:00/00:00";
    document.querySelector(".song-name").innerHTML = decodeURI(track);

}

function highlightCurrentSong() {
    Array.from(document.querySelector(".list-of-songs").getElementsByTagName("li")).forEach(card => {
        card.classList.remove("current");
    })
    const index = songs.indexOf(currentsong.src.split(`/${currFolder}/`)[1]);
    document.getElementsByClassName("song-card")[index].classList.add("current");
}
function PausePlayByCard(){
    if (currentsong.paused) {
        // playMusic(document.querySelector(".info").innerHTML,true);
        play.src = "Asset/pause.svg";
        currentsong.play()
    }
    else {
        // playMusic(document.querySelector(".info").innerHTML,false);
        currentsong.pause();
        play.src = "Asset/play-circle-svgrepo-com.svg";
    }
}

async function main() {

    songs = await getsong("songs/Animal")
    // console.log(songs);
    // let audio = new Audio(songs[0]); //todo
    let songUL = document.querySelector(".list-of-songs").getElementsByTagName("ul")[0];
    for (const music of songs) {
        songUL.innerHTML += `
        
        <li class="song-card flex">
                            <div class="poster"><img src="Asset/Animal_poster.jpg" alt="">
                                <img class="song-play" src="Asset/play-circle.svg" alt="">
                            </div>
                            <div>
                                <div class="info" >${music.replaceAll("%20", " ")}</div>
                                <div style="margin-top: 4px;">Unkown Artist</div>
                            </div>
                        </li>
        `;
    }

    // playMusic((document.querySelector(".info").innerHTML));
    Array.from(document.querySelector(".list-of-songs").getElementsByTagName("li")).forEach(element => {
        element.addEventListener("click", e => {
            if((element.querySelector(".info").innerHTML) != decodeURI(currentsong.src.split(`/${currFolder}/`)[1])){
            playMusic((element.querySelector(".info").innerHTML));
            }
           else if (currentsong.paused) {
                // playMusic(document.querySelector(".info").innerHTML,true);
                play.src = "Asset/pause.svg";
                currentsong.play();
                // playMusic((element.querySelector(".info").innerHTML));
            }
            else {
                // playMusic(document.querySelector(".info").innerHTML,false);
                currentsong.pause();
                play.src = "Asset/play-circle-svgrepo-com.svg";
            }
        });
    });


    currentsong.src = `/${currFolder}/`+ document.querySelector(".info").innerHTML;
    document.querySelector(".song-name").innerHTML = decodeURI(document.querySelector(".info").innerHTML);
    document.querySelector(".song-duration").innerHTML = "00:00/00:00";
    highlightCurrentSong();


    console.log(currentsong);
    console.log(currentsong.src);
    //  Attach eventlistener to Play,Pause,Next
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            // playMusic(document.querySelector(".info").innerHTML,true);
            play.src = "Asset/pause.svg";
            currentsong.play()
        }
        else {
            // playMusic(document.querySelector(".info").innerHTML,false);
            currentsong.pause();
            play.src = "Asset/play-circle-svgrepo-com.svg";
        }

    })

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".song-duration").innerHTML = convertSecondsToMinutes(currentsong.currentTime) + "/" + convertSecondsToMinutes(currentsong.duration);
        document.querySelector(".play-ball").style.left = (currentsong.currentTime / currentsong.duration) * 100 + '%';
    })

    document.querySelector(".play-bar").addEventListener("click", (e) => {
        document.querySelector(".play-ball").style.left = (e.offsetX / e.target.getBoundingClientRect().width) * 100 + '%';
        currentsong.currentTime = (currentsong.duration * (e.offsetX / e.target.getBoundingClientRect().width));

    })

    humburger.addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    })
    cross.addEventListener("click", () => {
        document.querySelector(".left").style.left = '-430px';
    })
    // add event listener to previous button
    prev.addEventListener("click", () => {
        if (songs.indexOf(currentsong.src.split(`/${currFolder}/`)[1]) == 0) {
            playMusic(songs[songs.length - 1]);
        }
        else {
            playMusic(songs[songs.indexOf(currentsong.src.split(`/${currFolder}/`)[1]) - 1]);
        }
    })

    // add event listener to next button
    next.addEventListener("click", () => {
        if (songs.indexOf(currentsong.src.split(`/${currFolder}/`)[1]) == songs[songs.length - 1]) {
            playMusic(songs[0]);
        }
        else {
            playMusic(songs[songs.indexOf(currentsong.src.split(`/${currFolder}/`)[1]) + 1]);
        }
    })
    profileBtn.addEventListener("click",()=>{
      
        document.querySelector(".profile").style.opacity="1";
        document.querySelector(".profile").style.zIndex = "100";
        // querySelector(".profile").style.opacity = '1';
        // querySelector(".profile").style.opacity = '1';
        // querySelector(".profile").style.opacity = '1';
    })
    crossbtn.addEventListener("click",()=>{
        document.querySelector(".profile").style.opacity="0"; 
        document.querySelector(".profile").style.zIndex = "0";

    })


    // todo:
    // songlist.innerHTML.forEach(element => {
    //     console.log(element.innerHTML);
    // });

}
main();
let currentsong = new Audio();
let songs = [];

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


async function getsong() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        if (as[i].href.endsWith(".mp3")) {
            songs.push(as[i].href.split("/songs/")[1]);

        }
    }
    return songs;
}
function playMusic(track) {

    currentsong.src = "/songs/" + track;
    highlightCurrentSong();
    
    // if(play){
        play.src = "Asset/pause.svg";
        currentsong.play();
        // }
        
    document.querySelector(".song-duration").innerHTML = "00:00/00:00";
    document.querySelector(".song-name").innerHTML = track;

}

function highlightCurrentSong() {
    Array.from(document.querySelector(".list-of-songs").getElementsByTagName("li")).forEach(card => {
        card.classList.remove("current");
    })

    const index = songs.indexOf(currentsong.src.split("/songs/")[1]);
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

    songs = await getsong()
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
            if((element.querySelector(".info").innerHTML) != decodeURI(currentsong.src.split("/songs/")[1])){
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


    currentsong.src = "/songs/" + document.querySelector(".info").innerHTML;
    document.querySelector(".song-name").innerHTML = document.querySelector(".info").innerHTML;
    document.querySelector(".song-duration").innerHTML = "00:00/00:00";
    highlightCurrentSong();


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
        if (songs.indexOf(currentsong.src.split("/songs/")[1]) == 0) {
            playMusic(songs[songs.length - 1]);
        }
        else {
            playMusic(songs[songs.indexOf(currentsong.src.split("/songs/")[1]) - 1]);
        }
    })

    // add event listener to next button
    next.addEventListener("click", () => {
        if (songs.indexOf(currentsong.src.split("/songs/")[1]) == songs[songs.length - 1]) {
            playMusic(songs[0]);
        }
        else {
            playMusic(songs[songs.indexOf(currentsong.src.split("/songs/")[1]) + 1]);
        }
    })







    // todo:
    // songlist.innerHTML.forEach(element => {
    //     console.log(element.innerHTML);
    // });

}
main();
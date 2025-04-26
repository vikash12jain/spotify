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
    let songUL = document.querySelector(".list-of-songs").getElementsByTagName("ul")[0];
    songUL.innerHTML = [];
    for (const music of songs) {
        
        inform = typeChecker(music.replaceAll("%20", " "));
        songUL.innerHTML += `
        
        <li class="song-card flex">
                            <div class="poster">
                            <img src="songs/${currFolder.replace("songs", "")}/image.jpeg" alt="">
                                <img class="song-play" src="Asset/play-circle.svg" alt="">
                            </div>
                            <div>
                                <div style = "display :none;" class="info" >${music.replaceAll("%20", " ")}</div>
                                <div class="music-name" >${inform}</div>
                                <div style="margin-top: 4px;">Artist</div>
                            </div>
                        </li>
        `;
    }
    Array.from(document.querySelector(".list-of-songs").getElementsByTagName("li")).forEach(element => {
        element.addEventListener("click", e => {
            if ((element.querySelector(".info").innerHTML) != decodeURI(currentsong.src.split(`/${currFolder}/`)[1])) {
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
    return songs;

}

async function getfolder() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let album = [];
    for (let i = 0; i < as.length; i++) {
        if (as[i].href.includes("songs")) {
            album.push(as[i].href.split(`\songs`)[1]);

        }
    }
    return album;
}

function playMusic(track) {

    currentsong.src = `/${currFolder}/` + track;
    highlightCurrentSong();
    // if(play){
    play.src = "Asset/pause.svg";
    currentsong.play();
    // }

    currentsong.addEventListener("loadedmetadata",()=>{
        let d = convertSecondsToMinutes(currentsong.duration)
        document.querySelector(".song-duration").innerHTML = `00:00/${d}`;
    })
    document.querySelector(".song-name").innerHTML = typeChecker(decodeURI(track));

}

function highlightCurrentSong() {
    Array.from(document.querySelector(".list-of-songs").getElementsByTagName("li")).forEach(card => {
        card.classList.remove("current");
    })
    const index = songs.indexOf(currentsong.src.split(`/${currFolder}/`)[1]);
    document.getElementsByClassName("song-card")[index].classList.add("current");
}
function typeChecker(docu) {
    let inform;
    
    if (docu.includes("320")) {
        inform = docu.split("320")[0].replaceAll("(","");
       inform = inform.replaceAll("- DjPunjab.Com.Se","")
    }
    else {
        inform = docu.split(".mp3")[0];
       inform = inform.replaceAll("- DjPunjab.Com.Se","");
    }
    return inform;
}

async function main() {

    songs = await getsong("songs/RamAyenge")
    // let audio = new Audio(songs[0]); //todo

    currentsong.src = `/${currFolder}/` + document.querySelector(".info").innerHTML;

    let inform = typeChecker(decodeURI(document.querySelector(".info").innerHTML));
   
    document.querySelector(".song-name").innerHTML = inform;
    currentsong.addEventListener("loadedmetadata",()=>{
        let d = convertSecondsToMinutes(currentsong.duration)
        document.querySelector(".song-duration").innerHTML = `00:00/${d}`;
    })
    // document.querySelector(".song-duration").innerHTML = convertSecondsToMinutes(currentsong.currentTime) + "/" + convertSecondsToMinutes(currentsong.duration);

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
        currentsong.pause;
        if (songs.indexOf(currentsong.src.split(`/${currFolder}/`)[1]) == 0) {
            playMusic(songs[songs.length - 1]);
        }
        else {
            playMusic(songs[songs.indexOf(currentsong.src.split(`/${currFolder}/`)[1]) - 1]);
        }
    })
    // add event listener to next button
    next.addEventListener("click", () => {
        if (songs.indexOf(currentsong.src.split(`/${currFolder}/`)[1]) == (songs.length - 1)) {
            playMusic(songs[0]);
        }
        else {
            playMusic(songs[songs.indexOf(currentsong.src.split(`/${currFolder}/`)[1]) + 1]);
        }
    })
    profileBtn.addEventListener("click", () => {
        document.querySelector(".profile").style.opacity = "1";
        document.querySelector(".profile").style.zIndex = "10000";
        document.querySelector("#profileBtn").style.opacity = "0";
    })
    crossbtn.addEventListener("click", () => {
        document.querySelector(".profile").style.opacity = "0";
        document.querySelector(".profile").style.zIndex = "0";
        document.querySelector("#profileBtn").style.opacity = "1";

    })
    let albums = await getfolder();
    let albumUL = document.querySelector(".playlist").getElementsByTagName("ul")[0];
    for (const album of albums) {
        // let image = `${songs/Animal/image}`;
        albumUL.innerHTML += `<li>
        <div class="playlist-card">
        <img class="play-button" src="Asset/play-button.svg" alt="">
        <img src="songs/${album}/image.jpeg" alt="">
        <h2> ${album.replaceAll('/', "")} </h2>
        <p>chill beats 👍 </p>
    </div>
        </li>`
    }
    Array.from(albumUL.getElementsByTagName("li")).forEach(element => {
        element.addEventListener("click", async () => {
            currentsong.pause();
            play.src = "Asset/play-circle-svgrepo-com.svg";
            
            let loadfolder = decodeURI(element.querySelector("h2").innerHTML);
            songs = await getsong("songs/" + loadfolder.trim());
            
            inform = typeChecker(decodeURI(document.querySelector(".info").innerHTML));

            currentsong.src = `/${currFolder}/` + document.querySelector(".info").innerHTML;
            document.querySelector(".song-name").innerHTML = inform;
            currentsong.addEventListener("loadedmetadata",()=>{
                let d = convertSecondsToMinutes(currentsong.duration)
                document.querySelector(".song-duration").innerHTML = `00:00/${d}`;
            })
            currentsong.play();
            play.src = "Asset/pause.svg";
            highlightCurrentSong();
        })
    });

    // todo:
    // songlist.innerHTML.forEach(element => {
    // });
}
main();
let currentsong = new Audio();


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

    // if(play){
        play.src = "Asset/pause.svg";
        currentsong.play();
    // }

    document.querySelector(".song-duration").innerHTML = "00:00/00:00";
    document.querySelector(".song-name").innerHTML = track;

}
async function main() {
    let songs = await getsong()
    console.log(songs);
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
            console.log(element.querySelector(".info").innerHTML);
            playMusic((element.querySelector(".info").innerHTML));
        });
    });
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
        console.log(convertSecondsToMinutes(currentsong.currentTime), convertSecondsToMinutes(currentsong.duration));
        document.querySelector(".song-duration").innerHTML = convertSecondsToMinutes(currentsong.currentTime) + "/" + convertSecondsToMinutes(currentsong.duration)
    })
    // songlist.innerHTML.forEach(element => {
    //     console.log(element.innerHTML);
    // });

}
main();










































// async function getsong() {
//     let a = await fetch("http://127.0.0.1:3000/songs/");
//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");
//     let songs = [];
//     for (let i = 0; i < as.length; i++) {
//         if (as[i].href.endsWith(".mp3")) {
//             songs.push(as[i].href);
            
//         }
//     }
//     return songs;
// }
// async function getSongInfo(){
//     let songs = await getsong()
//     console.log(songs);
//     for (let i = 0; i < songs.length; i++) {
//        songs[i] = songs[i].split("/songs/")[1];
//     }
//     console.log(songs);
//     return songs;
// }
// async function main() {
//     // let songs = await getsong()
//     let songs = await getSongInfo()
//     console.log(songs);
//     // let audio = new Audio(songs[0]);
//     let songUL = document.querySelector(".list-of-songs").getElementsByTagName("ul")[0];
//     for (const music of songs) {
//         songUL.innerHTML += `<li>${music.replaceAll("%20"," ")}</li>`;
//     }
    
//     let playsongs = await getsong();
    
//     let audio = new Audio(playsongs[0]);
//     audio.play();
// }
// main();
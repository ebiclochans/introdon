let player;
let currentSong = null;
let stopTimer = null;

let correctCount = 0;
let totalCount = 0;

const songs = [

    {
        title: "行くぜっ！怪盗少女",
        videoId: "wK0H4mqR0jM"
    },

    {
        title: "サラバ、愛しき悲しみたちよ",
        videoId: "bKRY0hJ2mjQ"
    },

    {
        title: "労働讃歌",
        videoId: "Y2V6yjjPbX0"
    },

    {
        title: "猛烈宇宙交響曲・第七楽章『無限の愛』",
        videoId: "TiAMM4Z4Dqg"
    }

];

function onYouTubeIframeAPIReady(){

    player = new YT.Player("player",{

        height:"390",
        width:"640",

        playerVars:{
            autoplay:0,
            controls:1,
            rel:0,
            origin:window.location.origin
        },

        events:{
            onError:onPlayerError
        }

    });
}

function onPlayerError(event){
    console.error("YouTube Error:", event.data);
}

function randomSong(){

    currentSong =
        songs[Math.floor(Math.random()*songs.length)];

    document.getElementById("result").textContent = "";
}

function showChoices(){

    const choicesDiv =
        document.getElementById("choices");

    choicesDiv.innerHTML = "";

    let options = [currentSong.title];

    while(options.length < 4){

        const randomSong =
            songs[Math.floor(Math.random()*songs.length)];

        if(!options.includes(randomSong.title)){
            options.push(randomSong.title);
        }
    }

    options.sort(() => Math.random() - 0.5);

    options.forEach(title => {

        const btn =
            document.createElement("button");

        btn.className = "choice-btn";
        btn.textContent = title;

        btn.onclick = () => {

            totalCount++;

            if(title === currentSong.title){

                correctCount++;

                document.getElementById("result")
                    .textContent = "⭕ 正解！";

            }else{

                document.getElementById("result")
                    .textContent =
                    `❌ 不正解！ 正解：${currentSong.title}`;
            }

            document.getElementById("correct")
                .textContent = correctCount;

            document.getElementById("total")
                .textContent = totalCount;

            document
                .querySelectorAll(".choice-btn")
                .forEach(button => {
                    button.disabled = true;
                });
        };

        choicesDiv.appendChild(btn);
    });
}

function playIntro(){

    randomSong();

    const startTime =
        Math.floor(Math.random()*60);

    player.loadVideoById({
        videoId: currentSong.videoId,
        startSeconds: startTime
    });

    clearTimeout(stopTimer);

    stopTimer = setTimeout(() => {
        player.pauseVideo();
    }, 5000);

    showChoices();
}

document
.getElementById("startBtn")
.addEventListener("click", playIntro);

document
.getElementById("nextBtn")
.addEventListener("click", playIntro);
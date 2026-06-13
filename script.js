let player = null;
let currentSong = null;
let stopTimer = null;

let correctCount = 0;
let totalCount = 0;

let currentQuestion = 0;
const maxQuestions = 10;

let answered = false;
let usedSongs = [];

const songs = [

{
title:"行くぜっ！怪盗少女",
videoId:"u7z9M0vFPbI"
},
{
title:"サラバ、愛しき悲しみたちよ",
videoId:"OWSbfCPkTBk"
},
{
title:"労働讃歌",
videoId:"GDhFNdmVR5U"
},
{
title:"猛烈宇宙交響曲・第七楽章『無限の愛』",
videoId:"TIokp4MonxE"
},
{
title:"Z伝説 ～終わりなき革命～",
videoId:"oCRlKdMnPLI"
},
{
title:"Z女戦争",
videoId:"-72Lje6nwg0"
},
{
title:"MOON PRIDE",
videoId:"zFfXwgjKJDQ"
},
{
title:"ワニとシャンプー",
videoId:"2YWNNL2lNGQ"
},
{
title:"笑一笑 ～シャオイーシャオ！～",
videoId:"CbJx788qTao"
},
{
title:"クローバーとダイヤモンド",
videoId:"ESGu10M49Zo"
}

];

function onYouTubeIframeAPIReady(){

    player = new YT.Player("player",{

        height:"1",
        width:"1",

        playerVars:{
            autoplay:0,
            controls:0,
            rel:0
        }

    });

}

function getUnusedSong(){

    const remainingSongs =
        songs.filter(song =>
            !usedSongs.includes(song.title)
        );

    if(remainingSongs.length === 0){
        return null;
    }

    const song =
        remainingSongs[
            Math.floor(
                Math.random() *
                remainingSongs.length
            )
        ];

    usedSongs.push(song.title);

    return song;
}

function generateChoices(correctSong){

    const choices = [correctSong];

    while(choices.length < 4){

        const randomSong =
            songs[
                Math.floor(
                    Math.random() *
                    songs.length
                )
            ];

        if(
            !choices.some(
                s => s.title === randomSong.title
            )
        ){
            choices.push(randomSong);
        }
    }

    return choices.sort(
        () => Math.random() - 0.5
    );
}

function updateScore(){

    document.getElementById("correct")
        .textContent = correctCount;

    document.getElementById("total")
        .textContent = totalCount;
}

function showChoices(){

    const container =
        document.getElementById("choices");

    container.innerHTML = "";

    const choices =
        generateChoices(currentSong);

    choices.forEach(song=>{

        const btn =
            document.createElement("button");

        btn.className = "choice-btn";
        btn.textContent = song.title;

        btn.onclick = () => {

            if(answered) return;

            answered = true;

            totalCount++;

            if(song.title === currentSong.title){

                correctCount++;

                btn.style.backgroundColor =
                    "#4caf50";

                document.getElementById("result")
                    .textContent =
                    "⭕ 正解！";

            }else{

                btn.style.backgroundColor =
                    "#f44336";

                document.getElementById("result")
                    .textContent =
                    "❌ 不正解！ 正解は「"
                    + currentSong.title +
                    "」";

                document
                .querySelectorAll(".choice-btn")
                .forEach(button=>{

                    if(
                        button.textContent ===
                        currentSong.title
                    ){
                        button.style.backgroundColor =
                            "#4caf50";
                    }
                });
            }

            updateScore();

            document
            .querySelectorAll(".choice-btn")
            .forEach(button=>{
                button.disabled = true;
            });

            if(currentQuestion >= maxQuestions){

                setTimeout(
                    showFinalResult,
                    1500
                );

            }else{

                document
                .getElementById("nextBtn")
                .disabled = false;
            }
        };

        container.appendChild(btn);
    });
}

function showFinalResult(){

    let rank = "";

    const percent =
        Math.round(
            correctCount /
            maxQuestions * 100
        );

    if(percent === 100){

        rank = "🏆 ももクロ神";

    }else if(percent >= 80){

        rank = "🥇 上級モノノフ";

    }else if(percent >= 60){

        rank = "🥈 中級モノノフ";

    }else{

        rank = "🥉 修行中";
    }

    document.querySelector(".container")
        .innerHTML = `
        <h1>ゲーム終了！</h1>
        <h2>${correctCount} / ${maxQuestions} 正解</h2>
        <h2>${rank}</h2>
        <button onclick="location.reload()">
            もう一度遊ぶ
        </button>
    `;
}

function playIntro(){

    if(currentQuestion >= maxQuestions){
        return;
    }

    answered = false;

    document
    .getElementById("nextBtn")
    .disabled = true;

    currentQuestion++;

    document
    .getElementById("questionCounter")
    .textContent =
    `問題 ${currentQuestion} / ${maxQuestions}`;

    currentSong = getUnusedSong();

    document
    .getElementById("result")
    .textContent = "";

    showChoices();

    if(player && currentSong){

        const startTime =
            Math.floor(Math.random()*30);

        player.loadVideoById({
            videoId:currentSong.videoId,
            startSeconds:startTime
        });

        clearTimeout(stopTimer);

        stopTimer =
            setTimeout(()=>{
                player.pauseVideo();
            },5000);
    }
}

document
.getElementById("startBtn")
.addEventListener("click",playIntro);

document
.getElementById("nextBtn")
.addEventListener("click",playIntro);

updateScore();
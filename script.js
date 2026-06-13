let player;
let currentSong = null;
let stopTimer = null;

let correctCount = 0;
let totalCount = 0;

const songs = [

{
title:"行くぜっ！怪盗少女",
videoId:"M7lc1UVf-VE"
},
{
title:"サラバ、愛しき悲しみたちよ",
videoId:"dQw4w9WgXcQ"
},
{
title:"労働讃歌",
videoId:"ysz5S6PUM-U"
},
{
title:"猛烈宇宙交響曲・第七楽章『無限の愛』",
videoId:"ScMzIvxBSi4"
},
{
title:"Z伝説 ～終わりなき革命～",
videoId:"aqz-KE-bpKQ"
},
{
title:"Z女戦争",
videoId:"LXb3EKWsInQ"
},
{
title:"MOON PRIDE",
videoId:"YE7VzlLtp-4"
},
{
title:"ワニとシャンプー",
videoId:"kXYiU_JCYtU"
},
{
title:"笑一笑 ～シャオイーシャオ！～",
videoId:"JGwWNGJdvx8"
},
{
title:"クローバーとダイヤモンド",
videoId:"RgKAFK5djSk"
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
        }
    });
}

function getRandomSong(){
    return songs[Math.floor(Math.random()*songs.length)];
}

function generateChoices(correctSong){

    let choices=[correctSong];

    while(choices.length<4){

        let randomSong=getRandomSong();

        if(!choices.find(song=>song.title===randomSong.title)){
            choices.push(randomSong);
        }
    }

    return choices.sort(()=>Math.random()-0.5);
}

function showChoices(){

    const container=document.getElementById("choices");

    container.innerHTML="";

    const choices=generateChoices(currentSong);

    choices.forEach(song=>{

        const btn=document.createElement("button");

        btn.className="choice-btn";
        btn.textContent=song.title;

        btn.onclick=()=>{

            totalCount++;

            if(song.title===currentSong.title){

                correctCount++;

                document.getElementById("result").textContent=
                "⭕ 正解！";

            }else{

                document.getElementById("result").textContent=
                "❌ 不正解！ 正解は「"+currentSong.title+"」";
            }

            document.getElementById("correct").textContent=
            correctCount;

            document.getElementById("total").textContent=
            totalCount;

            document
            .querySelectorAll(".choice-btn")
            .forEach(btn=>btn.disabled=true);

        };

        container.appendChild(btn);

    });

}

function playIntro(){

    currentSong=getRandomSong();

    document.getElementById("result").textContent="";

    let startTime=Math.floor(Math.random()*30);

    player.loadVideoById({
        videoId:currentSong.videoId,
        startSeconds:startTime
    });

    clearTimeout(stopTimer);

    stopTimer=setTimeout(()=>{
        player.pauseVideo();
    },5000);

    showChoices();
}

document
.getElementById("startBtn")
.addEventListener("click",playIntro);

document
.getElementById("nextBtn")
.addEventListener("click",playIntro);
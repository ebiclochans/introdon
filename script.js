let player = null;
let currentSong = null;
let stopTimer = null;

let correctCount = 0;
let totalCount = 0;

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

    try{

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
                onError:function(e){
                    console.log("YouTube Error", e.data);
                }
            }

        });

    }catch(err){

        console.log(err);

    }

}

function getRandomSong(){

    return songs[
        Math.floor(Math.random()*songs.length)
    ];

}

function generateChoices(correctSong){

    let choices=[correctSong];

    while(choices.length<4){

        const randomSong=getRandomSong();

        if(
            !choices.find(
                song=>song.title===randomSong.title
            )
        ){
            choices.push(randomSong);
        }
    }

    return choices.sort(
        ()=>Math.random()-0.5
    );
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

        btn.onclick = ()=>{

            totalCount++;

            if(song.title===currentSong.title){

                correctCount++;

                document.getElementById("result")
                .textContent = "⭕ 正解！";

            }else{

                document.getElementById("result")
                .textContent =
                "❌ 不正解！ 正解は「"
                + currentSong.title +
                "」";
            }

            document.getElementById("correct")
            .textContent = correctCount;

            document.getElementById("total")
            .textContent = totalCount;

            document
            .querySelectorAll(".choice-btn")
            .forEach(btn=>{
                btn.disabled=true;
            });

        };

        container.appendChild(btn);

    });

}

function playIntro(){

    currentSong = getRandomSong();

    document.getElementById("result")
    .textContent = "";

    // 先に4択を表示
    showChoices();

    if(player){

        try{

            const startTime =
                Math.floor(Math.random()*30);

            player.loadVideoById({
                videoId:currentSong.videoId,
                startSeconds:startTime
            });

            clearTimeout(stopTimer);

            stopTimer=setTimeout(()=>{

                player.pauseVideo();

            },5000);

        }catch(err){

            console.log(err);

        }

    }

}

document
.getElementById("startBtn")
.addEventListener("click",playIntro);

document
.getElementById("nextBtn")
.addEventListener("click",playIntro);
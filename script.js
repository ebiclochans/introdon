const songs = [
    {
        title:"ムネモシュネ",
        videoId:"https://www.youtube.com/watch?v=yrdS158FgbU"
    },
    {
        title:"MOON PRIDE",
        videoId:"https://www.youtube.com/watch?v=zFfXwgjKJDQ"
    },
    {
        title:"曲名3",
        videoId:"動画ID3"
    },
    {
        title:"曲名4",
        videoId:"動画ID4"
    }
];

let player;
let currentSong;

let correct=0;
let total=0;

function onYouTubeIframeAPIReady(){

    player=new YT.Player("player",{
        height:"0",
        width:"0"
    });

}

document.getElementById("startBtn").onclick=nextQuestion;

function nextQuestion(){

    total++;

    document.getElementById("total").innerText=total;
    document.getElementById("result").innerText="";

    currentSong=songs[Math.floor(Math.random()*songs.length)];

    player.loadVideoById(currentSong.videoId);

    setTimeout(()=>{
        player.pauseVideo();
    },3000);

    createChoices();

}

function createChoices(){

    let list=[currentSong.title];

    while(list.length<4){

        let s=songs[Math.floor(Math.random()*songs.length)];

        if(!list.includes(s.title)){
            list.push(s.title);
        }

    }

    list.sort(()=>Math.random()-0.5);

    const area=document.getElementById("choices");

    area.innerHTML="";

    list.forEach(name=>{

        const btn=document.createElement("button");

        btn.className="choice";

        btn.innerText=name;

        btn.onclick=()=>judge(name);

        area.appendChild(btn);

    });

}

function judge(answer){

    if(answer===currentSong.title){

        correct++;

        document.getElementById("correct").innerText=correct;

        document.getElementById("result").innerText="⭕ 正解";

    }else{

        document.getElementById("result").innerText=
        "❌ 正解は "+currentSong.title;

    }

}
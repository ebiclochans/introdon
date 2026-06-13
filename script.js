let player;
let currentSong = null;
let stopTimer = null;

const songs = [

    {
        title: "行くぜっ！怪盗少女",
        videoId: "XN4RSUj15TE"
    },

    {
        title: "サラバ、愛しき悲しみたちよ",
        videoId: "XN4RSUj15TE"
    },

    {
        title: "労働讃歌",
        videoId: "XN4RSUj15TE"
    }

];

function onYouTubeIframeAPIReady() {

    player = new YT.Player("player", {

        height: "390",
        width: "640",

        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            origin: window.location.origin
        },

        events: {
            onReady: onPlayerReady,
            onError: onPlayerError
        }
    });
}

function onPlayerReady() {
    console.log("YouTube Ready");
}

function onPlayerError(event) {

    console.error("YouTube Error:", event.data);

    let message = "YouTubeエラー: " + event.data;

    switch(event.data){

        case 100:
            message += "\n動画が削除または非公開";
            break;

        case 101:
        case 150:
            message += "\n埋め込み禁止動画";
            break;

        case 153:
            message += "\nReferrer/Originエラー";
            break;
    }

    alert(message);
}

function randomSong() {

    currentSong =
        songs[Math.floor(Math.random() * songs.length)];

    document.getElementById("answer").textContent = "";
}

function playIntro() {

    randomSong();

    const startTime =
        Math.floor(Math.random() * 60);

    player.loadVideoById({
        videoId: currentSong.videoId,
        startSeconds: startTime
    });

    clearTimeout(stopTimer);

    stopTimer = setTimeout(() => {
        player.pauseVideo();
    }, 5000);
}

document
.getElementById("startBtn")
.addEventListener("click", playIntro);

document
.getElementById("nextBtn")
.addEventListener("click", playIntro);

document
.getElementById("answerBtn")
.addEventListener("click", () => {

    if(currentSong){

        document.getElementById("answer").textContent =
            "答え： " + currentSong.title;
    }
});
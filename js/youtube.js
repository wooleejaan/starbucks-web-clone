// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
  new YT.Player('player', { // player는 우리가 작성한 <div id="player"></div> 를 말한다. 
    videoId: 'An6LvWQuj_8', // (최초 재생할 유튜브 영상 ID) 원하는 비디오 id값 붙여넣기 
    playerVars: {
      autoplay: true, // 자동 재생 여부 
      loop: true, // 반복 재생 여부 
      playlist: 'An6LvWQuj_8', // 반복 재생 할 유튜브 영상 ID 목록 
    },
    events: {
      onReady: function(event) { // 영상 준비되면 익명함수 실행
        event.target.mute(); // 음소거 
      },
    },
  });
}

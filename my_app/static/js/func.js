//シナリオとビデオ表示に関する変数
let name = prompt("名前を入力してください");
let display = document.getElementById('display');
let btn = document.getElementById('btn');
let recStart = document.getElementById('recStart');
let recStop = document.getElementById('recStop');
let backBtn = document.getElementById('backBtn')
let videoZone = document.querySelector('.videoZone');
let videoNum = 0;
let cutCnt = 0;
let flag = 0;
let num = 0;

//sCutはsceanCutの略、シーンとカットを制御する関数
function sCut(sceanCnt) {
  display.innerHTML = scean[sceanCnt][cutCnt];

  if (cutCnt === scean[sceanCnt].length - 1){//セリフ終わったら
      flag = 1;//次の役柄シナリオにいくためのフラグ
      cutCnt = 0;
  } else {  //cutCnt進めたりvideo再生したり
      if(cutCnt === 0 && sceanCnt !== 1){  //そのシーンの最初のカットに動画表示
        videoCnt();
        videoNum++;
      }
      if(cutCnt === 1 && sceanCnt !== 1){  //こんにちはのカットで動画再生
        let videoElem = document.getElementById('videoElem');
        videoElem.play();
      }
      cutCnt++;//カット（セリフ）をインクリメント
      if ((cutCnt === 2) && (sceanCnt != 1)) {//trueの時録音する。※sceanCnt条件は、あらすじ表示時に録音してしまうのを防ぐため
        recStart.removeAttribute('disabled');//押せる
        btn.setAttribute('disabled', 'disabled');//押せなくする
      }
      if ((cutCnt === 3) && (sceanCnt != 1)) {
        recStop.removeAttribute('disabled');//押せる
        recStart.setAttribute('disabled', 'disabled');//押せなくする
      }
      flag = 0;
  }
};

//sCut関数実行のあと、flagチェックする関数
//真引数 num は 仮引数 sceanCntと対応
//カット（その役柄のセリフ）が終わったら
//sceanをインクリメント（次の役柄のシナリオへ）
function sCutFlag(){
  sCut(num);
  if (flag === 1){

    //戻るボタン表示に関する処理
    if (num == scean.length - 1) {
      backBtn.style.display = 'block';
      backBtn.style.margin = '30px auto';
    }

    num++;
    // console.log('セリフ終わり！',videoNum);
  } else {
    console.log('セリフ続くよ');
  }
}

function videoCnt() {
  videoZone.innerHTML=`
  <video controls width="700" id="videoElem"> 
    <source src="/static/video/${videoArr[videoNum]}.mp4" type="video/mp4" /> 
  </video>`;
}

//******************************** */
// 以下Recorederのための変数
const downloadLink = document.getElementById('download');
let audioContext = null;
let mediaStreamSource = null;
let scriptProcessor = null;
let audioData = [];
let bufferSize = 1024;
//******************************** */

// ボタン押したら関連------------------------------------------------------------------------------------------
btn.addEventListener('click', () => {
  sCutFlag();
});

recStart.addEventListener('click', () => {
  sCutFlag();
  audioData = [];
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(function(stream) {
    audioContext = new AudioContext();
    scriptProcessor = audioContext.createScriptProcessor(bufferSize, 1, 1);
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    mediaStreamSource.connect(scriptProcessor);
    scriptProcessor.onaudioprocess = function(e) {
      if (recStop.disabled) return;
      audioData.push(new Float32Array(e.inputBuffer.getChannelData(0)));
    };
    scriptProcessor.connect(audioContext.destination);
  });

});

recStop.addEventListener('click', () => {
  sCutFlag();
  recStop.setAttribute('disabled', 'disabled');//押せなくする
  btn.removeAttribute('disabled');//押せる

  saveAudio();
  console.log('saved wav');
  uploadAudio(path);
});

// ボタン押したら関連------------------------------------------------------------------------------------------

  
// *************************************************************************************************
//以下recorederのための関数
let saveAudio = function () {//stop押したときの処理 (stopButton)
  let blob = new Blob([encodeWAV(audioData, audioContext.sampleRate)], { type: 'audio/wav' });
  let url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = name;
  downloadLink.click();
  audioContext.close();
}

function uploadAudio(postPath) {
  let blob = new Blob([encodeWAV(audioData, audioContext.sampleRate)], { type: 'audio/wav' });
  let formData = new FormData();
  formData.append('file', blob, 'test.wav');
  formData.append('name', name);
  formData.append('role', role[num]);
  // console.log(name)

  fetch(postPath, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}




function encodeWAV(audioData, sampleRate) {
  let buffer = mergeBuffers(audioData);
  let dataview = createDataView(buffer, sampleRate);
  return dataview;
}

function mergeBuffers(audioData) {// encodeWAV関数にて使用
  let totalLength = audioData.reduce((prev, curr) => prev + curr.length, 0);
  let result = new Float32Array(totalLength);
  let offset = 0;
  for (let i = 0; i < audioData.length; i++) {
    result.set(audioData[i], offset);
    offset += audioData[i].length;
  }
  return result;
}

function createDataView(samples, sampleRate) {// encodeWAV関数にて使用
  let buffer = new ArrayBuffer(44 + samples.length * 2);
  let view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 32 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);
  floatTo16BitPCM(view, 44, samples);

  return view;
}

function floatTo16BitPCM(output, offset, input) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
// *************************************************************************************************

const sceanTitle = ['「森のいたずらっこ妖精くん」'];
const sceanOverview = ['知ってますか？', '森に住む妖精って、生まれつき名前のついた妖精なのではなくて、','その子が成りたい姿の妖精になっていくんですよ。','でも、どうやら、そこにいる妖精くんは、','自分がどんな妖精になりたいのか、まだわからないようです。'];
const sceanOtokonoko = ['おや、そこに男の子がやってきました。', '男の子「こんにちは」', '妖精さん「こんにちは」', '男の子はニコっとして、走っていきました。', '妖精さんも走って追いかけました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanOnnnanoko = ['次の日、そこに女の子がやってきました。', '女の子「こんにちは」', '妖精さん「こんにちは」', '女の子はニコっとして、お花を摘み始めました。', '妖精さんも同じようにお花を摘み始めました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanShounenn = ['次の日、そこに少年がやってきました。', '少年「こんにちは」', '妖精さん「こんにちは」', '少年はニコっとして、木に登りました。', '妖精さんも同じように木に登りました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanShoujo = ['次の日、そこに少女がやってきました。', '少女「こんにちは」', '妖精さん「こんにちは」', '少女はニコっとして、川のそばをゆっくり歩きました。', '妖精さんも同じように、川のそばをゆっくり歩きました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanSeinennMan = ['次の日、そこに青年の男性がやってきました。', '青年の男性「こんにちは」', '妖精さん「こんにちは」', '青年の男性はニコっとして、魚釣りをしました。', '妖精さんも同じように、真似して魚釣りをしました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanSeinenWoman = ['次の日、そこに青年の女性がやってきました。', '青年の女性「こんにちは」', '妖精さん「こんにちは」', '青年の女性はニコっとして、魚釣りをしました。', '妖精さんも同じように、真似して魚釣りをしました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanUncle = ['次の日、そこにおじさんがやってきました。', 'おじさん「こんにちは」', '妖精さん「こんにちは」', 'おじさんはニコっとして、薪を集めました。', '妖精さんも同じように、真似して薪を集めました。', 'ふたりは、時間を忘れて汗を流しました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanAunt = ['次の日、そこにおばさんがやってきました。', 'おばさん「こんにちは」', '妖精さん「こんにちは」', 'おばさんはニコっとして、川で洗濯をしました。', '妖精さんも同じように、真似して川で洗濯をしました。', 'ふたりは、時間を忘れて汗を流しました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanGrandpa = ['次の日、そこにおじいさんがやってきました。', 'おじいさん「こんにちは」', '妖精さん「こんにちは」', 'おじいさんはニコっとして、川のほとりに座りました。', '妖精さんも同じように、真似して川のほとりに座りました。', 'ふたりは、時間を忘れて汗を流しました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanGrandma = ['次の日、そこにおばあさんがやってきました。', 'おばあさん「こんにちは」', '妖精さん「こんにちは」', 'おばあさんはニコっとして、川のほとりに座りました。', '妖精さんも同じように、真似して川のほとりに座りました。', 'ふたりは、時間を忘れて汗を流しました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];

const scean = [
  sceanTitle,
  sceanOverview,
  sceanOtokonoko,
  sceanOnnnanoko,
  sceanShounenn,
  sceanShoujo,
  sceanSeinennMan,
  sceanSeinenWoman,
  sceanUncle,
  sceanAunt,
  sceanGrandpa,
  sceanGrandma
];

let display = document.getElementById('display');
let btn = document.getElementById('btn');
let recStart = document.getElementById('recStart');
let recStop = document.getElementById('recStop');
let cutCnt = 0;
let flag = 0;
let num = 0;

//******************************** */
// 以下Recorederのための変数
const downloadLink = document.getElementById('download');
let audioContext = null;
let mediaStreamSource = null;
let scriptProcessor = null;
let audioData = [];
let bufferSize = 1024;
//******************************** */

//sCutはsceanCutの略、シーンとカットを制御する関数
function sCut(sceanCnt) {
  display.innerHTML = scean[sceanCnt][cutCnt];

  if (cutCnt === scean[sceanCnt].length - 1){//セリフ終わったら
      flag = 1;//次の役柄シナリオにいくためのフラグ
      cutCnt = 0;
  } else {
      cutCnt++;//カット（セリフ）をインクリメント
      if ((cutCnt === 2) && (sceanCnt != 1)) {//trueの時録音する。※sceanCnt条件は、あらすじ表示時に録音してしまうのを防ぐため
        recStart.removeAttribute('disabled');//押せる
        recStop.removeAttribute('disabled');//押せる
        btn.setAttribute('disabled', 'disabled');//押せなくする
      } else {
        recStart.setAttribute('disabled', 'disabled');//押せなくする
      }
      flag = 0;
  }
};

//sCut関数実行のあと、flagチェックする関数
function sCutFlag(){
  sCut(num);//真引数 num は 仮引数 sceanCntと対応
  if (flag === 1){//カット（その役柄のセリフ）が終わったら
      console.log('セリフ終わり！');
      num++;//sceanをインクリメント（次の役柄のシナリオへ）
  } else {
      console.log('セリフ続くよ');
  }
}

// ボタン押したら関連------------------------------------------------------------------------------------------
btn.addEventListener('click', () => {
  sCutFlag();
});

recStart.addEventListener('click', () => {
  sCutFlag();

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
  uploadAudio();
});
// ボタン押したら関連------------------------------------------------------------------------------------------


  
// *************************************************************************************************
//以下recorederのための関数
let saveAudio = function () {//stop押したときの処理 (stopButton)
  let blob = new Blob([encodeWAV(audioData, audioContext.sampleRate)], { type: 'audio/wav' });
  let url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = 'test.wav';
  // downloadLink.click();
  audioContext.close();
}

function uploadAudio() {
  let blob = new Blob([encodeWAV(audioData, audioContext.sampleRate)], { type: 'audio/wav' });
  let formData = new FormData();
  formData.append('file', blob, 'test.wav');

  fetch('/recog_all', {
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
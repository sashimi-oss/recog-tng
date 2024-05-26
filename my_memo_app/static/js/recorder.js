// for html
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const downloadLink = document.getElementById('download');

// for audio
let audioContext = null;
let mediaStreamSource = null;
let scriptProcessor = null;
let audioData = [];
let bufferSize = 1024;

let saveAudio = function () {//stop押したときの処理 (stopButton)
  let blob = new Blob([encodeWAV(audioData, audioContext.sampleRate)], { type: 'audio/wav' });
  let url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = 'test.wav';
  downloadLink.click();
  audioContext.close();
  stopButton.setAttribute('disabled', 'disabled');
}

function uploadAudio() {
  let blob = new Blob([encodeWAV(audioData, audioContext.sampleRate)], { type: 'audio/wav' });
  
  // form を動的に生成
  let form = document.createElement('form');
  form.action = '/';
  form.method = 'POST';
  form.enctype = 'multipart/form-data';

  // body に追加
  document.body.append(form);

  // formdta イベントに関数を登録(submit する直前に発火)
  form.addEventListener('formdata', (e) => {
    let fd = e.formData;
    
    // データをセット
    fd.set('file', blob);
  });

  // submit
  form.submit();
}

// start button
startButton.addEventListener('click', function () {
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function(stream) {
      audioContext = new AudioContext();
      scriptProcessor = audioContext.createScriptProcessor(bufferSize, 1, 1);
      mediaStreamSource = audioContext.createMediaStreamSource(stream);
      mediaStreamSource.connect(scriptProcessor);
      scriptProcessor.onaudioprocess = function(e) {
        if (stopButton.disabled) return;
        audioData.push(new Float32Array(e.inputBuffer.getChannelData(0)));
      };
      scriptProcessor.connect(audioContext.destination);
      startButton.setAttribute('disabled', 'disabled');
      stopButton.removeAttribute('disabled');
    });
});

// stop button
stopButton.addEventListener('click', function () {
  saveAudio();
  console.log('saved wav');
  uploadAudio();
});

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
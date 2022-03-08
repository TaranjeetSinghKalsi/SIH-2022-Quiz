const QRcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("scan-qr");

let scanning = false;

QRcode.callback = res => {
  if (res) {
    outputData.innerText = res;
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    // qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
};

btnScanQR.onclick = () => {
  //Changing img and question display in live quiz to none
  document.getElementById("img-container").style.display = 'none';
  document.getElementById("question-container").style.display = 'none';
  document.getElementById("btn-container").style.display = 'none';
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    QRcode.decode().then(document.getElementById("question-container").style.display = '', document.getElementById("img-container").style.display = '',  document.getElementById("check-btn").click(), document.getElementById("scan-qr").disabled = true,
    document.getElementById("scan-qr").innerText = 'Scanned', document.getElementById("btn-container").style.display = ''
    )
  } catch (e) {
    setTimeout(scan, 300);
  }
}

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// カメラの設定
const constraints = {
    video: {
        facingMode: 'user' // フロントカメラを使用
    },
    audio: false // 今回は音声は不使用とする明記（通常は明記不要）
};

// ブラウザのカメラ機能にアクセス
navigator.mediaDevices.getUserMedia(constraints)
// カメラ機能からの映像ストリームを取得
.then(function(stream) {
    // ビデオ要素に映像ストリームを設定することで、映像の再生が可能になる
    video.srcObject = stream;

    // ビデオの再生を開始 -> video.onplayイベントが発火
    // 同時に映像ストリームのデコードを開始（各フレームの画像データとなる）
    video.play();

    // ビデオのメタデータが読み込まれたらキャンバスのサイズをビデオのサイズに合わせて設定
    video.onloadeddata = function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    };

    // ビデオフレームをキャンバスに描画
    function drawFrame() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawFrame);
    }

    // ビデオの再生が開始されたらフレーム描画を開始
    video.onplay = function () {
        drawFrame();
    };
    })

.catch(function (err) {
    console.log("エラーが発生しました：" + err);
});

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
var model;
camera_button.addEventListener('click', async function() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
 video.srcObject = stream;
 model = await tf.loadLayersModel("model.json");
});

click_button.addEventListener('click', function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');

    const img = document.getElementById('canvas');

  result = predict(img);
  console.log(result);
});
    

async function predict(img) {
  model = await loadLayersModel("model.json");
  
  const results = await model.predict(img);
  model.dispose();
  return results;

}
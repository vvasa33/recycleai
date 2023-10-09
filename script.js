let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
let model;

// Load the model asynchronously
async function loadModel() {
    model = await tf.loadLayersModel("model.json");
}

camera_button.addEventListener('click', async function() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

    // Set the video stream as the source for the video element
    video.srcObject = stream;

    // Load the model after the camera is started
    await loadModel();
});

click_button.addEventListener('click', function() {
    // Draw the video frame on the canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas
    let image_data = canvas.toDataURL('image/jpeg');

    // Create an Image object and set its source to the canvas data URL
    let img = new Image();
    img.src = image_data;

    // Call the predict function with the Image object
    predict(img);
});

async function predict(img) {
    // Make sure the model is loaded before making predictions
    if (!model) {
        console.error("Model not loaded yet.");
        return;
    }

    // Preprocess the image (resize, normalize, etc.) before making predictions
    // You need to implement the preprocessing logic based on your model's requirements

    // Assuming preprocessImage is a function that preprocesses the image for the model
    // let preprocessedImage = preprocessImage(img);

    // Make predictions
    const results = await model.predict(preprocessedImage);

    // Handle the prediction results here
    console.log(results);
}

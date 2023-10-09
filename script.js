let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
let model; // You don't need to declare model here

camera_button.addEventListener('click', async function() {
    try {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing camera:", err);
    }
});

click_button.addEventListener('click', async function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');

    const img = document.getElementById('canvas');

    result = await predict(img); // Wait for the prediction to complete
    console.log(result);
});

async function predict(img) {
    if (!model) {
        try {
            model = await tf.loadLayersModel("model.json");
        } catch (err) {
            console.error("Error loading model:", err);
            return;
        }
    }

    const tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([/* your input shape */]);
    // You need to preprocess the tensor to match the input shape expected by your model
    // Example: tensor = preprocess(tensor);
    
    const results = await model.predict(tensor);
    tensor.dispose(); // Don't forget to dispose of the tensor to avoid memory leaks
    return results;
}

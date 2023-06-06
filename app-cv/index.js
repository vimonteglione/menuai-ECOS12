import fetch from "node-fetch";

// URL of image to use. Change this to your image.
const IMAGE_URL =
    "https://www.teenaagnel.com/wp-content/uploads/2019/12/food-photography-in-dubai.jpg";

const raw = JSON.stringify({
    user_app_id: {
        user_id: "clarifai",
        app_id: "main",
    },
    inputs: [
        {
            data: {
                image: {
                    url: IMAGE_URL,
                },
            },
        },
    ],
});

const requestOptions = {
    method: "POST",
    headers: {
        Accept: "application/json",
        Authorization: "Key " + "313f9ec49fe841a4843ded7b3c97af9e",
    },
    body: raw,
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch(
    `https://api.clarifai.com/v2/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs`,
    requestOptions
)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

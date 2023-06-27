import express from "express";
import fetch from "node-fetch";

const app = express();

import bodyParser from "body-parser";
import cors from "cors";

app.use(bodyParser.json({ limit: "100mb" }));
app.use(cors());

app.post("/image", async (req, res) => {
    var result = await sendImage(req.body.data);
    console.log(result);
    res.send(result);
});

async function sendImage(imageData) {
    const raw = JSON.stringify({
        user_app_id: {
            user_id: "clarifai",
            app_id: "main",
        },
        inputs: [
            {
                data: {
                    image: {
                        base64: imageData,
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

    const response = await fetch(
        `https://api.clarifai.com/v2/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs`,
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => {
            //console.log(JSON.parse(result))
            return JSON.parse(result);
        })
        .catch((error) => console.log("error", error));

    return response;
}

app.listen(8001);

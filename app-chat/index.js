import express from "express";
import fetch from "node-fetch";

const app = express();

import bodyParser from "body-parser";
import cors from "cors";

app.use(bodyParser.json({ limit: "100mb" }));
app.use(cors());

const result = { value: "" };

const OPENAI_API_KEY = "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";

app.post("/sendQuestion", async (req, res) => {
    var answer = await SendQuestion(req.body.question);
    console.log(answer);
    res.send(answer);
});

async function SendQuestion(question) {
    var sQuestion = question;

    const finalResponse = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: sQuestion,
            max_tokens: 2048, // tamanho da resposta
            temperature: 0.5, // criatividade na resposta
        }),
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((json) => {
            if (json.error?.message) {
                result.value += `Error: ${json.error.message}`;
            } else if (json.choices?.[0].text) {
                var text = json.choices[0].text || "Sem resposta";

                result.value = text;
                console.log(result);
                return result;
            }
        })
        .catch((error) => console.error("Error:", error));

    //console.log(result);
    return finalResponse;
}

//var lalala = await SendQuestion("Onde fica Itajubá?");
//console.log(lalala);

app.listen(8002);

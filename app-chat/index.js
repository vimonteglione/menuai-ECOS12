import fetch from "node-fetch";

const inputQuestion = { value: "Onde fica Bragança Paulista?" };
const result = { value: "" };

const OPENAI_API_KEY = "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";

async function SendQuestion() {
    var sQuestion = inputQuestion.value;

    const responseTest = await fetch("https://api.openai.com/v1/completions", {
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
            console.log("TESTE2");
            console.log(response);
            return response.json();
        })
        .then((json) => {
            if (result.value) result.value += "\n";

            if (json.error?.message) {
                result.value += `Error: ${json.error.message}`;
            } else if (json.choices?.[0].text) {
                var text = json.choices[0].text || "Sem resposta";

                result.value += "Chat GPT: " + text;
                console.log(result);
                return result;
            }
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => {
            inputQuestion.value = "";
        });

    if (result.value) result.value += "\n\n\n";

    result.value += `Eu: ${sQuestion}`;
    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true;

    console.log("TESTE: " + result);
    return responseTest;
}

var retorno = await SendQuestion();

console.log("RETORNO:");
console.log(retorno);

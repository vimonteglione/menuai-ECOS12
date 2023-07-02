import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Axios from "axios";

function App() {
    const [keywords, setKeyworkds] = useState([]);
    const [gptAnswer, setGptAnswer] = useState([]);
    const [ocasiao, setOcasiao] = useState("");
    const [quantPessoas, setQuantPessoas] = useState("");
    const [image, setImage] = useState("");
    /* const [imageURL, setImageURL] = useState(""); */
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [finalButtonDisabled, setFinalButtonDisabled] = useState(true);
    const [spinner1, setSpinner1] = useState(false);
    const [spinner2, setSpinner2] = useState(false);

    const handleClick = () => {
        var result = Axios.post("http://localhost:8001/image", {
            data: image,
        }).then((response) => {
            console.log(response.data);
            console.log(response.data.outputs[0].data.concepts);
            var foodArray = response.data.outputs[0].data.concepts;
            var resultFoodArray = [];
            foodArray.forEach((food) => {
                resultFoodArray.push(food.name);
            });
            setKeyworkds(resultFoodArray);
            setFinalButtonDisabled(false);
            setSpinner1(false);
        });
        console.log(result);
        setSpinner1(true);
    };

    const handleFinalClick = () => {
        console.log(
            "Recomende uma receita " +
                (ocasiao !== "" ? "para " + ocasiao + " " : "") +
                (quantPessoas !== ""
                    ? "para " + quantPessoas + " pessoas "
                    : "") +
                "com os ingredientes (não usando necessáriamente todos) : " +
                keywords.map((el) => el)
        );
        var result = Axios.post("http://localhost:8002/sendQuestion", {
            question:
                "Recomende uma receita " +
                (ocasiao !== "" ? "para " + ocasiao + " " : "") +
                (quantPessoas !== ""
                    ? "para " + quantPessoas + " pessoas "
                    : "") +
                "com os ingredientes (não usando necessáriamente todos) : " +
                keywords.map((el) => el),
        }).then((response) => {
            console.log(response.data);
            setGptAnswer(response.data.value + "\n\n");
            setSpinner2(false);
        });
        console.log(result);
        setSpinner2(true);
    };

    return (
        <div className="App">
            <div className="header">
                <h1 className="header-title">MenuAI</h1>
            </div>
            <div className="menu-form">
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label>Ocasião</Form.Label>
                        <Form.Control
                            style={{ resize: "none" }}
                            as="textarea"
                            rows={1}
                            value={ocasiao}
                            placeholder="Exemplo: festa de aniversário"
                            onChange={(e) => {
                                setOcasiao(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Quantidade de Pessoas</Form.Label>
                        <Form.Control
                            style={{ resize: "none" }}
                            as="textarea"
                            rows={1}
                            value={quantPessoas}
                            placeholder="Exemplo: 20"
                            onChange={(e) => {
                                setQuantPessoas(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Imagem da Geladeira</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => {
                                //setImage(e.target.files[0]);

                                console.log(e.target.files[0]);

                                var reader = new FileReader();
                                reader.readAsDataURL(e.target.files[0]);
                                reader.onload = function () {
                                    var imageCode = reader.result.replace(
                                        /^data:image\/[a-z]+;base64,/,
                                        ""
                                    );
                                    setImage(imageCode);
                                    console.log(imageCode);
                                    setButtonDisabled(false);
                                };
                            }}
                        />

                        <Button
                            variant={buttonDisabled ? "secondary" : "primary"}
                            className="mt-3"
                            disabled={buttonDisabled}
                            onClick={handleClick}
                        >
                            Identificar
                        </Button>
                    </Form.Group>
                    <Form.Group className="mb-4 ms-5">
                        <Form.Label>Itens da Geladeira</Form.Label>
                        <ul className="itens-geladeira">
                            {keywords.map((el, index) => {
                                return (
                                    <li className="ms-3" key={index}>
                                        {el}
                                    </li>
                                );
                            })}
                            {spinner1 && (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </Spinner>
                            )}
                        </ul>
                    </Form.Group>
                    <Button
                        variant={finalButtonDisabled ? "secondary" : "primary"}
                        className="mt-2 mb-4"
                        disabled={finalButtonDisabled}
                        onClick={handleFinalClick}
                    >
                        Solicitar Receita
                    </Button>
                    <Form.Group className="mb-4 text-center">
                        <Form.Label>Receita</Form.Label>
                        <div className="itens-geladeira display-linebreak">
                            {gptAnswer}
                            {spinner2 && (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </Spinner>
                            )}
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default App;

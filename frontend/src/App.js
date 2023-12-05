import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./App.css";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faChalkboard } from '@fortawesome/free-solid-svg-icons';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [campo1, setcampo1] = useState("");
  const [campo2, setcampo2] = useState("");
  const [campo3, setcampo3] = useState("");
  const [campo4, setcampo4] = useState("");
  const [campo5, setcampo5] = useState("");
  const [campo6, setcampo6] = useState("");
  const [campo7, setcampo7] = useState("");
  const [campo8, setcampo8] = useState("");
  const [message, setMensagem] = useState("");
  const [chatMensage, setChatMensage] = useState("");

  const [showButtons, setShowButtons] = useState(false);


  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  // Função para atualizar o contador de likes no Local Storage
  const updateLikeCount = () => {
    const newCount = likeCount + 1;
    setLikeCount(newCount);
  };

  // Função para atualizar o contador de dislikes no Local Storage
  const updateDislikeCount = () => {
    const newCount = dislikeCount + 1;
    setDislikeCount(newCount);
  };

  const sendMensagem = () => {
    const newChatMensages = [...chatMensage, { user: true, text: message }];
    setChatMensage(newChatMensages);
    setMensagem(''); //da clean no input field

    //json que vai para o backoffice
    let datapost = {
      id: 0,
      message: "Levando em consideração que esta pessoa gosta de aprender um novo topico " + campo1 + " Quando estuda com outros,  aprende melhor a " + campo2 + " o ambiente de aprendizagem que prefere " + campo3 + " lida com informações complexas a " + campo4 + " Com um novo desafio, prefere " + campo5 + " a sua atitude em relação a prazos de entrega é que " + campo6 + " reage ao feedback critico " + campo7 + " e que quando ensina alguem prefere " + campo8 + " Qual seria o perfil de aprendizado desta pessoa? Limita a tua resposta a uma linha e a 4 perfis apenas,   . Por exemplo: 'Perfil Visual' ; 'Perfil Auditivo' ; 'Perfil Leitor/Escritor' ; 'Perfil Cinestésico'",
    }

    axios
      .post('http://localhost:3000/', datapost)
      .then(response => {
        const perfil = { text: response.data };
        const pergunta = { message: "Consoante este perfil: " + perfil.text + " e este tema " + message + " qual o melhor método de estudo para este perfil. Envia apenas um método, podes também sugerir otimização de horários de estudo e recomendação de recursos, o melhor, num texto com no minimo 8 e maximo 10 linhas." }
        axios.post('http://localhost:3000/', pergunta)
          .then(resp => {
            const botMessage = { text: resp.data, user: false };
            const newChatMensages = [...chatMensage, botMessage];
            setChatMensage(newChatMensages)
            const localjson = {
              data: [{
                perfil: perfil.text,
                tema: message,
                message: botMessage.text,
                like: likeCount,
                dislike: dislikeCount
              }]
            }
            const localDataString = JSON.stringify(localjson);
            localStorage.setItem("Dado", localDataString);
          })
      })
      .catch(function (error) {
        console.error(error)
        console.log("Deu errado")
      });
    setShowButtons(true);
  }

  function handleButtonClick(setCampo, value) {
    setCampo(value);
  }

  return (
    <div className="background font">
      <nav class="navbar navbar-expand-lg navbar bg-dark justify-content-between">
        <div className="container">
          <img className="navbar-brand mx-auto mt-2" src="LOGO.png" alt="GitHub" height="75" />
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link " href="https://github.com/seu-usuario-do-github">
                <img src="github.png" alt="GitHub" width="30" height="30" />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row justify-content-around mb-5">
          <div className="col-12 text-center">
            <h3 className="text-light mb-3">Educação Personalizada para Todos</h3>
            <p className="text-light w-50 mx-auto">A aplicação de IA que personaliza o aprendizado, otimiza horários de estudo e recomenda recursos educacionais, tornando a educação mais eficaz e acessível.</p>
          </div>
        </div>
        <div className="row justify-content-around mb-5">
          <div className="col-3 text-center">
            <div className="icon text-light mb-3 mx-auto">
              <FontAwesomeIcon icon={faBook} className="text-info" />
            </div>
            <div className="text-wrapper mx-auto text-light h6 w-75 fw-bold">Como prefere aprender sobre um novo tópico?</div>
            <div className="btn-group d-flex flex-column mt-4" id="myDIV1">
              <button
                className={`mb-2 button text-light py-2 ${campo1 === "Lendo um livro ou texto" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo1, "Lendo um livro ou texto")}
              >
                Ler um livro ou texto
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo1 === "Ouvindo um palestrante" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo1, "Ouvindo um palestrante")}
              >
                Ouvir um palestrante
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo1 === "Assistindo a vídeos" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo1, "Assistindo a vídeos")}
              >
                Assistir a vídeos
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo1 === "Fazendo atividades práticas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo1, "Fazendo atividades práticas")}
              >
                Fazer atividades práticas
              </button>
            </div>

          </div>
          <div className="col-3 text-center">
            <div className="icon text-light mb-3 mx-auto">
              <FontAwesomeIcon icon={faComments} className="text-info" />
            </div>
            <div className="text-wrapper mx-auto text-light h6 w-75 fw-bold">Quando estuda com outros, como aprende melhor?</div>
            <div className="btn-group d-flex flex-column mt-4" id="myDIV2">
              <button
                className={`mb-2 button text-light py-2 ${campo2 === "Discussões e interações" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo2, "Discussões e interações")}
              >
                Discussões e interações
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo2 === "Ensinar e explicar o material aos outros" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo2, "Ensinar e explicar o material aos outros")}
              >
                Ensinar e explicar o material aos outros
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo2 === "Trabalhar em grupo em projetos" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo2, "Trabalhar em grupo em projetos")}
              >
                Trabalhar em grupo em projetos
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo2 === "Ver os outros a resolver problemas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo2, "Ver os outros a resolver problemas")}
              >
                Ver os outros a resolver problemas
              </button>
            </div>
          </div>
          <div className="col-3 text-center">
            <div className="icon text-light mb-3 mx-auto">
              <FontAwesomeIcon icon={faChalkboard} className="text-info" />
            </div>
            <div className="text-wrapper mx-auto text-light h6 w-75 fw-bold">Qual é o ambiente de aprendizagem que prefere?</div>
            <div className="btn-group d-flex flex-column mt-4">
              <button
                className={`mb-2 button text-light py-2 ${campo3 === "Um local silencioso" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo3, "Um local silencioso")}
              >
                Um local silencioso
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo3 === "Um ambiente com música suave" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo3, "Um ambiente com música suave")}
              >
                Um ambiente com música suave
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo3 === "Um espaço de estudo movimentado" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo3, "Um espaço de estudo movimentado")}
              >
                Um espaço de estudo movimentado
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo3 === "Ambiente ao ar livre" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo3, "Ambiente ao ar livre")}
              >
                Ambiente ao ar livre
              </button>
            </div>
          </div>
          <div className="col-3 text-center">
            <div className="icon text-light mb-3 mx-auto">
              <FontAwesomeIcon icon={faSitemap} className="text-info" />
            </div>
            <div className="text-wrapper mx-auto text-light h6 w-75 fw-bold">Como lida com informações complexas?</div>
            <div className="btn-group d-flex flex-column mt-4">
              <button
                className={`mb-2 button text-light py-2 ${campo4 === "Organizar em notas e esquemas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo4, "Organizar em notas e esquemas")}
              >
                Organizar em notas e esquemas
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo4 === "Ouvir explicações detalhadas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo4, "Ouvir explicações detalhadas")}
              >
                Ouvir explicações detalhadas
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo4 === "Gráficos e imagens para simplificar" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo4, "Gráficos e imagens para simplificar")}
              >
                Gráficos e imagens para simplificar
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo4 === "Experimentar e resolver problemas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo4, "Experimentar e resolver problemas")}
              >
                Experimentar e resolver problemas
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-around mb-5">
          <div className="col-3 text-center">
            <div className="icon text-light mb-3 mx-auto">
              <FontAwesomeIcon icon={faFlagCheckered} className="text-info" />
            </div>
            <div className="text-wrapper mx-auto text-light h6 w-75 fw-bold">Com  um novo desafio, qual é a sua abordagem preferida?</div>
            <div className="btn-group d-flex flex-column mt-4">
              <button
                className={`mb-2 button text-light py-2 ${campo5 === "Planear cuidadosamente" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo5, "Planear cuidadosamente")}
              >
                Planear cuidadosamente
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo5 === "Conversar com especialistas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo5, "Conversar com especialistas")}
              >
                Conversar com especialistas
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo5 === "Tentar diferentes abordagens" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo5, "Tentar diferentes abordagens")}
              >
                Tentar diferentes abordagens
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo5 === "Agir e aprender com a experiência" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo5, "Agir e aprender com a experiência")}
              >
                Agir e aprender com a experiência
              </button>
            </div>
          </div>
          <div className="col-3 text-center">
            <div className="icon text-light mb-3 mx-auto">
              <FontAwesomeIcon icon={faClock} className="text-info" />
            </div>
            <div className="text-wrapper mx-auto text-light h6 w-75 fw-bold">Qual a sua atitude em relação a prazos de entrega?</div>
            <div className="btn-group d-flex flex-column mt-4">
              <button
                className={`mb-2 button text-light py-2 ${campo6 === "Gosto de seguir um cronograma" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo6, "Gosto de seguir um cronograma")}
              >
                Gosto de seguir um cronograma
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo6 === "Explicar verbalmente, fazer perguntas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo6, "Explicar verbalmente, fazer perguntas")}
              >
                Explicar verbalmente, fazer perguntas
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo6 === "Demonstrar com exemplos práticos" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo6, "Demonstrar com exemplos práticos")}
              >
                Demonstrar com exemplos práticos
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo6 === "Ensinar através de atividades práticas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo6, "Ensinar através de atividades práticas")}
              >
                Ensinar através de atividades práticas
              </button>
            </div>
          </div>
          <div className="col-3 text-center">
            <div className="icon text-light mb-3 mx-auto">
              <FontAwesomeIcon icon={faCheckSquare} className="text-info" />
            </div>
            <div className="text-wrapper mx-auto text-light h6 w-75 fw-bold">Como costuma reagir ao feedback crítico?</div>
            <div className="btn-group d-flex flex-column mt-4">
              <button
                className={`mb-2 button text-light py-2 ${campo7 === "Aceito e aplico as sugestões" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo7, "Aceito e aplico as sugestões")}
              >
                Aceito e aplico as sugestões
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo7 === "Levo em consideração o feedback" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo7, "Levo em consideração o feedback")}
              >
                Levo em consideração o feedback
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo7 === "Fico defensivo com feedback crítico" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo7, "Fico defensivo com feedback crítico")}
              >
                Fico defensivo com feedback crítico
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo7 === "Prefiro não receber feedback crítico" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo7, "Prefiro não receber feedback crítico")}
              >
                Prefiro não receber feedback crítico
              </button>
            </div>
          </div>
          <div className="col-3 text-center">
            <div className="icon text-light mb-3 mx-auto">
              <FontAwesomeIcon icon={faGraduationCap} className="text-info" />
            </div>
            <div className="text-wrapper mx-auto text-light h6 w-75 fw-bold">Quando ensina algo a alguém, como o faz?</div>
            <div className="btn-group d-flex flex-column mt-4">
              <button
                className={`mb-2 button text-light py-2 ${campo8 === "Usar gráficos, esquemas e diagramas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo8, "Usar gráficos, esquemas e diagramas")}
              >
                Usar gráficos, esquemas e diagramas
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo8 === "Explicar verbalmente, fazer perguntas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo8, "Explicar verbalmente, fazer perguntas")}
              >
                Explicar verbalmente, fazer perguntas
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo8 === "Demonstrar com exemplos práticos" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo8, "Demonstrar com exemplos práticos")}
              >
                Demonstrar com exemplos práticos
              </button>
              <button
                className={`mb-2 button text-light py-2 ${campo8 === "Ensinar através de atividades práticas" ? "active" : ""}`}
                onClick={() => handleButtonClick(setcampo8, "Ensinar através de atividades práticas")}
              >
                Ensinar através de atividades práticas
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-between mt-5 mb-5">
          {chatMensage.length > 0 && (
            <p className="bot-message text-light text-left col-11">
              {chatMensage[chatMensage.length - 1].text}
            </p>
          )}
          <div className="col-1">
            {showButtons ? (
              <>
                <button className="button-send my-2 text-light py-2 px-2 like" onClick={updateLikeCount}>
                  <FontAwesomeIcon className="px-2" icon={faThumbsUp} />
                </button>
                <button className="button-send my-2 text-light py-2 px-2 dislike" onClick={updateDislikeCount}>
                  <FontAwesomeIcon className="px-2" icon={faThumbsDown} />
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className="row justify-content-around mt-5 mb-5">
          <div className="message-input">
            <div className="input-group">
              <input type="text" className="form-control mx-4 input-bg text-light bg-dark " placeholder="Escreva qual o  tema que é do seu interesse..." value={message} onChange={value => setMensagem(value.target.value)} />
              <div className="input-group-append">
                <button className=" button-send my-2 text-light py-2 px-2" onClick={sendMensagem}><FontAwesomeIcon className="px-2" icon={faPaperPlane} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default App;
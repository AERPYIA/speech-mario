const mario = document.querySelector(".mario"); 
const pipe = document.querySelector(".pipe"); 
const moeda = document.querySelector("#moeda"); 

//voz
const webkitSpeechRecognition = document.querySelector(".speechApi")
const textarea = document.querySelector("#textarea")
const btnGravar = document.querySelector("#btnGravar")
const btnParar = document.querySelector("#btnParar")
const btnGravarmodal = document.querySelector("#btnGravarmodal")
const btnPararmodal = document.querySelector("#btnPararmodal")
const textareamodal = document.querySelector("#textareamodal")
const btnGravargover = document.querySelector("#btnGravargover")
const btnParargover = document.querySelector("#btnParargover")


const btnStart = document.querySelector("#btnStart")
const modal = document.querySelector('#modal');
const modalStart = document.querySelector('#modalStart');
const modalGameOver = document.querySelector('#modalGameOver');
const btnReiniciar = document.querySelectorAll('#btnReiniciar');
const btnRanking = document.querySelector('#btnRanking');
const cenario = document.querySelector('#cenario');
const pontuacao = document.querySelector('#pontuacao');
const tempo = document.querySelector('#tempo');


const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 2500);
};

const validaJogador = ({ target }) => {

    if (target.value.length > 0) {
        // Habilita o botão
        btnStart.removeAttribute('disabled')

        // Acesso pelo click do mouse. Chama a função que inicia o jogo.
        btnStart.addEventListener('click', comecar);

        // Acesso pelo enter do teclado
        window.addEventListener('keypress', ({ key }) => {
            if (key === 'Enter') {
                // Chama a função que inicia o jogo.
                comecar();
            }
        })

        // Pega o nome do jogador
        nomeJogador = target.value.trim().toUpperCase();

    } else {
        // Desabilita o botão
        btnStart.setAttribute('disabled', '');
    }
}; 
inputJogador.addEventListener('input', validaJogador);

const limpaTexto = () => {
    inputJogador.value = '';
};

const nomevoz = () =>{
  textarea.value = textarea.value.replace(/nome/, '')

  inputJogador.value = textarea.value.replace(' ', '')
}
var cronometro
let points = 0
const loopDoJogo = setInterval(() => {
  const pipePosition = pipe.offsetLeft; 
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", ""); 
  const moedaPosition = +window.getComputedStyle(moeda).bottom.replace("px", ""); 
  pipe.classList.add('desabilitar')
  moeda.classList.add('desabilitar')
  console.log(moedaPosition)


  if (pipePosition <= 120 && pipePosition > 0 && marioPosition > 80 && moedaPosition <=103){
    moeda.style.bottom = "572px"
    points++
    pontuacao.innerHTML = points

    setTimeout(() => {
      moeda.style.bottom = "102px"
    }, 1000);
  }
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`; 

    mario.src = "./img/game-over.png";
    mario.style.width = "80px";
    mario.style.marginLeft = "50px";

    moeda.style.animation ='none'
    moeda.classList.remove('active')

    clearInterval(loopDoJogo); 
    clearInterval(cronometro)

    modal.classList.remove('desabilitar'); 
    modalGameOver.classList.add('active'); 
  }
});

const comecar = () => {
  modal.classList.add('desabilitar');
  modalStart.classList.remove('active');
  pipe.classList.add('active')
  moeda.classList.add('active')
  limpaTexto();
  textarea.value = ""

  var value = parseFloat(tempo.innerHTML)

  cronometro = setInterval(() => {
    value ++
    
    tempo.innerHTML = value
  }, 1000);
};
const reiniciar = () => {
  location.reload();
};
btnReiniciar.forEach((btn) => {
  btn.addEventListener('click', reiniciar);
});


// VVVVVVVVVVVVVVVVVVVVVVVVVVVVVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

class speechApi {

  constructor() {

    const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition
    this.speechApi = new SpeechToText()
    this.output = textarea.output 
    this.speechApi.continuous = true
    this.speechApi.lang = "pt-BR"
    
    this.speechApi.onresult = (e) => {
      var resultIndex = e.resultIndex
      var transcript = e.results[resultIndex][0].transcript

      textarea.value += transcript
      if(transcript.match(/pular/)){
        jump()
      }
      textareamodal.value += transcript
      if(transcript.match(/iniciar/)){
        comecar()
        textarea.disabled = false
      }
      if(transcript.match(/reiniciar/)){
        reiniciar()
        btnGravarmodal.disabled = true
      }
      if(transcript.match(/nome/)){
        nomevoz()
        stop()
        btnStart.removeAttribute('disabled')
      }
    }
  }

  start() {
    this.speechApi.start()
  }

  stop() {
    this.speechApi.stop()
  }
}
var speech = new speechApi()
btnGravar.addEventListener("click", e => {
    btnGravar.disabled = true
    btnParar.disabled = false
    speech.start()
    btnGravargover.disabled = true
    btnParargover.disabled = false
})
btnParar.addEventListener("click", () => {
    btnGravar.disabled = false
    btnParar.disabled = true
    speech.stop()
    btnGravargover.disabled = false
    btnParargover.disabled = true
})
btnGravarmodal.addEventListener("click", e => {
    btnGravarmodal.disabled = true
    btnPararmodal.disabled = false
    speech.start()
    btnGravar.disabled = true
    btnParar.disabled = false
    btnGravargover.disabled = true
    btnParargover.disabled = false
})
btnPararmodal.addEventListener("click", () => {
    btnGravarmodal.disabled = false
    btnPararmodal.disabled = true
    speech.stop()
    btnParar.disabled= true
    btnGravar.disabled = false
    btnGravargover.disabled = false
    btnParargover.disabled = true
})
btnGravargover.addEventListener("click", e => {
    btnGravargover.disabled = true
    btnParargover.disabled = false
    speech.start()
    btnGravar.disabled = true
    btnParar.disabled = false
})
btnParargover.addEventListener("click", () => {
    btnGravargover.disabled = false
    btnParargover.disabled = true
    speech.stop()
    btnParar.disabled= true
    btnGravar.disabled = false
});

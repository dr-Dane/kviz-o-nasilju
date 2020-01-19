const startButton = document.getElementById('start-btn')
const startText = document.getElementById('start-text')
const endText = document.getElementById('end-text')
const nextButton = document.getElementById('next-btn')
const pitanjaContainerElement = document.getElementById('pitanja-container')
const pitanjaElement = document.getElementById('pitanja')
const odgovoriButtonsElement = document.getElementById('odgovori-buttons')


let izmesanaPitanja, trenutnoPitanjeIndex, poljeJeOznaceno

startButton.addEventListener('click', pocniKviz)
nextButton.addEventListener('click', () => {
  trenutnoPitanjeIndex++
  sledecePitanje()
})

function pocniKviz() {
  poljeJeOznaceno=false;
  startButton.classList.add('hide')
  startText.classList.add('hide')
  endText.classList.add('hide')
  izmesanaPitanja = pitanja.sort(() => Math.random() - .5)
  trenutnoPitanjeIndex = 0
  pitanjaContainerElement.classList.remove('hide')
  sledecePitanje()
}

function sledecePitanje() {
  resetState()
  prikaziPitanje(izmesanaPitanja[trenutnoPitanjeIndex])
}

function prikaziPitanje(pitanje) {
  poljeJeOznaceno=false;
  pitanjaElement.innerText = pitanje.pitanje
  pitanje.odgovori.forEach(odgovori => {
    const button = document.createElement('button')
    button.innerText = odgovori.text
    button.classList.add('btn')
    if (odgovori.correct) {
      button.dataset.correct = odgovori.correct
    }
    button.addEventListener('click', izaberiOdgovor)
    odgovoriButtonsElement.appendChild(button)
  })
}

function resetState() {
  izbrisiStatus(document.body)
  nextButton.classList.add('hide')
  while (odgovoriButtonsElement.firstChild) {
    odgovoriButtonsElement.removeChild(odgovoriButtonsElement.firstChild)
  }
}

function izaberiOdgovor(e) {
  if(!poljeJeOznaceno){
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(odgovoriButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  e.target.classList.add('chosenAnswer')
  poljeJeOznaceno=true;
  
  if (izmesanaPitanja.length > trenutnoPitanjeIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Поново тестирај своје знање'
    startButton.classList.remove('hide')
    endText.classList.remove('hide')
    //pitanjaContainerElement.classList.remove('hide')
  }
  }
}

function setStatusClass(element, correct) {
  izbrisiStatus(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function izbrisiStatus(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const pitanja = [
  {
    pitanje: 'Коју врсту насиља представљају следећи облици понашања – вређање, подсмевање, оговарање?',
    odgovori: [
      { text: 'Физичко', correct: false },
      { text: 'Сексуално', correct: false },
      { text: 'Емоционално', correct: true }
    ]
  },
  {
    pitanje: 'Када те неко исмева или удара никако не смеш:',
    odgovori: [
      { text: 'Потражити помоћ', correct: false },
      { text: 'Рећи особи која чини насиље да те повређује такво понашање', correct: false },
      { text: 'Ћутати о томе', correct: true },
      { text: 'Поверити се одраслој особи', correct: false }
    ]
  },
  {
    pitanje: 'Коју врсту насиља представљају следећи облици понашања – отимање, измицање столице, пљување?',
    odgovori: [
      { text: 'Физичко', correct: true },
      { text: 'Сексуално', correct: false },
      { text: 'Социјално', correct: false }
    ]
  },
  {
    pitanje: 'Када ти непозната особа шаље поруке на друштвеним мрежама, ти ћеш:',
    odgovori: [
      { text: 'Додати особу за пријатеља', correct: false },
      { text: 'Прихватити поруку и наставити са дописивањем', correct: false },
      { text: 'Похвалити се пријатељима', correct: false },
      { text: 'Избрисати поруку без читања', correct: true }
    ]
  },
  {
    pitanje: 'Коју врсту насиља представљају следећи облици понашања – узнемиравајући позиви и поруке:',
    odgovori: [
      { text: 'Електронско насиље', correct: true },
      { text: 'Емоционално насиље', correct: false },
      { text: 'Социјално насиље', correct: false }
    ]
  },
  {
    pitanje: 'Шта од понуђеног не спада у насиље?',
    odgovori: [
      { text: 'Када неког оговараш а он то не', correct: false },
      { text: 'Када се не слажеш са мишљењем најбољег друга/другарице и то им кажеш', correct: true },
      { text: 'Када те неко провоцира и ради ствари за које зна да те љуте', correct: false },
      { text: 'Када се у затвореној групи упустиш у свађу и вређање особе која није у тој групи', correct: false }
    ]
  },
  {
    pitanje: 'Коју врсту насиља представљају следећи облици понашања – подсмевање, претња, застрашивање??',
    odgovori: [
      { text: 'Физичко насиље', correct: false },
      { text: 'Емоционално насиље', correct: true },
      { text: 'Сексуално насиље', correct: false }
    ]
  },
  {
    pitanje: 'Насиље у вези је:',
    odgovori: [
      { text: 'Када девојка тражи од дечка да обрише све своје другарице са друштвених мрежа', correct: false },
      { text: 'Када те дечко или девојка наговара на нешто што не желиш', correct: false },
      { text: 'Када те дечко или девојка додирују без твог одобрења', correct: false },
      { text: 'Све од наведеног', correct: true }
    ]
  },
  {
    pitanje: 'Коју врсту насиља представљају следећи облици понашања – искључивање из заједничких активности, игнорисање?',
    odgovori: [
      { text: 'Емоционално насиље', correct: false },
      { text: 'Социјално насиље', correct: true },
      { text: 'Физичко насиље', correct: false }
    ]
  },
  {
    pitanje: 'Особа која доживљава насиље, најчешће је:',
    odgovori: [
      { text: 'Сама крива за то што јој се догађа јер провоцира својим понашањем', correct: false },
      { text: 'Може бити свако од нас независно од понашања, изгледа или оцена', correct: true },
      { text: 'Има потешкоће у школи, лоше оцене', correct: false },
      { text: 'Тиха и повучена, нема праве пријатеље', correct: false }
    ]
  },
  {
    pitanje: 'Коју врсту насиља представљају следећи облици понашања – уцењивање уз претње, изнуђивање новца и ствари?',
    odgovori: [
      { text: 'Физичко насиље', correct: false },
      { text: 'Емоционално насиље', correct: true },
      { text: 'Електронско насиље', correct: false }
    ]
  },
  {
    pitanje: 'На интернету смеш да:',
    odgovori: [
      { text: 'Отвориш лажни профил', correct: false },
      { text: 'Дописујеш се са пријатељима', correct: true },
      { text: 'Делиш личне информације о себи (име и презиме, адресу...)', correct: false },
      { text: 'Шаљеш своје фотографије непознатој особи', correct: false }
    ]
  },
  {
    pitanje: 'Коју врсту насиља представљају следећи облици понашања – снимање камером против воље појединца, снимање камером насилних сцена и дељење...?',
    odgovori: [
      { text: 'Електронско насиље', correct: true },
      { text: 'Социјално насиље', correct: false },
      { text: 'Физичко насиље', correct: false }
    ]
  },
  {
    pitanje: 'Када те неко удари, најбоље је:',
    odgovori: [
      { text: 'Узвратити истом мером', correct: false },
      { text: 'Никоме не рећи', correct: false },
      { text: 'Позвати неког старијег да га истуче', correct: false },
      { text: 'Пријавити некој одраслој особи', correct: true }

    ]
  },
  {
    pitanje: 'Коју врсту насиља представљају следећи облици понашања – вулгарни коментари, нежељени додири...?',
    odgovori: [
      { text: 'Сексуално насиље', correct: true },
      { text: 'Емоционално насиље', correct: false },
      { text: 'Социјално насиље', correct: false }

    ]
  },
  {
    pitanje: 'Деца која врше насиље најчешће то раде јер су:',
    odgovori: [
      { text: 'Зле особе', correct: false },
      { text: 'Доминантнији су од осталих', correct: false },
      { text: 'Дубоко су несрећни а можда су и сами преживели неку врсту насиља', correct: true }
    ]
  },
  {
    pitanje: 'Коју врсту насиља представљају следећи облици понашања – чупање, шамарање, гађање?',
    odgovori: [
      { text: 'Социјално насиље', correct: false },
      { text: 'Физичко насиље', correct: true },
      { text: 'Емоционално насиље', correct: false }
    ]
  },
  {
    pitanje: 'Ако у ходнику школе видиш да се догађа насиље, најбоље је да:',
    odgovori: [
      { text: 'Снимиш телефоном да би имао доказ да се насиље десило', correct: false },
      { text: 'Физички нападнеш насилника ако видиш да си јачи', correct: false },
      { text: 'Ништа, то није твоја ствар', correct: false },
      { text: 'Пријавити шта се догађа одраслој особи од поверења', correct: true }

    ]
  }
]
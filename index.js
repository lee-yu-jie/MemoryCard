"use strict";
const cardContainer = document.querySelector('.container');
const restartBtn = document.querySelector('.restartBtn');
let originalImgList = [
    'Angular',
    'Pinia',
    'React',
    'Vue',
    'Tailwind',
    'JavaScript',
    'Bootstrap',
    'CSS',
    'Redux'
];
const randomImgList = [];
const cardArr = [];
const cardAmount = 24;
let amountOfSuccessfulMatches = 0;
let timer;
let matchingCardArr = [];
let isStart = false;
originalImgList.forEach(img => {
    const randomInteger = Math.floor(Math.random() * randomImgList.length);
    randomImgList.splice(randomInteger, 0, img);
});
function generateRandomCardArr() {
    let cardIndex = 0;
    for (let i = 0; i < cardAmount; i = i + 2) {
        for (let j = 0; j < 2; j++) {
            const randomInteger = Math.floor(Math.random() * cardArr.length);
            let cardInfo = {
                id: i,
                img: randomImgList[cardIndex]
            };
            cardArr.splice(randomInteger, 0, cardInfo);
        }
        if (cardIndex === randomImgList.length - 1) {
            cardIndex = 0;
        }
        else {
            cardIndex++;
        }
    }
}
generateRandomCardArr();
function createCard(cardInfo) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-img', cardInfo.img);
    card.setAttribute('data-id', cardInfo.id.toString());
    const front = document.createElement('div');
    front.classList.add('front');
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(img/${cardInfo.img}.png)`; // 設置背景圖片
    card.appendChild(front);
    card.appendChild(back);
    cardContainer.appendChild(card);
    return card;
}
cardArr.forEach(cardInfo => {
    const card = createCard(cardInfo);
    card.addEventListener('click', function () {
        if (matchingCardArr.length === 2)
            return;
        if (!isStart) {
            isStart = true;
            formatTime();
        }
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            matchingCardArr.push(this);
        }
        else {
            matchingCardArr = matchingCardArr.filter((card) => card.dataset.id !== this.dataset.id);
        }
        if (matchingCardArr.length === 2) {
            handleCompareCards(matchingCardArr[0].dataset.img === matchingCardArr[1].dataset.img);
        }
        handelFinishGame(cardAmount === amountOfSuccessfulMatches);
    });
});
function handleCompareCards(areTwoCardsTheSame) {
    if (areTwoCardsTheSame) {
        matchingCardArr.forEach(card => {
            amountOfSuccessfulMatches++;
            card.style.pointerEvents = 'none';
        });
        matchingCardArr = [];
    }
    else {
        setTimeout(() => {
            matchingCardArr[0].classList.remove('active');
            matchingCardArr[1].classList.remove('active');
            matchingCardArr = [];
        }, 500);
    }
}
function handelFinishGame(isFinish) {
    if (isFinish) {
        clearInterval(timer);
        setTimeout(() => {
            alert('恭喜你完成遊戲');
        }, 500);
    }
}
function formatTime() {
    let time = 0;
    const timeArea = document.querySelector('.time-area');
    timer = setInterval(() => {
        time++;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        timeArea.textContent = `${minutes}:${seconds}`;
    }, 1000);
}
restartBtn.addEventListener('click', () => {
    clearInterval(timer);
    window.location.reload();
});

var isCardActive = false;
var prevId = '';
var activeCardsNo = 0;
var score = 0;
var isGameOver = 0;
const totalCards = 20;
var popup = document.querySelector('.popup');

const imagesPosition =
    [0, 1, 0, 2, 3,
        3, 2, 4, 3, 1,
        4, 4, 0, 1, 2,
        4, 1, 2, 3, 0];

setCardsImages();

function flip(element) {

    activeCardsNo++;
    if (activeCardsNo <= 2) {
        if (isCardActive && element.parentElement.style.transform === 'rotateY(180deg)') {
            activeCardsNo = 1;
        }
        
        else if (!isCardActive && element.parentElement.style.transform === 'rotateY(180deg)') {
            activeCardsNo = 0;
        }

        else if (isCardActive && element.nextElementSibling.id !== prevId) {

            element.parentElement.style.transform = 'rotateY(180deg)';

            if (document.getElementById(prevId).style.backgroundImage !== element.nextElementSibling.style.backgroundImage) {
                //if both images are different
                setTimeout(() => {
                    score = score - 40;// -40 for every wrong guess
                    document.getElementById(prevId).parentElement.style.transform = '';
                    element.parentElement.style.transform = '';
                    isCardActive = false; //set card state to deactive
                    activeCardsNo = 0;
                    //updating the score
                    document.getElementById('score').innerText = score;
                }, 700);

            }
            else {
                //if both images are same
                setTimeout(() => {
                    isCardActive = false; //set card state to deactive
                    activeCardsNo = 0;
                    score = score + 100; // +100 for every correct guess
                    //updating the score
                    document.getElementById('score').innerText = score;
                    isGameOver += 2;
                    console.log(isGameOver);
                    if (isGameOver === totalCards) {
                        showWinningPopup();
                    }
                }, 700)
            }

        }
        else if (!isCardActive) {
            element.parentElement.style.transform = 'rotateY(180deg)';
            prevId = element.nextElementSibling.id;
            isCardActive = true; //set card state to active
        }
        else if (isCardActive && element.nextElementSibling.id === prevId) {
            isCardActive = true; //card remains in active state
            activeCardsNo = 1;
        }
    }

}


function setCardsImages() {
    for (let i = 1; i <= 20; i++) {
        let caseNo = imagesPosition[i - 1];
        switch (caseNo) {
            case 0:
                document.getElementById('card-' + i).style.backgroundImage = 'url("../images/shiva.png")';
                break;
            case 1:
                document.getElementById('card-' + i).style.backgroundImage = 'url("../images/lingam.png")';
                break;
            case 2:
                document.getElementById('card-' + i).style.backgroundImage = 'url("../images/om.png")';
                break;
            case 3:
                document.getElementById('card-' + i).style.backgroundImage = 'url("../images/shankh.png")';
                break;
            case 4:
                document.getElementById('card-' + i).style.backgroundImage = 'url("../images/trishool.png")';
                break;
        }
    }

    showPopup();
}

function showAllImages() {
    setTimeout(() => {
        document.querySelectorAll('.flip-card-inner').forEach((element) => {
            element.style.transform = 'rotateY(180deg)';
        })
        setTimeout(() => {
            document.querySelectorAll('.flip-card-inner').forEach((element) => {
                element.style.transform = '';
                popup.parentElement.style.zIndex = "-9999";
            })
        }, 2000);
    }, 1000);
}


function showPopup() {
    popup.style.display = "block";
    document.getElementById('back-btn').style.display='none';
    document.getElementById("popup-effected-blur-area").classList.add("blur-filter");
}

function hidePopup() {
    popup.style.display = "none";
    document.getElementById("popup-effected-blur-area").classList.remove("blur-filter");
    showAllImages();
}

function showWinningPopup() {
    document.querySelector('.popup-heading').innerText = 'Hurrah !!! You have won the Game';
    document.querySelector('.popup-para').innerText = 'Congratulations on completing the DevaSthanam puzzle. We hope you enjoyed and had a great time playing. Your Score will be converted to coins.';
    // document.querySelector('.popup-btn'). = 'none';
    popup.style.display = "block";
    popup.parentElement.style.zIndex = '9999';
    document.getElementById('back-btn').style.display='';
    document.getElementById('start-btn').style.display='none';

}


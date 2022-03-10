const popup = document.querySelector(".popup");
const quizSections = document.getElementById("quiz-sections");
const mainQuiz = document.getElementById("main");
mainQuiz.style.display = 'none';
const scoreWindow = document.getElementById('score-window');
scoreWindow.style.display = 'none';
document.getElementById('check-btn').style.display='none';
document.getElementById('prev-btn').style.display='none';
document.getElementById('submit-btn').style.display='none';
document.getElementById("back-btn").style.display='none';
var coins=0;


var Qdata = [];
var Adata = [];
if (sessionStorage.getItem('ispopupshown') === null)
  sessionStorage.setItem('ispopupshown', 'false');
//calling popup function if popup is not shown previously
if (sessionStorage.getItem('ispopupshown') === 'false')
  showPopup();
else
  hidePopup();
//popup-functions
function showPopup() {
  popup.style.display = "block";
  document.getElementById("popup-effected-blur-area").classList.add("blur-filter");
}

function hidePopup() {
  popup.style.display = "none";
  popup.parentElement.style.zIndex = '-9999';
  document.getElementById("popup-effected-blur-area").classList.remove("blur-filter");
  sessionStorage.setItem('ispopupshown', 'true');
}

function showHistorical() {
  correctanswered.clear();
  answered.clear();
  resetColors();
  indexCounter = 0;
  quizSections.style.display = 'none';
  mainQuiz.style.display = 'block';
  document.getElementById("option-container").style.display = 'block';
  document.getElementById("qr-container").style.display = 'none';
  document.getElementById("scan-qr").style.display = 'none';
//   document.getElementById("check-btn").style.display = '';

  // !!! Very Important- question must be in tempalate ex- ':' is necessary just after Qno. . I used QQ and qqa,qqb,qqc,qqd to separate question and options.

  Qdata = [
    "Q1: Who constructed Yamunotri Temple? QQ qqa) Naresh Sudarshan Shah qqb) Gyanendra Bikram Shah qqc) King Tribhuvan qqd) Prithvi Narayan Shah",
    "Q2: In which year, it was constructed? QQ qqa) 1836 qqb) 1830 qqc) 1839 qqd) 1832",
    "Q3: Which Goddess is praised in Yamunotri Temple? QQ qqa) Goddess Ganga qqb) Goddess Yamuna qqc) Goddess Tapti qqd) Goddess Saraswati",
    "Q4: Who reconstructed Yamunotri Temple? QQ qqa) Maharaja Pratapshah qqb) Prithvi Narayan Shah qqc) Naresh Sudarshan Shah qqd) Maharani Gularia Devi",
    "Q5: Goddess Yamuna is whose daughter? QQ qqa) God Moon qqb) God Sun and Devi Sanjna qqc) God Brahma qqd) God Shiva"
  ];
  Adata = [
    "a) Naresh Sudarshan Shah QQ Naresh Sudarshan Shah, king of Tehri constructed Yamunotri Temple.",
    "c) 1839 QQ constructed in year 1839 by Naresh Sudarshan Shah.",
    "b) Goddess Yamuna QQ Yamunotri Temple is dedicated to Goddess Yamuna.",
    "d) Maharani Gularia Devi QQ Reconstruction was done by Maharani Gularia Devi after a massive portion of the temple was damaged due to an earthquake.",
    "b) God Sun and Devi Sanjna QQ Yamunotri Temple is dedicated to Goddess Yamuna."
  ];
  iterateQuestion(0);
}

function showGeographical() {
  correctanswered.clear();
  answered.clear();
  resetColors();
  indexCounter = 0;
  quizSections.style.display = 'none';
  mainQuiz.style.display = 'block';
  document.getElementById("option-container").style.display = 'block';
  document.getElementById("qr-container").style.display = 'none';
  document.getElementById("scan-qr").style.display = 'none';
//   document.getElementById("check-btn").style.display = '';


  // !!! Very Important- question must be in tempalate ex- ':' is necessary just after Qno. . I used QQ and qqa,qqb,qqc,qqd to separate question and options.
  Qdata = [
    "Q1: Where is Yamunotri Temple situated? QQ qqa) Nilgiri parvat qqb) Aravali parvat qqc) Bandarpooch parvat qqd) Himalayas",
    "Q2: What is the Height of Yamunotri Temple? QQ qqa) 1800m qqb) 2300m qqc) 3567m qqd) 3291m",
    "Q3: Which hot water kund is situated there? QQ qqa) Surya kund qqb) Gomukh kund qqc) Gauri kund qqd) Rishi kund",
    "Q4: What is the pattern of architecture of yamunotri temple? QQ qqa) Modern Architecture qqb) Gothic Architecture qqc) Nagara Architecture qqd) Postmodern Architecture",
    "Q5: Where is Yamunotri Glacier found? QQ qqa) The Greater Himalayas qqb) Garhwal Himalayas  qqc) The Eastern Himalayas qqd) The Trans-Himalayas"
  ];
  Adata = [
    "c) Bandarpooch parvat QQ Yamunotri is located on a flank of Bandarpooch temple.",
    "d) 3291m QQ Height of yamunotri temple is 3291m",
    "a) Surya kund QQ Surya Kund is situated in Yamunotri.",
    "c) Nagara Architecture QQ yamunotri temple follows Nagara pattern of architecture.",
    "b) Garhwal Himalayas QQ Yamunotri glacier is found in Garwhal Himalayas and located approximately 150km North of Uttrakashi."
  ];
  iterateQuestion(0);

}

var isLiveQuizActive = false;
document.getElementById("qr-container").style.display = 'none';
document.getElementById("scan-qr").style.display = 'none';
function showLive() {
  correctanswered.clear();
  answered.clear();
  resetColors();
  document.getElementById("qr-container").style.display = '';
  document.getElementById("img-container").style.display = '';
  document.getElementById("check-btn").style.display = 'none';
  document.getElementById("scan-qr").style.display = '';

  indexCounter = 0;
  isLiveQuizActive = true;
  quizSections.style.display = 'none';
  mainQuiz.style.display = 'block';
  document.getElementById("option-container").style.display = 'none';
  Qdata = [
    "Q1: Find q1 and Scan QR code near the place as shown in the following image:",
    "Q2: Find q2 and Scan QR code near the place as shown in the following image:",
    "Q3: Find q3 and Scan QR code near the place as shown in the following image:"
  ];
  Adata = [
    "Live Q1",
    "Answer of Kedernath Live Quiz Q2",
    "Answer of Kedernath Live Quiz Q3"
  ];
  iterateLiveQ(0);
}

//Iterating between Live questions
function iterateLiveQ(index) {
  qno.innerText = Qdata[index].substring(0, Qdata[index].indexOf(":") + 1);
  question.innerText = Qdata[index].substring(Qdata[index].indexOf(":") + 1);
  correctOption = Adata[index];
  qImg.src = 'images/live-q' + qno.innerText.substring(1, 2) + '.jpg';
  scannedValue.innerText = '';
  document.getElementById("qr-container").style.display = '';
  document.getElementById("scan-qr").disabled = false;
  document.getElementById("scan-qr").innerText = 'Scan QR';
}



//  Quiz
//Variables
const question = document.getElementById("question");
const qno = document.getElementById("q-no");
const qImg = document.getElementById('q-img');
var optionA = document.getElementById("option-a");
var optionB = document.getElementById("option-b");
var optionC = document.getElementById("option-c");
var optionD = document.getElementById("option-d");
const scannedValue = document.getElementById('outputData');
var correctOption;
const answered = new Set();
const correctanswered = new Set();
const details = document.querySelectorAll(".details");


//Iterating between questions
function iterateQuestion(index) {
  qno.innerText = Qdata[index].substring(0, Qdata[index].indexOf(":") + 1);
  question.innerText = Qdata[index].substring(Qdata[index].indexOf(":") + 1, Qdata[index].lastIndexOf("QQ"));
  optionA.value = Qdata[index].substring(Qdata[index].lastIndexOf("qqa") + 2, Qdata[index].lastIndexOf("qqb"));
  optionB.value = Qdata[index].substring(Qdata[index].lastIndexOf("qqb") + 2, Qdata[index].lastIndexOf("qqc"));
  optionC.value = Qdata[index].substring(Qdata[index].lastIndexOf("qqc") + 2, Qdata[index].lastIndexOf("qqd"));
  optionD.value = Qdata[index].substring(Qdata[index].lastIndexOf("qqd") + 2);
  correctOption = Adata[index].substring(0, Adata[index].indexOf('QQ'));
  document.querySelector("label[for=option-a]").innerText = optionA.value;
  document.querySelector("label[for=option-b]").innerText = optionB.value;
  document.querySelector("label[for=option-c]").innerText = optionC.value;
  document.querySelector("label[for=option-d]").innerText = optionD.value;
  document.getElementById("detail-" + correctOption[0]).innerText = Adata[index].substring(Adata[index].indexOf('QQ') + 2);;

}

var indexCounter = 0;



document.getElementById("prev-btn").addEventListener("click", () => {
  if (indexCounter === 0)
    return;
  else {
    resetColors();
    //if quiz is live iterate live quiz
    if (isLiveQuizActive === true)
      iterateLiveQ(--indexCounter)
    else
      iterateQuestion(--indexCounter);
    if (answered.has(qno.innerText)) {
      document.getElementById("check-btn").disabled = true;
      document.getElementById("check-btn").innerText = 'Submitted';
      details.forEach((item) => {
        if (item.innerText !== "QQ")
          item.parentElement.style.display = 'block';
      });
      if (isLiveQuizActive !== true)
        document.querySelector("label[for=option-" + correctOption[0] + "]").style.background = 'green';
    }
  }
});
document.getElementById("next-btn").addEventListener("click", () => {

    if(indexCounter === (Qdata.length - 2)){
        document.getElementById("next-btn").innerText = 'Submit';
    }
  if (indexCounter === (Qdata.length - 1)){
      
      document.getElementById('submit-btn').click();
      document.getElementById("next-btn").innerText = 'Next';

    return;
  }
  else {
    resetColors();
    //if quiz is live iterate live quiz
    if (isLiveQuizActive === true)
      iterateLiveQ(++indexCounter)

    else
      iterateQuestion(++indexCounter);

    if (answered.has(qno.innerText)) {
      document.getElementById("check-btn").disabled = true;
      document.getElementById("check-btn").innerText = 'Submitted';
      details.forEach((item) => {
        if (item.innerText !== "QQ")
          item.parentElement.style.display = 'block';
      });
      if (isLiveQuizActive !== true)
        document.querySelector("label[for=option-" + correctOption[0] + "]").style.background = 'green';
    }

  }
});


document.getElementById("check-btn").addEventListener("click", () => {
  if (isLiveQuizActive === true) {
    var selectedValue = scannedValue.innerText.trim();
    var correctValue = correctOption.trim();


    if (correctValue === selectedValue) {
      //display success popup here
      Swal.fire(
        'Good job!',
        'You Scanned Correct QR!',
        'success'
      )

      //coins update
  coins+= 100;
  document.getElementById("coins").innerText = coins;

      correctanswered.add(qno.innerText);
    }
    else {
      //display error popup here
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You Scanned Wrong QR!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }
  else {
    var selectedOption = document.querySelector('input[name="selectedOption"]:checked');
    var selectedValue = selectedOption.value.trim();
    var correctValue = correctOption.trim();

    if (correctValue === selectedValue) {
      document.querySelector("label[for=" + selectedOption.id + "]").style.background = 'green';
      correctanswered.add(qno.innerText);
      //coins update
      coins+= 50;
      document.getElementById("coins").innerText = coins;
    }
    else {
      document.querySelector("label[for=" + selectedOption.id + "]").style.background = 'red';
      document.querySelector("label[for=option-" + correctValue[0] + "]").style.background = 'green';
    }
    details.forEach((item) => {
      if (item.innerText !== "QQ")
        item.parentElement.style.display = 'block';
    });
  }
  answered.add(qno.innerText);
  document.getElementById("check-btn").disabled = true;
  document.getElementById("check-btn").innerText = 'Submitted';
});

function resetColors() {
  document.getElementById("check-btn").disabled = false;
  document.getElementById("check-btn").innerText = 'Submit';
  document.querySelector("label[for=option-a]").style.background = '';
  document.querySelector("label[for=option-b]").style.background = '';
  document.querySelector("label[for=option-c]").style.background = '';
  document.querySelector("label[for=option-d]").style.background = '';
  let ele = document.getElementsByName("selectedOption");
  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = false;
  }
  details.forEach((item) => {
    item.innerText = "QQ";
    item.parentElement.style.display = 'none';
  });
}



document.getElementById("submit-btn").addEventListener("click", () => {
  document.querySelector('main').style.display = 'none';
  document.getElementById('score-window').style.display = 'block';
  //Correct list Rendering
  let correctList = [...correctanswered];
  let correctAnswers = correctList.reduce((ans, value) => {
    ans = ans + value + ", ";
    return ans;
  }, '');
  if (correctList.length === 0)
    document.getElementById("correct-answers").innerText = "None";
  else
    document.getElementById("correct-answers").innerText = (correctAnswers.substring(0, correctAnswers.lastIndexOf(','))).replaceAll(':', '');

  //Incorrect list Rendering
  let incorrectList = [...([...answered].filter(x => !correctanswered.has(x)))];
  let incorrectAnswers = incorrectList.reduce((ans, value) => {
    ans = ans + value + ", ";
    return ans;
  }, '');
  if (incorrectList.length === 0)
    document.getElementById("incorrect-answers").innerText = "None";
  else
    document.getElementById("incorrect-answers").innerText = (incorrectAnswers.substring(0, incorrectAnswers.lastIndexOf(','))).replaceAll(':', '');

    var coinsEarned;
  //Coins Rendering
  if(isLiveQuizActive===true)
  coinsEarned = 100 * (correctanswered.size);
  else
  coinsEarned = 50 * (correctanswered.size);


  document.getElementById("coins-earned").innerText = coinsEarned;

});

document.getElementById("finish-review").addEventListener("click", () => {
  document.getElementById('score-window').style.display = 'none';
  quizSections.style.display = 'block';
  if (isLiveQuizActive === true) {
    isLiveQuizActive = false;
    document.getElementById("img-container").style.display = "none";
    document.getElementById("qr-container").style.display = "none";
  }
});



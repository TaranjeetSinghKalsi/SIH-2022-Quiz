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
    "Q1: Who constructed Kedarnath Temple? QQ qqa) Aadi Shankaracharaya qqb) Swami Vivekanand qqc) Naresh Sudarshan Shah qqd) General Amar Singh Thapa",
    "Q2: In which century, it was constructed QQ qqa) 6th century qqb) 7th century qqc) 8th century qqd) 5th century",
    "Q3: Which God is praised in Kedarnath temple? QQ qqa) God Vishnu qqb) God Brahma qqc) God Krishna qqd) God Shiva",
    "Q4: How many years old is Kedarnath Temple? QQ qqa) 1500 qqb) 1200 qqc) 1400 qqd) 1700",
    "Q5: What is unique about Kedarnath temple? QQ qqa) Lowest among the 12 Jyotirlingas qqb) Sacred place for Hindus qqc) Highest among the 12 Jyotirlingas qqd) Due to its architecture"
  ];
  Adata = [
    "a) Aadi Shankaracharaya QQ According to the myths, Pandavas built the temple of kedarnath and the present temple was established by Aadi Shankaracharya.",
    "c) 8th century QQ Kedarnath temple was constructed in the 8th century A.D.",
    "d) God Shiva QQ God Shiva is praised in Kedarnath Temple",
    "b) 1200 QQ Kedarnath temple is 1200 years old.",
    "c) Highest among the 12 Jyotirlingas QQ Kedarnath Temple is the highest among the 12 Jyotirlingas"
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
    "Q1: Where is Kedarnath Temple situated? QQ qqa) Himalayas qqb) Nilgiri Parvat qqc) Kailash Parvat qqd) Garhwal Himalayan Range",
    "Q2: Which river flows through the Garwhal Himalayan range? QQ qqa) Mandakini river qqb) Narmada river qqc) Ganga river qqd) Tapti river",
    "Q3: Kedarnath is how many meter above the sea level? QQ qqa) 3000m qqb) 3200m qqc) 3500m qqd) 3583m",
    "Q4: What is the shape of the idol of Lord Shiva inside the temple? QQ qqa) Conical shape qqb) circle shape qqc) Cylindrical shape qqd) Rectangular shape",
    "Q5: What is the pattern of architecture of Kedarnath Temple? QQ qqa) Modern Architecture qqb) Rekha-Sikhara style Architecture qqc) Nagara Architecture qqd) Gothic Architecture"
  ];
  Adata = [
    "d) Garhwal Himalayan Range QQ Kedarnath Temple is situated in Garhwal Himalayan range.",
    "a) Mandakini river QQ Mandakini river flows through the Garwhal Himalayan Range.",
    "d) 3583m QQ Kedarnath temple is about 3583m (11,755 ft) above the sea level.",
    "a) Conical shape QQ The conical Shiva lingam is worshipped as Lord Shiva inside the Temple",
    "b) Rekha-Sikhara style Architecture QQ Kedarnath temple follows Rekha- Sikhara style architecture."
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



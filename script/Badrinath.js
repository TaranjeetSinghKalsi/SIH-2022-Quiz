const popup = document.querySelector(".popup");
const quizSections = document.getElementById("quiz-sections");
const mainQuiz = document.getElementById("main");
mainQuiz.style.display = 'none';
const scoreWindow = document.getElementById('score-window');
scoreWindow.style.display = 'none';
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
  document.getElementById("check-btn").style.display = '';

  // !!! Very Important- question must be in tempalate ex- ':' is necessary just after Qno. . I used QQ and qqa,qqb,qqc,qqd to separate question and options.

  Qdata = [
    "Q1: Who constructed Badrinath Temple? QQ qqa) Aadi Shankaracharya qqb) Ramana Maharishi qqc) Swami Vivekanand qqd) Vyasa",
    "Q2: In which century it was constructed QQ qqa) 10th century qqb) 7th century qqc) 8th century qqd) 11th century",
    "Q3: Which God is praised in the Badrinath Temple? QQ qqa) God Shiva qqb) God Vishnu qqc) God Brahma qqd) God Krishna",
    "Q4: How was Badrinath Temple destroyed? QQ qqa) by Tsunami qqb) by floods qqc) by earthquake qqd) by war",
    "Q5: Where did Shankaracharya discovered the deity of Badrinath? QQ qqa) in the Alaknanda river qqb) in the Forest qqc) in the Temple qqd) in the dream"
  ];
  Adata = [
    "a) Aadi Shankaracharya QQ Badrinath temple was constructed by Aadi Shankaracharya.",
    "b) 7th century QQ The temple was constructed by Aadi Shankaracharya in the early 7th century.",
    "b) God Vishnu QQ In Badrinath Temple, God Vishnu is worshipped as Badrinarayan.",
    "c) by earthquake QQ Temple was destroyed by Himalayan Earthquake in the year 1803.",
    "a) in the Alaknanda river QQ Hindu Followers assert that he Shankaracharya discovered the deity of Badrinath in the Alaknanda river."
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
  document.getElementById("check-btn").style.display = '';


  // !!! Very Important- question must be in tempalate ex- ':' is necessary just after Qno. . I used QQ and qqa,qqb,qqc,qqd to separate question and options.
  Qdata = [
    "Q1: Where is Badrinath Temple situated? QQ qqa) Himalaya parvat qqb) Om parvat qqc) Garhwal hills qqd) Shankaracharya parvat",
    "Q2: What is its height? QQ qqa) 2300m qqb) 3100m qqc) 3400m qqd) 3700m",
    "Q3: What is the Architecture of Badrinath Temple? QQ qqa) Modern Architecture qqb) Gothic Architecture qqc) Nagara Architecture qqd) North-Indian Architecture",
    "Q4: What is the height of the idol present inside the temple? QQ qqa) 1m high qqb) 3m high qqc) 5m high qqd) 4m high",
    "Q5: For which duration, temple is opened for worship? QQ qqa) for whole year qqb) for 3 months  qqc) for 6 months qqd) for 10 months"
  ];
  Adata = [
    "c) Garhwal hills QQ The temple is located in Garhwal hills tracks along the banks of Alaknanda.",
    "b) 3100m QQ According to the sources, height of the Badrinath temple is 3100m",
    "d) North-Indian Architecture QQ Badrinath temple follows traditional North-Indian Architecture.",
    "a) 1m high QQ 1m high black stone idol of God Badrinarayan is present inside the temple.",
    "c) for 6 months QQ Temple is opened only for 6 months ( end of April till the beginning of November)"
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

  if (indexCounter === (Qdata.length - 1))
    return;
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
      correctanswered.add(qno.innerText);
    }
    else {
      //display error popup here
    }
  }
  else {
    var selectedOption = document.querySelector('input[name="selectedOption"]:checked');
    var selectedValue = selectedOption.value.trim();
    var correctValue = correctOption.trim();

    if (correctValue === selectedValue) {
      document.querySelector("label[for=" + selectedOption.id + "]").style.background = 'green';
      correctanswered.add(qno.innerText);
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

  //Coins Rendering
  const coins = 2 * (correctanswered.size);
  document.getElementById("coins-earned").innerText = coins;

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

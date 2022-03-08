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
    "Q1: This is historical Question 1? QQ qqa) Taj Mahal qqb) Khajurao qqc) Hampid qqd) Ajanta",
    "Q2: This is historical Question 2? QQ qqa) Aksardham qqb) Khajuraho qqc) Hampi qqd) Ajanta",
    "Q3: This is historical Question 3? QQ qqa) Taj qqb) Qutub minar qqc) Red Fort qqd) Sanchi"
  ];
  Adata = [
    "a) Taj Mahal QQ One of Seven Wonders of the World, White Marble Mughal Architecture, the Taj Mahal was build by emperor Shah Jahan in the memory of his wife Mumtaj Mahal. It is located at the bank of river Jamuna in Agra. It was completed in 1653 with then estimated cost of 32 million Indian rupees which would today stand upto 58 billion Indian rupees. It is considered as the best example of Mughal architecture worldwide and is called the “Jewel of Muslim Art in India”. This is probably the monument that is most recognised the world over for its association with the heritage of India.",
    "c) Hampi QQ Hampi is a UNESCO World Heritage site located in the Northern part of Karnataka. It lies within the ruins of the ancient, prosperous kingdom of Vijayanagar. The ruins at Hampi are a collection of heritage sites depicting the fine Dravidian style of art and Architecture. The most important heritage monument in this site is the Virupaksha Temple, which continues to be a very important religious centre for the Hindus. There are several other monuments which are a part of this heritage site, Together, they’re collectively known as the ‘Group of Monuments at Hampi’.",
    "c) Red Fort QQ Situated in the centre of the historic city of New Delhi, the Red Fort was built by emperor Shah Jahan when he shifted his capital from Agra to Delhi, or what was known as Shahjahanabad at that time. The fort became the political hub of the Mughals. Under Shah Jahan, Mughal art and architecture reached it’s zenith, and the Red Fort is the perfect example of that. One can see the blending of Indo-Islamic, Timurid, Hindu and Persian forms of architecture in several facets of the Red Fort. It’s made up of red sand stone and houses several other smaller buildings such as the private pavallions, the Diwan-i-aam, the Diwan-i-khas."
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
    "Q1: This is geographical Question 1? QQ qqa) Taj Mahal qqb) Khajurao qqc) Hampid qqd) Ajanta",
    "Q2: This is geographical Question 2? QQ qqa) Aksardham qqb) Khajuraho qqc) Hampi qqd) Ajanta",
    "Q3: This is geographical Question 3? QQ qqa) Taj qqb) Qutub minar qqc) Red Fort qqd) Sanchi"
  ];
  Adata = [
    "a) Taj Mahal QQ One of Seven Wonders of the World, White Marble Mughal Architecture, the Taj Mahal was build by emperor Shah Jahan in the memory of his wife Mumtaj Mahal. It is located at the bank of river Jamuna in Agra. It was completed in 1653 with then estimated cost of 32 million Indian rupees which would today stand upto 58 billion Indian rupees. It is considered as the best example of Mughal architecture worldwide and is called the “Jewel of Muslim Art in India”. This is probably the monument that is most recognised the world over for its association with the heritage of India.",
    "c) Hampi QQ Hampi is a UNESCO World Heritage site located in the Northern part of Karnataka. It lies within the ruins of the ancient, prosperous kingdom of Vijayanagar. The ruins at Hampi are a collection of heritage sites depicting the fine Dravidian style of art and Architecture. The most important heritage monument in this site is the Virupaksha Temple, which continues to be a very important religious centre for the Hindus. There are several other monuments which are a part of this heritage site, Together, they’re collectively known as the ‘Group of Monuments at Hampi’.",
    "c) Red Fort QQ Situated in the centre of the historic city of New Delhi, the Red Fort was built by emperor Shah Jahan when he shifted his capital from Agra to Delhi, or what was known as Shahjahanabad at that time. The fort became the political hub of the Mughals. Under Shah Jahan, Mughal art and architecture reached it’s zenith, and the Red Fort is the perfect example of that. One can see the blending of Indo-Islamic, Timurid, Hindu and Persian forms of architecture in several facets of the Red Fort. It’s made up of red sand stone and houses several other smaller buildings such as the private pavallions, the Diwan-i-aam, the Diwan-i-khas."
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







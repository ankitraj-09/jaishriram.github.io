// ==== Html Elements ==== //
const scoreText = document.querySelector("#score");
const questionNumText = document.querySelector("#questionNum");
const questionText = document.querySelector("#questionText");
const timerText = document.querySelector("#timer");
const orderList = document.querySelector("#orderList");
const listOptions = document.querySelectorAll(".listOptions");
const nextBtn = document.querySelector("#nextBtn");
const submitBtn = document.querySelector("#submitBtn");
const modalBody = document.querySelector(".modal-body");

// ==== Quiz Questions ==== //
/* Set wise questions */
const set1 = [
    {
        question: "Who had composed the original Ramayana?",
        options: ["Rishi Valmiki", "Tulsi Das", "Sant Ek Nath", "Anhinanda"],
        answer: "Rishi Valmiki"
    },
    {
        question: "Lakshmana is considered to be the incarnation of whom?",
        options: ["Lord Vishnu", "Lord Shiva", "Lord Brahma", "Sheshnag"],
        answer: "Sheshnag"
    },
    {
        question: "What was the name of the forest where Lord Rama, Lakshmana and Goddess Sita stayed during exile?",
        options: ["Aranya", "Aranyak", "Dandakaranya", "Karanya"],
        answer: "Dandakaranya"
    },
    {
        question: " Which of the following statement is/are true for Gayatri Mantra?",
        options: [" Gayatri Mantra was formed from the first letter that comes from after every 1000 verses of Ramayana.", "The Gayatri Mantra consists of 20 letters", " The Gayatri Mantra was first mentioned in Rigveda.", "Only A and C are correct"],
        answer: "Only A and C are correct"
    },
    {
        question: "Ravana was a devotee of who among the following God?",
        options: ["Vishnu", "Brahma", "Shiva", "None of the above"],
        answer: "Shiva"
    },
]

const set2 = [
    {
        question: "What was the name of Lord Rama's father?",
        options: ["Shalishuka", "Nahapana", "Rajadhiraj", "Dasaratha"],
        answer: "Dasaratha"
    },
    {
        question: "Who has written Bhavartha Ramayana?",
        options: ["Madhava Kandali", "Eknath", "Krittibas", "Buddha Reddy"],
        answer: "Eknath"
    },
    {
        question: "Which of the following are the parts of Ramcharitmanas?",
        options: [" Bal Kanda", "Aranya Kanda", "Kiskindha Kanda", "All the above are correct"],
        answer: "All the above are correct"
    },
    {
        question: "What was the name of a bow that was used by Lord Rama in Goddess Sita swayamvar to marry her?",
        options: ["Pinaka", "Pindaka", "Anandaka", "Rulapand"],
        answer: "Pinaka"
    },
    {
        question: "Which of the following is/are the versions of the Ramayana that have emerged outside India?",
        options: [" Cambodia - Reamker", "Thailand - Ramakien", "Burma (Mayanmar) - Yama Zatdaw", "All the above are correct"],
        answer: "All the above are correct"
    },
]

const set3 = [
    {
        question: "Which city did Lord Rama rule as the king?",
        options: [" Ayodhya ", "Lanka ", "Mithila ", "Kishkindha"],
        answer: " Ayodhya "
    },
    {
        question: "Who is the wife of Lord Rama? ",
        options: ["Sita", " Radha", "Draupadi", "Parvati"],
        answer: "Sita "
    },
    {
        question: "Who is the loyal and devoted monkey companion of Lord Rama? ",
        options: ["Hanuman ", "Sugriva ", "Jambavan", "Vali"],
        answer: "Hanuman "
    },
    {
        question: "Who is the main antagonist in the Ramayana?",
        options: ["Ravana ", "Kumbhakarna", " Indrajit ", "Maricha"],
        answer: "Ravana "
    },
    {
        question: " Where was Lord Rama born?",
        options: ["Banaras", "Vindhyachal", "Prayagraj", "Ayodhya"],
        answer: "Ayodhya"
    },
]


// ==== Question Set ==== //
/* To generate different question sets every time */
const sets = [set1, set2, set3]

// ==== Variables ==== //
let index = 0;
let questionNum = 1;
let totalQue = 5;
let marks = 2;
let score = 0;
const time = 10;
/* Colors */
const color1 = "red";
const color2 = "green";
const color3 = "#45A29E";
const color4 = "white";


// ==== Functions ==== //

/* To start game */
window.onload = function (){
    startQuiz();
}

/* Starting Game Function */
function startQuiz() {
    const x = Math.floor(Math.random() * 3);
    const set = sets[x];
    loadQuiz(set);
}

/* To load quiz */
function loadQuiz(set) {

    startTimer(time);
    questionNumText.textContent = questionNum;
    questionText.textContent = set[index].question;
    questionText.style.color = color3;

    listOptions.forEach(list => {
        list.addEventListener("click", checkAnswer);
    })

    for (i = 0; i < 4; i++) {
        listOptions[i].textContent = set[index].options[i];
    }

    nextBtn.addEventListener("click", nextQuestion);
    submitBtn.style.visibility = "hidden";

    /* To load next question & options */
    function nextQuestion() {
        index += 1;
        questionNum += 1;
        startTimer(time);

        listOptions.forEach(list => {
            list.addEventListener("click", checkAnswer);
            list.style.color = color3;
            list.style.backgroundColor = color4;
        })

        if (questionNum <= 5) {
            questionNumText.textContent = questionNum;
            questionText.textContent = set[index].question;

            for (i = 0; i < 4; i++) {
                listOptions[i].textContent = set[index].options[i];
            }
        } else {
            nextBtn.style.visibility = "hidden";
        }
    }

    /* To check right answer  */
    function checkAnswer() {
        const answer = this.textContent;
        const correctAns = set[index].answer;

        if (answer == correctAns) {
            this.style.color = color3;
            this.style.backgroundColor = color2;
            score += 1;
            scoreText.textContent = marks * score;
            modalBody.textContent = `Your Score is ${scoreText.textContent} out of 10`;

            listOptions.forEach(list => {
                list.removeEventListener("click", checkAnswer);
            })

        } else {
            this.style.color = color3;
            this.style.backgroundColor = color1;

            listOptions.forEach(list => {
                list.removeEventListener("click", checkAnswer);
            })
        }
    }

    /* To set timer to the quiz */
    function startTimer(time) {
        const counter = setInterval(timeLeft, 1000);
        nextBtn.style.visibility = "hidden";

        function timeLeft() {
            if (time > 0) {
                timerText.textContent = time;
                time--;
            } else if (time == 0 && questionNum < 5) {
                clearInterval(counter);
                timerText.textContent = "Time Over";
                nextBtn.style.visibility = "visible";

                listOptions.forEach(list => {
                    list.removeEventListener("click", checkAnswer);
                })
            } else {
                clearInterval(counter);
                timerText.textContent = "Time Over";
                nextBtn.style.visibility = "hidden";
                submitBtn.style.visibility = "visible";

                listOptions.forEach(list => {
                    list.removeEventListener("click", checkAnswer);
                })
            }
        }
    }
}


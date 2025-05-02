const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const startForm = document.getElementById('start-form');
const quizForm = document.getElementById('quiz-form');
const quizContainer = document.getElementById('quiz');
const resultDiv = document.getElementById('result');
let userPseudo = '';
let userLevel = '';
const quizData = {
Informatique: [
{
question: "Aux origines de l’informatique, l'interface utilisateur des systèmes d’exploitations était composée :",
options: ["1. D’écrans, de claviers et de souris", "2.De cartes perforées", "3. D’interrupteurs et de lampes"],
correct: 2
},
{
question: "Avec l’évolution des systèmes d’exploitation, la ligne de commande et l’interface graphique sont apparues pour faciliter le dialogue entre les OS et les utilisateurs. Mais quel système est apparu avant l’autre ?",
options: ["1. L’interface graphique avant la ligne de commande", "2. La ligne de commande avant l’interface graphique", "3. Les deux sont apparues en même temps"],
correct: 1
},
{
question: "Plus de 80% des 500 ordinateurs les plus puissants au monde sont équipés d’un système d’exploitation :",
options: ["1. Unix", "2. Windows", "3. Linux"],
correct: 2
},
{
question: "Quelle entreprise finance le système d’exploitation open source mobile Androïd ?",
options: ["1. Microsoft", "2. Yahoo", "3. Google"],
correct: 2
},
{
question: "Un système d’exploitation",
options: ["1. C’est la fonction de l’administrateur système", "2. C’est un intermédiaire entre la machine et l’utilisateur", "3. C’est le nom du processeur central de l’ordinateur", "C’est l’éditeur exploitant le système"],
correct: 1
}
],

premiere: [
{
question: "Qui a écrit 'Les Misérables' ?",
options: ["Émile Zola", "Victor Hugo", "Gustave Flaubert", "Albert Camus"],
correct: 1
},
{
question: "Quel est le symbole chimique de l'or ?",
options: ["Au", "Ag", "Fe", "Cu"],
correct: 0
}
],

terminale: [
{
question: "Quelle est la formule de l'énergie cinétique ?",
options: ["E = mc²", "Ec = 1/2 mv²", "F = ma", "P = mg"],
correct: 1
},
{
question: "En quelle année a eu lieu la Révolution française ?",
options: ["1789", "1799", "1804", "1815"],
correct: 0
},
{
    question: "Quel est le meilleur groupe de rap au Mali ?",
    options: ["Bifenix", "BBG", "MS2", "Nigga Fama"],
    correct: 3
    }, 
    {
        question: "Qui est le meilleur rappeur au Mali ?",
        options: ["2bto", "Blacknonde", "Lil Zed", "Levizy 501"],
        correct: 0
        },
        {
            question: "Combien de coup d'état a t-il eu lieu au Mali ?",
            options: ["17", "12", "3", "5"],
            correct: 3
            },
            {
                question: "Delta est :",
                options: ["b² - 4ac", "b² - 4ac + 2a", "A² + 2ab - c", "aucun des deux"],
                correct: 0
                }
]
};
startForm.addEventListener('submit', function(e) {
    e.preventDefault();
    userPseudo = document.getElementById('pseudo').value;
    userLevel = document.getElementById('level').value;
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    loadQuestions();
    });
    
    function loadQuestions() {
    const questions = quizData[userLevel];
    let quizHTML = '';
    questions.forEach((q, index) => {
    quizHTML += `
    <div class="question">
    <h2>Question ${index + 1}:</h2>
    <p>${q.question}</p>
    <div class="options">
    `;
    q.options.forEach((option, optionIndex) => {
    quizHTML += `
    <label class="option">
    <input type="radio" name="q${index}" value="${optionIndex}" required>
    ${option}
    </label>
    `;
    });
    quizHTML += `
    </div>
    </div>
    `;
    });
    quizContainer.innerHTML = quizHTML;
    }
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const questions = quizData[userLevel];
        let score = 0;
        let incorrectAnswers = [];
        questions.forEach((q, index) => {
        const answer = document.querySelector(`input[name="q${index}"]:checked`);
        if (answer && parseInt(answer.value) === q.correct) {
        score++;
        } else {incorrectAnswers.push({
        question: q.question,
        userAnswer: q.options[parseInt(answer.value)],
        correctAnswer: q.options[q.correct]
        });
        }
        });

        const scoreOutOf20 = (score / questions.length) * 20;
        
         let encouragement = '';
        if (scoreOutOf20 >= 15) {
encouragement = "Excellent travail ! Vous êtes prêt pour le bac !";
} else if (scoreOutOf20 >= 10) {
encouragement = "Très bon résultat ! Continuez comme ça !";
} else if (scoreOutOf20 >= 5) {
encouragement = "Bon travail ! Vous progressez bien, continuez vos efforts !";
} else {
encouragement = "Ne vous découragez pas ! Chaque erreur est une opportunité d'apprendre.";
}
        
        let resultHTML = `<h2>Résultat pour ${userPseudo}</h2>`;
        resultHTML += `<p>Votre note : ${scoreOutOf20.toFixed(2)}/20</p> ${encouragement}`;
        
        if (incorrectAnswers.length > 0) {
        resultHTML += `<h3>Questions incorrectes :</h3>`;
        incorrectAnswers.forEach(ia => {
        resultHTML += `
        <p class="incorrect">${ia.question}</p>
        <p>Votre réponse : ${ia.userAnswer}</p>
        <p class="correct-answer">Réponse correcte : ${ia.correctAnswer}</p>
        `;
        });
        }
        resultDiv.innerHTML = resultHTML;
        quizForm.style.display = 'none';
        });
        
        let encouragement = '';
        if (scoreOutOf20 >= 15) {
encouragement = "Excellent travail ! Vous êtes prêt pour le bac !";
} else if (scoreOutOf20 >= 10) {
encouragement = "Très bon résultat ! Continuez comme ça !";
} else if (scoreOutOf20 >= 5) {
encouragement = "Bon travail ! Vous progressez bien, continuez vos efforts !";
} else {
encouragement = "Ne vous découragez pas ! Chaque erreur est une opportunité d'apprendre.";
}
        
        
        // Protection basique contre la lecture des réponses
/*document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
if(e.keyCode == 123) {
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
return false;}
}
        */
        

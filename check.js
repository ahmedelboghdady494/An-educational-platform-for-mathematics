

/* =========================================================
   DATA
========================================================= */

const modules = {

    "Unit 2":{
        icon:"📐",
        title:"Equations",
        lessons:[
            ["2-1","Writing and Interpreting Equations"],
            ["2-2","Solving One-Step Equations"],
            ["2-3","Solving Multi-Step Equations"],
            ["2-4","Solving Equations with the Variable on Each Side"],
            ["2-5","Solving Equations Involving Absolute Value"],
            ["2-6","Solving Proportions"],
            ["2-7","Using Formulas"]
        ]
    },

    "Unit 3":{
        icon:"🔢",
        title:"Expressions & Algebra",
        lessons:[
            ["3-1","Lesson 3-1"],
            ["3-2","Lesson 3-2"],
            ["3-3","Lesson 3-3"],
            ["3-4","Lesson 3-4"],
            ["3-5","Lesson 3-5"],
            ["3-6","Lesson 3-6"]
        ]
    },

    "Unit 4":{
        icon:"📈",
        title:"Linear Functions",
        lessons:[
            ["4-1","Lesson 4-1"],
            ["4-2","Lesson 4-2"],
            ["4-3","Slope-Intercept Form"],
            ["4-4","Transformations of Linear Functions"],
            ["4-5","Lesson 4-5"],
            ["4-6","Lesson 4-6"],
            ["4-7","Lesson 4-7"]
        ]
    },

    "Unit 5":{
        icon:"🧮",
        title:"Unit 5",
        lessons:[
            ["5-3","Lesson 5-3"],
            ["5-4","Lesson 5-4"],
            ["5-5","Lesson 5-5"]
        ]
    }
};


/* =========================================================
   STATE
========================================================= */

let currentPage = "home";
let previousPage = "home";
let navHistory = [];

let selectedUnit = null;
let selectedLesson = null;

let quizNumber = null;
let quizQuestionIndex = 0;
let quizScore = 0;
let quizAnswers = [];

let challengeNumber = null;

let currentUser =
    localStorage.getItem("aa_current_user") || "Student";


/* =========================================================
   HELPERS
========================================================= */

function saveUser(){

    localStorage.setItem(
        "aa_current_user",
        currentUser
    );

    updateProfile();
}

function updateProfile(){
    const name=currentUser||"Student";
    document.getElementById("topUsername").textContent=name;
    const el=document.getElementById("topAvatar");
    const avatar=getStoredAvatar();
    el.innerHTML=avatar?`<img src="${avatar}" alt="Profile" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:escapeHTML(name.charAt(0).toUpperCase());
}

function toast(message){

    const t = document.getElementById("toast");

    t.textContent = message;

    t.classList.add("show");

    setTimeout(()=>{
        t.classList.remove("show");
    },2200);
}

function goHome(){

    showPage("home");

}

function toggleMobileMenu(){

    const s = document.getElementById("sidebar");

    if(s.style.display === "block"){

        s.style.display = "none";

    }else{

        s.style.display = "block";
        s.style.position = "fixed";
        s.style.zIndex = "3000";
        s.style.top = "62px";
        s.style.left = "0";
        s.style.bottom = "0";
        s.style.width = "270px";
        s.style.display = "block";

    }
}


/* =========================================================
   NAVIGATION
========================================================= */

function startLearning(){
    showPage("terms");
}

function renderNamedPage(page){
    if(page === "home") renderHome();
    else if(page === "terms") renderTerms();
    else if(page === "lessons") renderLessons();
    else if(page === "quizzes") renderQuizUnits();
    else if(page === "challenges") renderChallengeUnits();
    else if(page === "progress") renderProgress();
    else if(page === "profile") renderProfile();
    else if(page === "worksheets") renderWorksheets();
    else if(page === "rewards" || page === "achievements") renderAchievements();
    else if(page === "mathworld") renderMathWorld();
    else renderHome();
}

function goBack(){
    if(navHistory.length){
        const target = navHistory.pop();
        currentPage = target;
        previousPage = navHistory.length ? navHistory[navHistory.length-1] : "home";
        const back = document.getElementById("globalBack");
        if(back) back.style.display = (currentPage === "home" ? "none" : "inline-flex");
        renderNamedPage(currentPage);
        window.scrollTo(0,0);
        return;
    }
    if(currentPage !== "home"){
        currentPage = "home";
        previousPage = "home";
        const back = document.getElementById("globalBack");
        if(back) back.style.display = "none";
        renderHome();
        window.scrollTo(0,0);
    }
}

function showPage(page){
    if(page !== currentPage){
        navHistory.push(currentPage);
        previousPage = currentPage;
    }
    currentPage = page;

    const back = document.getElementById("globalBack");
    if(back) back.style.display = (page === "home" ? "none" : "inline-flex");

    document.querySelectorAll(".side-btn")
        .forEach(x=>x.classList.remove("active"));

    const navMap = { home:"nav-home", terms:"nav-terms" };
    if(navMap[page]){
        const el=document.getElementById(navMap[page]);
        if(el) el.classList.add("active");
    }

    renderNamedPage(page);
    window.scrollTo(0,0);
}

/* =========================================================
   HOME
========================================================= */

function renderHome(){

    document.getElementById("main").innerHTML = `

        <section class="hero">

            <div class="hero-content">
                <div class="live-counter">👥 Visitors: <span id="visitorCounter">0</span></div>

                <div class="badge">
                    🇦🇪 UAE Curriculum • Grade 9 Advanced
                </div>

                <h1>
                    Learn Math.<br>
                    <span class="gradient">
                        Be Brilliant. 🚀
                    </span>
                </h1>

                <p>
                    Welcome to An Educational Platform for Mathematics — your organized learning platform for Grade 9
                    Advanced Mathematics.
                </p>

                <div class="hero-buttons">

                    <button class="primary"
                        onclick="startLearning()">
                        Start Learning →
                    </button>

                    <button class="secondary"
                        onclick="showPage('progress')">
                        📊 View Progress
                    </button>

                </div>

            </div>

        </section>


        <div class="stats">

            <div class="stat">
                <div class="stat-label">Active Term</div>
                <div class="stat-value">1</div>
            </div>

            <div class="stat">
                <div class="stat-label">Units</div>
                <div class="stat-value">4</div>
            </div>

            <div class="stat">
                <div class="stat-label">Lessons</div>
                <div class="stat-value">23</div>
            </div>

            <div class="stat">
                <div class="stat-label">Quiz System</div>
                <div class="stat-value">∞</div>
            </div>

        </div>


        <div class="page-title">
            <div>
                <h2>Everything in one place</h2>
                <p>Choose where you want to continue.</p>
            </div>
        </div>


        <div class="feature-grid">

            <div class="feature-card"
                 onclick="showPage('lessons')">

                <div class="big-icon">📖</div>

                <h3>Lessons</h3>

                <p>
                    Units → Lessons → Practice,
                    Solutions and Explanation files.
                </p>

            </div>


            <div class="feature-card"
                 onclick="showPage('quizzes')">

                <div class="big-icon">📝</div>

                <h3>Quizzes</h3>

                <p>
                    Unit → Lesson → multiple quizzes
                    with individual results.
                </p>

            </div>


            <div class="feature-card"
                 onclick="showPage('challenges')">

                <div class="big-icon">🧠</div>

                <h3>Challenges</h3>

                <p>
                    Higher-thinking mathematics
                    challenges for each lesson.
                </p>

            </div>


            <div class="feature-card"
                 onclick="showPage('rewards')">

                <div class="big-icon">🏆</div>

                <h3>Rewards</h3>

                <p>
                    Earn achievements as you
                    complete your learning journey.
                </p>

            </div>

        </div>
    `;
}


/* =========================================================
   TERMS
========================================================= */

function renderTerms(){

    document.getElementById("main").innerHTML = `

        <div class="page-title">

            <div>
                <h2>Choose Your Term</h2>
                <p>
                    Start with Term 1. More terms will be
                    added soon.
                </p>
            </div>

        </div>


        <div class="term-grid">

            <div class="term-card active-term">

                <div class="term-number">01</div>

                <h3>Term 1</h3>

                <p>
                    Full learning area currently available.
                    Explore lessons, quizzes, challenges
                    and progress.
                </p>

                <button class="primary"
                    onclick="showPage('lessons')">
                    Open Term 1 →
                </button>

            </div>


            <div class="term-card disabled">

                <div class="term-number">02</div>

                <h3>Term 2 🔒</h3>

                <p>
                    Term 2 content is being prepared.
                    It will be added to An Educational Platform for Mathematics later.
                </p>

                <button class="secondary"
                    onclick="comingSoon()">
                    Coming Soon
                </button>

            </div>


            <div class="term-card disabled">

                <div class="term-number">03</div>

                <h3>Term 3 🔒</h3>

                <p>
                    Term 3 content is being prepared.
                    Stay tuned for future lessons.
                </p>

                <button class="secondary"
                    onclick="comingSoon()">
                    Coming Soon
                </button>

            </div>

        </div>


        <div class="feature-grid">

            <div class="feature-card">
                <div class="big-icon">📚</div>
                <h3>Organized Learning</h3>
                <p>
                    Everything is divided by Unit
                    and Lesson.
                </p>
            </div>

            <div class="feature-card">
                <div class="big-icon">⚡</div>
                <h3>Practice</h3>
                <p>
                    Move from explanation to
                    practice and quizzes.
                </p>
            </div>

            <div class="feature-card">
                <div class="big-icon">🎯</div>
                <h3>Track Yourself</h3>
                <p>
                    Keep individual quiz results
                    in your browser.
                </p>
            </div>

            <div class="feature-card">
                <div class="big-icon">🏆</div>
                <h3>Achievements</h3>
                <p>
                    Collect rewards while you
                    progress.
                </p>
            </div>

        </div>
    `;
}


/* =========================================================
   UNIT CARD
========================================================= */

function unitHTML(unitName, mode){
    const unit = modules[unitName];
    const uid = ('unit_'+mode+'_'+unitName).replace(/[^a-zA-Z0-9_-]/g,'_');
    let lessons = '';
    unit.lessons.forEach(lesson=>{
        lessons += `<button class="lesson-item" onclick="openLesson('${unitName}','${lesson[0]}','${lesson[1]}','${mode}')">
            <span><strong>${lesson[0]}</strong>&nbsp; ${lesson[1]}</span><span class="arrow">→</span>
        </button>`;
    });
    return `<div class="unit-card">
        <div class="unit-top" onclick="toggleUnit('${uid}')">
            <div class="unit-icon">${unit.icon}</div>
            <div class="unit-info"><h3>${unitName} — ${unit.title}</h3><p>${unit.lessons.length} lessons available</p></div>
            <button class="secondary unit-open" onclick="event.stopPropagation();toggleUnit('${uid}')">View Lessons ▾</button>
        </div>
        <div id="${uid}" class="unit-lessons hidden">${lessons}</div>
    </div>`;
}
function toggleUnit(id){
    const el=document.getElementById(id); if(!el)return;
    el.classList.toggle('hidden');
    const card=el.parentElement;
    const btn=card?.querySelector('.unit-open');
    if(btn) btn.textContent=el.classList.contains('hidden')?'View Lessons ▾':'Hide Lessons ▴';
}


/* =========================================================
   LESSONS
========================================================= */

function renderLessons(){

    let html = `

        <div class="page-title">

            <div>
                <h2>📖 Term 1 Lessons</h2>

                <p>
                    Select a Unit, then choose a Lesson.
                </p>
            </div>

        </div>

        <div class="unit-grid">
    `;

    Object.keys(modules).forEach(unit=>{

        html += unitHTML(unit,"lesson");

    });

    html += `</div>`;

    document.getElementById("main").innerHTML = html;
}


/* =========================================================
   LESSON PAGE
========================================================= */

function openLesson(unit,id,title,mode){

    navHistory.push(mode === "quiz" ? "quizzes" : mode === "challenge" ? "challenges" : "lessons");
    previousPage = navHistory[navHistory.length-1];
    currentPage = "lesson-detail";
    const gb=document.getElementById("globalBack"); if(gb) gb.style.display="inline-flex";
    selectedUnit = unit;
    selectedLesson = id;

    document.getElementById("main").innerHTML = `

        <div class="page-title">

            <div>

                <button class="back"
                    onclick="${mode === "quiz"
                        ? "showPage('quizzes')"
                        : mode === "challenge"
                        ? "showPage('challenges')"
                        : "showPage('lessons')"}">
                    ← Back
                </button>

            </div>

        </div>


        <div class="branch-path">

            <span class="path">Term 1</span>
            <span class="path">${unit}</span>
            <span class="path">${id}</span>

        </div>


        <div class="lesson-box">

            <div class="lesson-header">

                <div class="lesson-header-icon">
                    📐
                </div>

                <div>

                    <h2>
                        ${id} — ${title}
                    </h2>

                    <p style="color:#7f8ca3;margin-top:6px">
                        ${unit} • Term 1
                    </p>

                </div>

            </div>


            <div class="lesson-files">

                <div class="file-card">

                    <div class="file-icon">📝</div>

                    <h4>Practice File</h4>

                    <p>
                        Open the unsolved practice
                        questions for this lesson.
                    </p>

                    <button class="file-btn"
                        onclick="openPDF('${id}-practice.pdf')">
                        Open Practice
                    </button>

                </div>


                <div class="file-card">

                    <div class="file-icon">✅</div>

                    <h4>Solutions</h4>

                    <p>
                        Open the solved version of
                        the lesson questions.
                    </p>

                    <button class="file-btn"
                        onclick="openPDF('${id}-solutions.pdf')">
                        Open Solutions
                    </button>

                </div>


                <div class="file-card">

                    <div class="file-icon">💡</div>

                    <h4>Explanation</h4>

                    <p>
                        Open the lesson summary
                        and explanation.
                    </p>

                    <button class="file-btn"
                        onclick="openPDF('${id}-explanation.pdf')">
                        Open Explanation
                    </button>

                </div>

            </div>


            <div style="
                margin-top:20px;
                display:flex;
                flex-wrap:wrap;
                gap:10px;
            ">

                <button class="primary"
                    onclick="openLessonQuizzes('${unit}','${id}','${title}')">
                    📝 Go to Quizzes
                </button>

                <button class="secondary"
                    onclick="openLessonChallenges('${unit}','${id}','${title}')">
                    🧠 Go to Challenges
                </button>

            </div>

        </div>
    `;
}


/* =========================================================
   PDF
========================================================= */

function openPDF(file){
    const cleanFile = String(file || "").split("/").pop();
    const base = new URL("files/", window.location.href);
    const url = new URL(encodeURIComponent(cleanFile), base);
    window.open(url.href, "_blank", "noopener");
}


/* =========================================================
   QUIZ UNITS
========================================================= */

function renderQuizUnits(){

    let html = `

        <div class="page-title">

            <div>
                <h2>📝 Quizzes</h2>
                <p>
                    Term 1 → Unit → Lesson → Quiz
                </p>
            </div>

        </div>

        <div class="unit-grid">
    `;

    Object.keys(modules).forEach(unit=>{

        html += unitHTML(unit,"quiz");

    });

    html += `</div>`;

    document.getElementById("main").innerHTML = html;
}


/* =========================================================
   LESSON QUIZZES
========================================================= */

function openLessonQuizzes(unit,id,title){

    navHistory.push(currentPage);
    previousPage = currentPage;
    currentPage = "quiz-list";
    const gb=document.getElementById("globalBack"); if(gb) gb.style.display="inline-flex";
    selectedUnit = unit;
    selectedLesson = id;

    let quizzes = "";

    /*
       60 quiz slots per lesson.
       They can later be filled with real
       source questions.
    */

    for(let i=1;i<=10;i++){

        quizzes += `

            <div class="quiz-card">

                <div class="quiz-number">
                    ${i}
                </div>

                <h3>Quiz ${i}</h3>

                <p>
                    ${id} — ${title}<br>
                    Source-based questions
                </p>

                <button class="primary"
                    onclick="startQuiz('${unit}','${id}','${title}',${i})">
                    Start Quiz
                </button>

            </div>
        `;

    }


    document.getElementById("main").innerHTML = `

        <div class="page-title">

            <div>

                <button class="back"
                    onclick="showPage('quizzes')">
                    ← Back to Units
                </button>

                <h2 style="margin-top:15px">
                    ${id} — Quizzes
                </h2>

                <p>
                    ${unit} → ${title}
                </p>

            </div>

        </div>


        <div class="branch-path">

            <span class="path">Term 1</span>
            <span class="path">Quizzes</span>
            <span class="path">${unit}</span>
            <span class="path">${id}</span>

        </div>


        <div class="quiz-grid">
            ${quizzes}
        </div>
    `;
}


/* =========================================================
   QUIZ ENGINE
========================================================= */

function startQuiz(unit,id,title,number){

    navHistory.push(currentPage);
    previousPage = currentPage;
    currentPage = "quiz-running";
    const gb=document.getElementById("globalBack"); if(gb) gb.style.display="inline-flex";
    selectedUnit = unit;
    selectedLesson = id;

    quizNumber = number;
    quizQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];

    renderQuestion(unit,id,title,number);
}


/*
   Temporary question bank.

   The structure is ready for the real textbook
   questions to be inserted later.
*/

function sourceLessonForQuiz(id){
    return (window.WORKSHEET_DATA||[]).find(x=>x.id===id) || null;
}

function seededShuffle(arr, seed){
    const out=arr.slice();
    let s=seed>>>0;
    for(let i=out.length-1;i>0;i--){
        s=(s*1664525+1013904223)>>>0;
        const j=s%(i+1);
        [out[i],out[j]]=[out[j],out[i]];
    }
    return out;
}

function getQuestions(unit,id,number=1){
    const lesson=sourceLessonForQuiz(id);
    if(!lesson || !lesson.questions || lesson.questions.length<10) return [];
    // Fixed, non-random quiz order. Source has 20 questions per lesson.
    const q=lesson.questions;
    const sets=[
      q.slice(0,10), q.slice(10,20),
      q.slice(0,5).concat(q.slice(15,20)), q.slice(5,15),
      q.slice(0,4).concat(q.slice(10,16)), q.slice(4,10).concat(q.slice(16,20)),
      q.slice(0,3).concat(q.slice(7,14)), q.slice(6,13).concat(q.slice(17,20)),
      q.slice(2,8).concat(q.slice(14,18)), q.slice(8,16).concat(q.slice(18,20))
    ];
    const chosen=sets[Math.max(0,Math.min(9,Number(number)-1))];
    return chosen.map(q=>({q:q.html,options:q.options||[],c:q.correctIndex,answerKey:q.answerKey||'',n:q.n}));
}

function cleanQuizHtml(h){
    return (h||'').replace(/^<p[^>]*>/,'').replace(/<\/p>$/,'');
}

function renderQuestion(unit,id,title,number){
    const questions=getQuestions(unit,id,number);
    const q=questions[quizQuestionIndex];
    if(!q){ toast('لم يتم العثور على أسئلة المصدر لهذا الدرس.'); return; }
    const percent=(quizQuestionIndex/questions.length)*100;
    let answers='';
    if(q.options.length===4){
        q.options.forEach((answer,index)=>{
            answers+=`<button class="answer" onclick="selectAnswer(${index})" id="answer-${index}">${cleanQuizHtml(answer)}</button>`;
        });
    }else{
        answers=`<textarea id="quizWrittenAnswer" placeholder="Write your answer here..." style="width:100%;min-height:150px;margin-top:18px;background:#f6fdff;color:#123f52;border:1px solid #b9dfe8;border-radius:12px;padding:12px"></textarea>`;
    }
    document.getElementById('main').innerHTML=`
      <div class="quiz-shell">
        <div class="page-title"><div>
          <button class="back" onclick="openLessonQuizzes('${unit}','${id}','${title}')">← Exit Quiz</button>
          <h2 style="margin-top:15px">Quiz ${number}</h2>
          <p>${unit} → ${id} — ${title}</p>
          <p style="font-size:12px;color:#5f7f8d">الأسئلة مأخوذة من ملف ورقة العمل المرفوع.</p>
        </div></div>
        <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${percent}%"></div></div>
        <div class="question-card">
          <div class="question-number">QUESTION ${quizQuestionIndex+1} OF ${questions.length}</div>
          <div class="question-text">${cleanQuizHtml(q.q)}</div>
          <div class="answers">${answers}</div>
          <div class="quiz-controls">
            <button class="secondary" onclick="openLessonQuizzes('${unit}','${id}','${title}')">Exit</button>
            <button class="primary" onclick="nextQuestion('${unit}','${id}','${title}',${number})">${quizQuestionIndex===questions.length-1?'Finish Quiz':'Next →'}</button>
          </div>
        </div>
      </div>`;
}

function selectAnswer(index){
    quizAnswers[quizQuestionIndex]=index;
    document.querySelectorAll('.answer').forEach(x=>x.classList.remove('selected'));
    const el=document.getElementById('answer-'+index);
    if(el) el.classList.add('selected');
}

function gradeSourceWritten(q,answer){
    const key=normalizeText(q.answerKey), given=normalizeText(answer);
    if(!given || !key) return false;
    const stop=new Set(['the','a','an','is','are','of','to','and','for','with','from','in','on','that','this','it','be','as','by','or','equal','equals','step','method','equation']);
    const tokens=key.split(/\s+/).filter(x=>x.length>2&&!stop.has(x));
    if(!tokens.length) return false;
    const hits=tokens.filter(x=>given.includes(x)).length;
    return hits/Math.min(tokens.length,8)>=0.5;
}

function nextQuestion(unit,id,title,number){
    const questions=getQuestions(unit,id,number);
    const q=questions[quizQuestionIndex];
    if(!q) return;
    if(q.options.length===4){
        if(quizAnswers[quizQuestionIndex]===undefined){toast('Please choose an answer first.');return;}
        if(q.c!==null && quizAnswers[quizQuestionIndex]===q.c) quizScore++;
    }else{
        const e=document.getElementById('quizWrittenAnswer');
        if(!e || !e.value.trim()){toast('Please write an answer first.');return;}
        quizAnswers[quizQuestionIndex]=e.value;
        if(gradeSourceWritten(q,e.value)) quizScore++;
    }
    if(quizQuestionIndex<questions.length-1){
        quizQuestionIndex++;
        renderQuestion(unit,id,title,number);
    }else{
        finishQuiz(unit,id,title,number);
    }
}

function finishQuiz(unit,id,title,number){
    const questions=getQuestions(unit,id,number);
    const percent=Math.round((quizScore/questions.length)*100);
    const key=`quiz_${unit}_${id}_${number}`;
    const result={score:quizScore,total:questions.length,percent,date:new Date().toLocaleString(),answers:quizAnswers};
    localStorage.setItem(key,JSON.stringify(result));
    logStudentActivity("Completed quiz",`${id} • Quiz ${number} • ${percent}%`);
    document.getElementById('main').innerHTML=`<div class="quiz-shell"><div class="question-card" style="text-align:center">
      <div style="font-size:65px">${percent>=80?'🏆':percent>=50?'⭐':'💪'}</div><h2 style="margin-top:10px">Quiz Complete!</h2>
      <p style="color:#5f7f8d;margin-top:8px">${unit} → ${id} → Quiz ${number}</p><div style="font-size:45px;font-weight:bold;margin:25px 0 8px">${percent}%</div>
      <p style="color:#5f7f8d">Correct: <strong>${quizScore}</strong> / ${questions.length}</p>
      <div style="margin-top:24px;display:flex;justify-content:center;flex-wrap:wrap;gap:10px">
        <button class="primary" onclick="reviewQuiz('${unit}','${id}','${title}',${number})">🔎 Review Answers</button>
        <button class="secondary" onclick="openLessonQuizzes('${unit}','${id}','${title}')">Back to Quizzes</button>
        <button class="secondary" onclick="showPage('progress')">View Progress</button>
      </div></div></div>`;
}
function reviewQuiz(unit,id,title,number){
 navHistory.push(currentPage); previousPage = currentPage; currentPage = "quiz-review"; const gb=document.getElementById("globalBack"); if(gb) gb.style.display="inline-flex";
 const questions=getQuestions(unit,id,number), key=`quiz_${unit}_${id}_${number}`;
 const saved=JSON.parse(localStorage.getItem(key)||'{}'), userAnswers=saved.answers||[];
 let html=`<div class="page-title"><div><button class="back" onclick="openLessonQuizzes('${unit}','${id}','${title}')">← Back to Quizzes</button><h2 style="margin-top:15px">🔎 Review Answers</h2><p>${unit} → ${id} → Quiz ${number}</p></div></div>`;
 questions.forEach((q,i)=>{
   const ua=userAnswers[i]; let correct=false, userText='No answer';
   if(q.options.length===4){correct=(ua!==undefined && ua===q.c); userText=ua===undefined?'No answer':cleanQuizHtml(q.options[ua]||'');}
   else {userText=ua||'No answer'; correct=gradeSourceWritten(q,ua||'');}
   const correctText=q.options.length===4?cleanQuizHtml(q.options[q.c]||''):cleanQuizHtml(q.answerKey||'');
   html+=`<div class="question-card" style="margin-bottom:16px;border-left:6px solid ${correct?'#25a66a':'#dc5b66'}"><div class="question-number">QUESTION ${i+1}</div><div class="question-text">${cleanQuizHtml(q.q)}</div><div class="answer" style="margin-top:12px;background:${correct?'#e7f8ef':'#fff0f1'}"><strong>${correct?'✅ Correct':'❌ Incorrect'}</strong><br><b>Your answer:</b> ${userText}<br><b>Correct answer:</b> ${correctText}</div></div>`;
 });
 document.getElementById('main').innerHTML=html;
}


/* =========================================================
   CHALLENGES
========================================================= */

function renderChallengeUnits(){

    let html = `

        <div class="page-title">

            <div>

                <h2>🧠 Challenges</h2>

                <p>
                    Higher-thinking practice by Unit
                    and Lesson.
                </p>

            </div>

        </div>

        <div class="unit-grid">
    `;


    Object.keys(modules).forEach(unit=>{

        html += unitHTML(unit,"challenge");

    });


    html += `</div>`;

    document.getElementById("main").innerHTML = html;
}


function openLessonChallenges(unit,id,title){

    navHistory.push(currentPage);
    previousPage = currentPage;
    currentPage = "challenge-list";
    const gb=document.getElementById("globalBack"); if(gb) gb.style.display="inline-flex";
    selectedUnit = unit;
    selectedLesson = id;

    let cards = "";

    /*
       30 challenge slots per lesson.
    */

    for(let i=1;i<=30;i++){

        cards += `

            <div class="quiz-card">

                <div class="quiz-number">
                    🧠
                </div>

                <h3>Challenge ${i}</h3>

                <p>
                    ${id} — Higher Thinking<br>
                    10 Questions
                </p>

                <button class="primary"
                    onclick="startChallenge('${unit}','${id}','${title}',${i})">
                    Start Challenge
                </button>

            </div>
        `;

    }


    document.getElementById("main").innerHTML = `

        <div class="page-title">

            <div>

                <button class="back"
                    onclick="showPage('challenges')">
                    ← Back
                </button>

                <h2 style="margin-top:15px">
                    ${id} — Challenges
                </h2>

                <p>
                    ${unit} → ${title}
                </p>

            </div>

        </div>


        <div class="branch-path">

            <span class="path">Term 1</span>
            <span class="path">Challenges</span>
            <span class="path">${unit}</span>
            <span class="path">${id}</span>

        </div>


        <div class="quiz-grid">
            ${cards}
        </div>
    `;
}


function startChallenge(unit,id,title,number){

    /*
       Challenge system is ready.
       Actual source-based challenge questions
       can be inserted later.
    */

    const questions = [

        "Explain why your method works, not only your answer.",

        "Find another possible method and compare it with yours.",

        "Create an example that satisfies the given condition.",

        "Identify a possible mistake in a student's solution.",

        "How would the answer change if one value changed?",

        "Can you prove your answer using a different representation.",

        "Find a pattern and explain what it tells you.",

        "Use algebraic reasoning to justify your conclusion.",

        "Which strategy is more efficient? Explain why.",

        "Solve the problem and justify every important step."

    ];

    let i=0;
    let score=0;


    function draw(){

        document.getElementById("main").innerHTML = `

            <div class="quiz-shell">

                <div class="page-title">

                    <div>

                        <button class="back"
                            onclick="openLessonChallenges('${unit}','${id}','${title}')">
                            ← Exit
                        </button>

                        <h2 style="margin-top:15px">
                            Challenge ${number}
                        </h2>

                    </div>

                </div>


                <div class="quiz-progress">

                    <div class="quiz-progress-bar"
                         style="width:${(i/questions.length)*100}%">
                    </div>

                </div>


                <div class="question-card">

                    <div class="question-number">
                        CHALLENGE QUESTION
                        ${i+1} OF ${questions.length}
                    </div>

                    <div class="question-text">
                        ${questions[i]}
                    </div>

                    <div style="margin-top:20px">

                        <textarea
                            id="challengeAnswer"
                            placeholder="Write your reasoning here..."
                            style="
                                width:100%;
                                min-height:160px;
                                resize:vertical;
                                background:#0e1729;
                                color:white;
                                border:1px solid #293750;
                                border-radius:13px;
                                padding:14px;
                                outline:none;
                            "
                        ></textarea>

                    </div>

                    <div class="quiz-controls">

                        <button class="secondary"
                            onclick="openLessonChallenges('${unit}','${id}','${title}')">
                            Exit
                        </button>

                        <button class="primary"
                            onclick="challengeNext()">
                            ${i === questions.length-1
                                ? "Finish"
                                : "Next →"}
                        </button>

                    </div>

                </div>

            </div>
        `;

    }


    window.challengeNext = function(){

        const ans =
            document.getElementById("challengeAnswer");

        if(!ans || ans.value.trim().length < 2){

            toast("Write your reasoning first.");

            return;
        }

        /*
           For now completion is tracked rather than
           automatically judging open-ended reasoning.
        */

        i++;

        if(i >= questions.length){

            localStorage.setItem(
                `challenge_${unit}_${id}_${number}`,
                JSON.stringify({
                    completed:true,
                    total:questions.length,
                    date:new Date().toLocaleString()
                })
            );


            document.getElementById("main").innerHTML = `

                <div class="quiz-shell">

                    <div class="question-card"
                         style="text-align:center">

                        <div style="font-size:65px">
                            🧠
                        </div>

                        <h2>
                            Challenge Complete!
                        </h2>

                        <p style="
                            color:#94a3b8;
                            margin-top:10px;
                        ">
                            You completed all
                            ${questions.length}
                            thinking questions.
                        </p>

                        <button class="primary"
                            style="margin-top:22px"
                            onclick="openLessonChallenges('${unit}','${id}','${title}')">
                            Back to Challenges
                        </button>

                    </div>

                </div>
            `;

        }else{

            draw();

        }

    };


    draw();
}


/* =========================================================
   PROGRESS
========================================================= */

function renderProgress(){

    let results = [];

    Object.keys(localStorage).forEach(key=>{

        if(
            key.startsWith("quiz_") ||
            key.startsWith("challenge_")
        ){

            try{

                const data =
                    JSON.parse(localStorage.getItem(key));

                results.push({
                    key:key,
                    data:data
                });

            }catch(e){}

        }

    });


    let html = `

        <div class="page-title">

            <div>

                <h2>📊 My Progress</h2>

                <p>
                    Every quiz and challenge is tracked
                    separately.
                </p>

            </div>

        </div>
    `;


    if(results.length === 0){

        html += `

            <div class="lesson-box"
                 style="text-align:center">

                <div style="font-size:55px">
                    📊
                </div>

                <h3 style="margin-top:10px">
                    No results yet
                </h3>

                <p style="
                    color:#7f8ca3;
                    margin:8px 0 18px;
                ">
                    Complete a quiz to see its result
                    here.
                </p>

                <button class="primary"
                    onclick="showPage('quizzes')">
                    Start a Quiz
                </button>

            </div>
        `;

    }else{

        html += `<div class="progress-list">`;


        results.forEach(item=>{

            const d = item.data;

            const isQuiz =
                item.key.startsWith("quiz_");


            let title =
                item.key
                    .replace("quiz_","")
                    .replace("challenge_","")
                    .replaceAll("_"," → ");


            let percent =
                d.percent !== undefined
                ? d.percent
                : 100;


            html += `

                <div class="progress-row">

                    <div class="progress-head">

                        <span>
                            ${isQuiz ? "📝" : "🧠"}
                            ${title}
                        </span>

                        <span>
                            ${percent}%
                        </span>

                    </div>

                    <div class="bar">

                        <div class="bar-fill"
                             style="width:${percent}%">
                        </div>

                    </div>

                    <div style="
                        color:#64748b;
                        font-size:11px;
                        margin-top:8px;
                    ">
                        ${
                            isQuiz
                            ? `Correct: ${d.score}/${d.total}`
                            : "Challenge completed"
                        }

                        ${d.date ? " • " + d.date : ""}
                    </div>

                </div>
            `;

        });


        html += `</div>`;

    }


    document.getElementById("main").innerHTML = html;
}


/* =========================================================
   REWARDS
========================================================= */

function getLearningResults(){
    const results=[];
    Object.keys(localStorage).forEach(key=>{
        if(key.startsWith("quiz_") || key.startsWith("challenge_")){
            try{ results.push({key,data:JSON.parse(localStorage.getItem(key))}); }catch(e){}
        }
    });
    return results;
}

function getMathXP(){
    return getLearningResults().reduce((xp,r)=>{
        if(r.key.startsWith("quiz_")) return xp + 10 + Math.round((Number(r.data.percent)||0)/20);
        return xp + 15;
    },0);
}

function renderMathWorld(){
    const xp=getMathXP();
    const levels=[
        [0,"Math Starter","📘"],[50,"Number Station","🔢"],[120,"Algebra Lab","🧪"],[220,"Function Tower","🏢"],[350,"Geometry Hub","📐"],[500,"Math City","🏙️"],[700,"Math World","🌐"]
    ];
    let current=levels[0],next=null;
    levels.forEach((l,i)=>{if(xp>=l[0]) current=l;if(xp<l[0]&&!next) next=l;});
    const progress=next?Math.min(100,Math.round(((xp-current[0])/(next[0]-current[0]))*100)):100;
    const html=levels.map(l=>`<div class="world-item ${xp>=l[0]?"":"locked"}"><div class="world-icon">${l[2]}</div><b>${l[1]}</b><div style="color:#6b8794;font-size:12px;margin-top:7px">${xp>=l[0]?"Unlocked":"Unlock at "+l[0]+" XP"}</div></div>`).join('');
    document.getElementById("main").innerHTML=`
      <div class="page-title"><div><h2>🏙️ Math World</h2><p>A separate learning world that develops as you solve quizzes and challenges.</p></div></div>
      <div class="math-world">
        <div style="display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap;align-items:center">
          <div><div class="xp-pill">⭐ ${xp} XP</div><h2 style="margin-top:12px">${current[2]} ${current[1]}</h2><p style="color:#66818f;margin-top:6px">Every completed quiz or challenge helps your world evolve.</p></div>
          <div style="min-width:220px"><b>Next stage</b><div style="height:10px;background:#e7f0f4;border-radius:99px;margin-top:8px;overflow:hidden"><div style="height:100%;width:${progress}%;background:#39a7b5;border-radius:99px"></div></div><div style="font-size:12px;color:#6b8794;margin-top:6px">${next?Math.max(0,next[0]-xp)+" XP to "+next[1]:"All stages unlocked"}</div></div>
        </div>
        <div class="world-stage">${html}</div>
      </div>`;
}

function renderAchievements(){
    const results=getLearningResults();
    const quizzes=results.filter(r=>r.key.startsWith("quiz_"));
    const challenges=results.filter(r=>r.key.startsWith("challenge_"));
    const perfect=quizzes.filter(r=>Number(r.data.percent)===100).length;
    const units=new Set(results.map(r=>r.key.split("_")[1])).size;
    const unlocked=[];
    if(results.length>=1) unlocked.push(["🌟","First Solve","You completed your first tracked quiz or challenge.",results[0].data.date||""]);
    if(quizzes.length>=5) unlocked.push(["📝","Quiz Explorer","You completed at least 5 quizzes.",`${quizzes.length} quizzes completed`]);
    if(challenges.length>=1) unlocked.push(["🧠","Challenge Thinker","You completed a higher-thinking challenge.",`${challenges.length} challenge${challenges.length===1?"":"s"} completed`]);
    if(perfect>=1) unlocked.push(["🎯","Perfect Score","You achieved 100% on a quiz.",`${perfect} perfect quiz${perfect===1?"":"zes"}`]);
    if(results.length>=10) unlocked.push(["🔥","Consistent Learner","You completed 10 or more tracked activities.",`${results.length} total activities`]);
    if(units>=2) unlocked.push(["🗺️","Unit Explorer","You solved work from at least two units.",`${units} units reached`]);
    if(results.length>=20) unlocked.push(["👑","Advanced Achiever","You built a record of 20 or more completed activities.",`${results.length} total activities`]);
    let html=`<div class="page-title"><div><h2>🏆 Achievements</h2><p>Only achievements you have actually unlocked are shown here.</p></div></div>`;
    if(!unlocked.length){html+=`<div class="lesson-box" style="text-align:center"><div style="font-size:55px">🏆</div><h3 style="margin-top:10px">No achievements yet</h3><p style="margin-top:8px">Complete a quiz or challenge and your first achievement will appear here.</p></div>`;}
    else{html+=`<div class="achievement-grid">${unlocked.map(a=>`<div class="achievement-card"><div class="a-icon">${a[0]}</div><h3>${a[1]}</h3><p style="margin-top:7px">${a[2]}</p><div class="a-proof">${a[3]}</div></div>`).join('')}</div>`;}
    document.getElementById("main").innerHTML=html;
}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile(){
    const p=JSON.parse(localStorage.getItem("aa_student_profile")||"{}");
    const avatar=getStoredAvatar();
    document.getElementById("main").innerHTML=`
      <div class="page-title"><div><h2>👤 My Profile</h2><p>Edit your student information and profile photo after entering the platform.</p></div></div>
      <div class="profile-panel" style="max-width:900px;margin:auto;text-align:center">
        <div class="profile-big">${avatar?`<img src="${avatar}" style="width:100%;height:100%;object-fit:cover" alt="Profile">`:escapeHTML((currentUser||"S").charAt(0).toUpperCase())}</div>
        <h2>${escapeHTML(currentUser||p.fullName||"Student")}</h2>
        <button class="primary" onclick="chooseProfilePhoto()">📷 Change Profile Photo</button>
        <div class="profile-edit-grid" style="text-align:left">
          <div class="profile-field"><b>Country / الدولة</b><select id="editCountry"><option>${escapeHTML(p.country||'United Arab Emirates • الإمارات العربية المتحدة')}</option></select></div>
          <div class="profile-field"><b>Emirate / الإمارة</b><select id="editEmirate">${['Sharjah • الشارقة','Dubai • دبي','Abu Dhabi • أبوظبي','Ajman • عجمان','Umm Al Quwain • أم القيوين','Ras Al Khaimah • رأس الخيمة','Fujairah • الفجيرة'].map(x=>`<option ${x===p.emirate?'selected':''}>${x}</option>`).join('')}</select></div>
          <div class="profile-field"><b>School / المدرسة</b><input id="editSchool" value="${escapeHTML(p.schoolName||'')}"></div>
          <div class="profile-field"><b>Full Name / الاسم</b><input id="editFullName" value="${escapeHTML(p.fullName||currentUser||'')}"></div>
          <div class="profile-field"><b>Grade / الصف</b><input id="editGrade" value="${escapeHTML(p.grade||'Grade 9 • التاسع')}"></div>
          <div class="profile-field"><b>Track / المسار</b><input id="editTrack" value="${escapeHTML(p.track||'Advanced • متقدم')}"></div>
          <div class="profile-field"><b>Section / الشعبة</b><input id="editSection" value="${escapeHTML(p.section||'')}"></div>
        </div>
        <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="primary" onclick="saveEditedProfile()">💾 Save Changes</button>
          <button class="secondary" onclick="logout()">Logout</button>
        </div>
      </div>`;
}
function saveEditedProfile(){
 const p=JSON.parse(localStorage.getItem('aa_student_profile')||'{}');
 const full=document.getElementById('editFullName').value.trim(), school=document.getElementById('editSchool').value.trim();
 if(!full||!school){toast('Please complete the name and school.');return;}
 Object.assign(p,{country:document.getElementById('editCountry').value,emirate:document.getElementById('editEmirate').value,schoolName:school,fullName:full,grade:document.getElementById('editGrade').value.trim(),track:document.getElementById('editTrack').value.trim(),section:document.getElementById('editSection').value.trim()});
 localStorage.setItem('aa_student_profile',JSON.stringify(p)); currentUser=full; saveUser(); logStudentActivity('Updated student profile','Name/school/grade/track/section'); renderProfile(); toast('Profile updated.');
}

function profileField(label,value){return `<div class="profile-field"><b>${escapeHTML(label)}</b><div style="margin-top:6px">${escapeHTML(value||"—")}</div></div>`}
function escapeHTML(v){return String(v??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]))}
function getStoredAvatar(){return localStorage.getItem("aa_student_avatar")||""}
function chooseProfilePhoto(){
 const input=document.createElement("input"); input.type="file"; input.accept="image/*";
 input.onchange=()=>{const f=input.files&&input.files[0]; if(!f)return; if(f.size>2*1024*1024){toast("Choose an image smaller than 2MB.");return;} const r=new FileReader(); r.onload=()=>{localStorage.setItem("aa_student_avatar",r.result);updateProfile();renderProfile();logStudentActivity("Profile photo changed","");toast("Profile photo updated.")}; r.readAsDataURL(f)}; input.click();
}
function editStudentProfile(){
 const p=JSON.parse(localStorage.getItem("aa_student_profile")||"{}");
 document.body.classList.add("auth-locked"); document.getElementById("authGate").classList.remove("hidden"); document.getElementById("studentStep").classList.add("hidden"); document.getElementById("profileStep").classList.remove("hidden");
 setTimeout(()=>{const map={studentCountry:"country",studentEmirate:"emirate",schoolSearch:"schoolSearch",schoolName:"schoolName",studentFullName:"fullName",studentGrade:"grade",studentTrack:"track",studentSection:"section"}; ["studentCountry","studentEmirate","schoolSearch","schoolName","studentFullName","studentGrade","studentTrack","studentSection"].forEach(id=>{const e=document.getElementById(id);if(e)e.value=p[map[id]]||e.value;});},0);
}


function editUsername(){

    const name =
        prompt("Enter your username:",currentUser);

    if(name && name.trim()){

        currentUser = name.trim();

        saveUser();

        renderProfile();

        toast("Username updated.");

    }

}


/* =========================================================
   WORKSHEETS
========================================================= */

function renderWorksheets(){
 const data=window.WORKSHEET_DATA||[]; let html=`<div class="page-title"><div><h2>📄 Worksheets</h2><p>20 questions from the uploaded Term 1 worksheet for each lesson.</p></div></div><div class="unit-grid">`;
 data.forEach(l=>{html+=`<div class="unit-card"><div class="unit-top"><div class="unit-icon">📘</div><div class="unit-info"><h3>Lesson ${l.id}</h3><p>${l.title}</p></div></div><div class="lesson-list"><button class="lesson-item" onclick="openSourceWorksheet('${l.id}')"><span><strong>Worksheet</strong> · 20 Questions</span><span class="arrow">→</span></button><button class="lesson-item" onclick="openSourceQuiz('${l.id}')"><span><strong>Quiz</strong> · Source Questions</span><span class="arrow">→</span></button></div></div>`});
 html+=`</div>`; document.getElementById('main').innerHTML=html;
}
function getSourceLesson(id){return (window.WORKSHEET_DATA||[]).find(x=>x.id===id)}
function cleanSourceHtml(h){return (h||'').replace(/<p[^>]*>/,'').replace(/<\/p>$/,'')}
function openSourceWorksheet(id){const l=getSourceLesson(id);if(!l)return;let cards='';l.questions.forEach((q,i)=>{if(q.options&&q.options.length===4){cards+=`<div class="question-card" style="margin-bottom:14px"><div class="question-number">QUESTION ${i+1} OF 20</div><div class="question-text">${cleanSourceHtml(q.html)}</div><div class="answers">${q.options.map((o,j)=>`<div class="answer" style="cursor:default"><b>${String.fromCharCode(65+j)}.</b> ${cleanSourceHtml(o)}</div>`).join('')}</div></div>`}else{cards+=`<div class="question-card" style="margin-bottom:14px"><div class="question-number">QUESTION ${i+1} OF 20</div><div class="question-text">${cleanSourceHtml(q.html)}</div><textarea id="ws_${id}_${i}" placeholder="Write your answer here..." style="width:100%;min-height:110px;margin-top:18px;background:#f6fdff;color:#123f52;border:1px solid #b9dfe8;border-radius:12px;padding:12px"></textarea></div>`}});document.getElementById('main').innerHTML=`<div class="page-title"><div><button class="back" onclick="showPage('worksheets')">← Back</button><h2 style="margin-top:15px">Lesson ${l.id} — Worksheet</h2><p>${l.title}</p></div></div>${cards}<button class="primary" onclick="saveWorksheet('${id}')">Save Worksheet</button>`}
function saveWorksheet(id){const l=getSourceLesson(id);if(!l)return;const a={};l.questions.forEach((q,i)=>{const e=document.getElementById(`ws_${id}_${i}`);if(e)a[i]=e.value});localStorage.setItem(`worksheet_${id}`,JSON.stringify({answers:a,date:new Date().toLocaleString()}));toast('Worksheet saved on this device.')}
function openSourceQuiz(id){const l=getSourceLesson(id);if(!l)return;window.sourceQuizLesson=l;quizQuestionIndex=0;quizScore=0;quizAnswers=[];renderSourceQuizQuestion()}
function renderSourceQuizQuestion(){const l=window.sourceQuizLesson,qs=l.questions.slice(0,10),q=qs[quizQuestionIndex],pct=quizQuestionIndex/qs.length*100;let body='';if(q.options&&q.options.length===4){body='<div class="answers">'+q.options.map((o,j)=>`<button class="answer" id="srcans_${j}" onclick="selectSourceAnswer(${j})"><b>${String.fromCharCode(65+j)}.</b> ${cleanSourceHtml(o)}</button>`).join('')+'</div>'}else body=`<textarea id="sourceWritten" placeholder="Write your answer..." style="width:100%;min-height:150px;margin-top:18px;background:#f6fdff;color:#123f52;border:1px solid #b9dfe8;border-radius:12px;padding:12px"></textarea>`;document.getElementById('main').innerHTML=`<div class="quiz-shell"><div class="page-title"><div><button class="back" onclick="showPage('worksheets')">← Exit</button><h2 style="margin-top:15px">Source Quiz</h2><p>Lesson ${l.id} — ${l.title}</p></div></div><div class="quiz-progress"><div class="quiz-progress-bar" style="width:${pct}%"></div></div><div class="question-card"><div class="question-number">QUESTION ${quizQuestionIndex+1} OF ${qs.length}</div><div class="question-text">${cleanSourceHtml(q.html)}</div>${body}<div class="quiz-controls"><button class="secondary" onclick="showPage('worksheets')">Exit</button><button class="primary" onclick="nextSourceQuizQuestion()">${quizQuestionIndex===qs.length-1?'Finish Quiz':'Next →'}</button></div></div></div>`}
function selectSourceAnswer(i){quizAnswers[quizQuestionIndex]=i;document.querySelectorAll('.answer').forEach(x=>x.classList.remove('selected'));const e=document.getElementById('srcans_'+i);if(e)e.classList.add('selected')}
function normalizeText(v){return(v||'').toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g,' ').trim()}
function gradeWritten(q,a){const key=normalizeText(q.answer),given=normalizeText(a);if(!given||!key)return false;const stop=new Set(['the','a','an','is','are','of','to','and','for','with','from','in','on','that','this','it','be','as','by','or','equal','equals']);const t=key.split(/\s+/).filter(x=>x.length>2&&!stop.has(x));if(!t.length)return given===key;return t.filter(x=>given.includes(x)).length/Math.min(t.length,8)>=.5}
function nextSourceQuizQuestion(){const l=window.sourceQuizLesson,qs=l.questions.slice(0,10),q=qs[quizQuestionIndex];if(q.options&&q.options.length===4){if(quizAnswers[quizQuestionIndex]===undefined){toast('Please choose an answer first.');return}if(quizAnswers[quizQuestionIndex]===0)quizScore++}else{const e=document.getElementById('sourceWritten');if(!e||!e.value.trim()){toast('Please write an answer first.');return}quizAnswers[quizQuestionIndex]=e.value;if(gradeWritten(q,e.value))quizScore++}if(quizQuestionIndex<qs.length-1){quizQuestionIndex++;renderSourceQuizQuestion()}else finishSourceQuiz()}
function finishSourceQuiz(){const l=window.sourceQuizLesson,total=l.questions.slice(0,10).length,percent=Math.round(quizScore/total*100);localStorage.setItem(`source_quiz_${l.id}`,JSON.stringify({score:quizScore,total,percent,date:new Date().toLocaleString()}));document.getElementById('main').innerHTML=`<div class="quiz-shell"><div class="question-card" style="text-align:center"><div style="font-size:60px">${percent>=80?'🏆':percent>=50?'⭐':'💪'}</div><h2>Quiz Complete</h2><div style="font-size:34px;font-weight:bold;margin:18px 0">${percent}%</div><p style="color:#5f7f8d">Correct: ${quizScore}/${total}</p><p style="color:#6b8794;margin-top:8px">Questions are taken from the uploaded Term 1 worksheet.</p><button class="primary" style="margin-top:18px" onclick="openSourceQuiz('${l.id}')">Try Again</button> <button class="secondary" onclick="showPage('worksheets')">Back</button></div></div>`}



/* =========================================================
   PROFILE / TEACHER
========================================================= */

function openTeacherLogin(){

    document.getElementById("modalTitle").textContent =
        "👨‍🏫 Teacher Login";

    document.getElementById("modalContent").innerHTML = `

        <div class="input-group">

            <label>Teacher Username</label>

            <div class="input-wrap">

                <input
                    id="teacherUsername"
                    type="text"
                    placeholder="Username"
                >

            </div>

        </div>


        <div class="input-group">

            <label>Password</label>

            <div class="input-wrap">

                <input
                    id="teacherPassword"
                    type="password"
                    placeholder="Password"
                >

                <button class="toggle-pass"
                    onclick="togglePassword('teacherPassword',this)">
                    👁️
                </button>

            </div>

        </div>


        <button class="primary"
            style="width:100%;margin-top:5px"
            onclick="teacherLogin()">
            Login as Teacher
        </button>

    `;

    document
        .getElementById("modal")
        .classList.remove("hidden");
}


function teacherLogin(){

    const username =
        document.getElementById("teacherUsername").value.trim();

    const password =
        document.getElementById("teacherPassword").value;


    if(
        username === "ahmed" &&
        password === "Ahmed2012$"
    ){

        localStorage.setItem(
            "aa_teacher",
            "true"
        );

        closeModal();

        toast("Teacher login successful.");

        setTimeout(()=>{

            renderTeacherDashboard();

        },500);

    }else{

        toast("Incorrect teacher username or password.");

    }

}


/* =========================================================
   TEACHER DASHBOARD
========================================================= */

function renderTeacherDashboard(){
    if(localStorage.getItem("aa_teacher")!=="true"){openTeacherLogin();return;}
    const profile=JSON.parse(localStorage.getItem('aa_student_profile')||'{}');
    const activity=getStudentActivity();
    const rows=activity.map(a=>`<tr><td>${escapeHTML(a.name)}</td><td>${escapeHTML(a.school)}</td><td>${escapeHTML(a.emirate)}</td><td>${escapeHTML(a.grade)}</td><td>${escapeHTML(a.track)}</td><td>${escapeHTML(a.section||'—')}</td><td>${escapeHTML(a.action)}</td><td>${escapeHTML(a.details||'')}</td><td>${escapeHTML(a.time)}</td></tr>`).join('');
    document.getElementById('main').innerHTML=`
      <div class="page-title"><div><h2>👨‍🏫 Teacher Dashboard</h2><p>Student profile, login/activity times, and saved activity results on this browser.</p></div></div>
      <div class="stats">
        <div class="stat"><div class="stat-label">Demo Visitors</div><div class="stat-value">${Number(localStorage.getItem('aa_demo_counter')||0)}</div></div>
        <div class="stat"><div class="stat-label">Current Student</div><div class="stat-value">${escapeHTML(profile.fullName||'—')}</div></div>
        <div class="stat"><div class="stat-label">School</div><div class="stat-value">${escapeHTML(profile.schoolName||'—')}</div></div>
        <div class="stat"><div class="stat-label">Grade</div><div class="stat-value">${escapeHTML(profile.grade||'—')}</div></div>
      </div>
      <div class="lesson-box"><h3>Current Student Data</h3><div class="profile-edit-grid" style="text-align:left">
        ${profileField('Name / الاسم',profile.fullName)}${profileField('School / المدرسة',profile.schoolName)}${profileField('Emirate / الإمارة',profile.emirate)}${profileField('Grade / الصف',profile.grade)}${profileField('Track / المسار',profile.track)}${profileField('Section / الشعبة',profile.section||'—')}
      </div></div>
      <div class="lesson-box"><h3>Student Activity & Results</h3><p style="margin:8px 0 16px">Each row records the student activity and the time it happened.</p>
       <div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Name</th><th>School</th><th>Emirate</th><th>Grade</th><th>Track</th><th>Section</th><th>Action</th><th>Details / Result</th><th>Time</th></tr></thead><tbody>${rows||'<tr><td colspan="9">No activity yet.</td></tr>'}</tbody></table></div>
      </div>
      <div class="lesson-box"><h3>Important</h3><p>This GitHub Pages demo stores the records in this browser only. A real teacher dashboard shared across students/devices requires an online database.</p><button class="secondary" onclick="localStorage.removeItem('aa_teacher');showPage('home')">Exit Teacher Mode</button></div>`;
}


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function togglePassword(id,button){

    const input =
        document.getElementById(id);

    if(input.type === "password"){

        input.type = "text";

        button.textContent = "🙈";

    }else{

        input.type = "password";

        button.textContent = "👁️";

    }

}


/* =========================================================
   MODAL
========================================================= */

function closeModal(){

    document
        .getElementById("modal")
        .classList.add("hidden");

}


/* =========================================================
   COMING SOON
========================================================= */

function comingSoon(){

    toast("This section is coming soon 🔒");

}


/* =========================================================
   LOGIN
========================================================= */

function showLogin(){

    document.getElementById("modalTitle").textContent =
        "🔐 Student Login";

    document.getElementById("modalContent").innerHTML = `

        <div class="input-group">

            <label>Username</label>

            <div class="input-wrap">

                <input
                    id="studentUsername"
                    type="text"
                    placeholder="Enter username"
                >

            </div>

        </div>


        <div class="input-group">

            <label>Password</label>

            <div class="input-wrap">

                <input
                    id="studentPassword"
                    type="password"
                    placeholder="Enter password"
                >

                <button class="toggle-pass"
                    onclick="togglePassword('studentPassword',this)">
                    👁️
                </button>

            </div>

        </div>


        <button class="primary"
            style="width:100%"
            onclick="studentLogin()">
            Login
        </button>

    `;

    document
        .getElementById("modal")
        .classList.remove("hidden");

}


function studentLogin(){

    const name =
        document
            .getElementById("studentUsername")
            .value.trim();

    if(!name){

        toast("Enter your username.");

        return;

    }

    currentUser = name;

    saveUser();

    closeModal();

    toast("Welcome to An Educational Platform for Mathematics!");

    renderHome();

}


/* =========================================================
   DUMMY STUDENT LOGIN
========================================================= */
function startStudentLogin(){
    const demoName=document.getElementById('studentFullName');
    if(demoName && !demoName.value.trim()) demoName.value='Student';
    showProfileStep();
}

function showProfileStep(){
    document.body.classList.add("auth-locked");
    document.getElementById("studentStep").classList.add("hidden");
    document.getElementById("profileStep").classList.remove("hidden");
}

function getStudentActivity(){try{return JSON.parse(localStorage.getItem("aa_student_activity")||"[]")}catch(e){return []}}
function logStudentActivity(action,details){
 const p=JSON.parse(localStorage.getItem("aa_student_profile")||"{}"); if(!p.fullName)return;
 const a=getStudentActivity(); a.unshift({name:p.fullName,school:p.schoolName,grade:p.grade,track:p.track,section:p.section||"",emirate:p.emirate,action,details,time:new Date().toLocaleString(),timestamp:Date.now()});
 localStorage.setItem("aa_student_activity",JSON.stringify(a.slice(0,1000)));
}
/* Shared visitor counter.
   Production mode uses Supabase RPC so all visitors see the same value.
   Every page reload adds +1, and the clock adds +2 per elapsed second.
   The visible number is read only on load/reload; it never animates on screen. */
const SUPABASE_URL = "https://wrcustvtcobuxjwdllcd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_8eFzTGBOcUxdzDGls4qq7g_pqvKJb5I";
const SHARED_VISITOR_BASE = 1000;
const SHARED_VISITOR_START_MS = Date.parse("2026-09-23T00:00:00Z");
function getFallbackVisitorNumber(){
    const elapsed = Math.max(0, Date.now() - SHARED_VISITOR_START_MS);
    const localReloads = Number(localStorage.getItem("aa_reload_count") || 0) + 1;
    localStorage.setItem("aa_reload_count", String(localReloads));
    return SHARED_VISITOR_BASE + localReloads + (Math.floor(elapsed / 1000) * 2);
}
async function getSharedVisitorNumber(){
    try{
        const r=await fetch(SUPABASE_URL+"/rest/v1/rpc/register_page_load",{
            method:"POST",
            headers:{"apikey":SUPABASE_PUBLISHABLE_KEY,"Authorization":"Bearer "+SUPABASE_PUBLISHABLE_KEY,"Content-Type":"application/json"},
            body:"{}",
            cache:"no-store"
        });
        if(r.ok){ const n=await r.json(); if(typeof n === "number") return n; }
    }catch(e){}
    return getFallbackVisitorNumber();
}
async function renderVisitorCounter(){
    const el=document.getElementById("visitorCounter");
    if(!el)return;
    el.textContent="…";
    el.textContent=(await getSharedVisitorNumber()).toLocaleString();
}
function startDemoCounter(){ renderVisitorCounter(); }

function saveStudentProfile(){
    const profile={
        country:document.getElementById("studentCountry").value,
        emirate:document.getElementById("studentEmirate").value,
        schoolSearch:document.getElementById("schoolSearch").value.trim(),
        schoolName:document.getElementById("schoolName").value.trim(),
        fullName:document.getElementById("studentFullName").value.trim(),
        grade:document.getElementById("studentGrade").value,
        track:document.getElementById("studentTrack").value,
        section:document.getElementById("studentSection").value.trim()
    };
    if(!profile.schoolName || !profile.fullName){toast("Please complete the required school and name fields.");return;}
    localStorage.setItem("aa_student_profile",JSON.stringify(profile));
    currentUser=profile.fullName;
    logStudentActivity("Student login / profile saved","");
    saveUser();
    document.body.classList.remove("auth-locked");
    document.getElementById("authGate").classList.add("hidden");
    renderHome();
    toast("Profile saved. Welcome!");
}

function enterPlatformIfProfileExists(){
    const raw=localStorage.getItem("aa_student_profile");
    if(raw){
        try{const p=JSON.parse(raw);if(p.fullName){currentUser=p.fullName;saveUser();document.body.classList.remove("auth-locked");document.getElementById("authGate").classList.add("hidden");return true;}}catch(e){}
    }
    return false;
}

/* =========================================================
   LOGOUT
========================================================= */

async function logout(){
    localStorage.removeItem("aa_current_user");
    currentUser="Student";
    updateProfile();
    document.getElementById("authGate").classList.remove("hidden");
    document.getElementById("studentStep").classList.remove("hidden");
    document.getElementById("profileStep").classList.add("hidden");
    document.body.classList.add("auth-locked");
}


/* =========================================================
   INIT
========================================================= */

updateProfile();
startDemoCounter();

if(!enterPlatformIfProfileExists()){
    document.body.classList.add("auth-locked");
    
}else{
    renderHome();
}


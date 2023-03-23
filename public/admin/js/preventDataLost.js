
if(window.location.href == "http://localhost:9898/add-test")
{  
    window.onbeforeunload = function() { 
        sessionStorage.setItem("quizName", document.getElementById("quizName").value);
        sessionStorage.setItem("quizDetail", document.getElementById("quizDetail").value);
        sessionStorage.setItem("quizquestion", document.getElementById("quizquestion").value);
        sessionStorage.setItem("quizoptionA", document.getElementById("quizoptionA").value);
        sessionStorage.setItem("quizoptionB", document.getElementById("quizoptionB").value); 
        sessionStorage.setItem("quizoptionC", document.getElementById("quizoptionC").value); 
        sessionStorage.setItem("quizoptionD", document.getElementById("quizoptionD").value); 
        sessionStorage.setItem("quizcorrect", document.getElementById("quizcorrect").value); 
        sessionStorage.setItem("quizhint", document.getElementById("quizhint").value); 
    }

    window.onload = function() {
    var quizName = sessionStorage.getItem("quizName");
    if (quizName !== null) document.getElementById("quizName").value = quizName;

    var quizDetail = sessionStorage.getItem("quizDetail");
    if (quizDetail !== null) document.getElementById("quizDetail").value = quizDetail;

    var quizquestion = sessionStorage.getItem("quizquestion"); 
    if (quizquestion !== null) document.getElementById("quizquestion").value = quizquestion;

    var quizoptionA = sessionStorage.getItem("quizoptionA");
    if (quizoptionA !== null) document.getElementById("quizoptionA").value = quizoptionA;

    var quizoptionB = sessionStorage.getItem("quizoptionB");
    if (quizoptionB !== null) document.getElementById("quizoptionB").value = quizoptionB;

    var quizoptionC = sessionStorage.getItem("quizoptionC");
    if (quizoptionC !== null) document.getElementById("quizoptionC").value = quizoptionC;

    var quizoptionD = sessionStorage.getItem("quizoptionD");
    if (quizoptionD !== null) document.getElementById("quizoptionD").value = quizoptionD;

    var quizcorrect = sessionStorage.getItem("quizcorrect");
    if (quizcorrect !== null) document.getElementById("quizcorrect").value = quizcorrect;

    var quizhint = sessionStorage.getItem("quizhint");
    if (quizhint !== null) document.getElementById("quizhint").value = quizhint; 
    }
}
else if(window.location.href == "http://localhost:9898/game-management/add-flags-games")
{  
    window.onbeforeunload = function() { 
        sessionStorage.setItem("findCountryGameName", document.getElementById("findCountryGameName").value);
        sessionStorage.setItem("findCountryGameDetail", document.getElementById("findCountryGameDetail").value);
        sessionStorage.setItem("findCountryGameOptionA", document.getElementById("findCountryGameOptionA").value);
        sessionStorage.setItem("findCountryGameOptionB", document.getElementById("findCountryGameOptionB").value);
        sessionStorage.setItem("findCountryGameOptionC", document.getElementById("findCountryGameOptionC").value); 
        sessionStorage.setItem("findCountryGameOptionD", document.getElementById("findCountryGameOptionD").value); 
        sessionStorage.setItem("findCountryGameCorrect", document.getElementById("findCountryGameCorrect").value); 
        sessionStorage.setItem("findCountryGameHint", document.getElementById("findCountryGameHint").value); 
    }

    window.onload = function() {
    var findCountryGameName = sessionStorage.getItem("findCountryGameName"); 
    if (findCountryGameName !== null) document.getElementById("findCountryGameName").value = findCountryGameName;

    var findCountryGameDetail = sessionStorage.getItem("findCountryGameDetail");
    if (findCountryGameDetail !== null) document.getElementById("findCountryGameDetail").value = findCountryGameDetail;

    var findCountryGameOptionA = sessionStorage.getItem("findCountryGameOptionA");
    if (findCountryGameOptionA !== null) document.getElementById("findCountryGameOptionA").value = findCountryGameOptionA;

    var findCountryGameOptionB = sessionStorage.getItem("findCountryGameOptionB");
    if (findCountryGameOptionB !== null) document.getElementById("findCountryGameOptionB").value = findCountryGameOptionB;

    var findCountryGameOptionC = sessionStorage.getItem("findCountryGameOptionC");
    if (findCountryGameOptionC !== null) document.getElementById("findCountryGameOptionC").value = findCountryGameOptionC;

    var findCountryGameOptionD = sessionStorage.getItem("findCountryGameOptionD");
    if (findCountryGameOptionD !== null) document.getElementById("findCountryGameOptionD").value = findCountryGameOptionD;

    var findCountryGameCorrect = sessionStorage.getItem("findCountryGameCorrect");
    if (findCountryGameCorrect !== null) document.getElementById("findCountryGameCorrect").value = findCountryGameCorrect;

    var findCountryGameHint = sessionStorage.getItem("findCountryGameHint");
    if (findCountryGameHint !== null) document.getElementById("findCountryGameHint").value = findCountryGameHint;
    }
}
else if(window.location.href == "http://localhost:9898/game-management/draw-new-flags")
{   
    window.onbeforeunload = function() { 
        sessionStorage.setItem("newFlagCountry", document.getElementById("newFlagCountry").value);
        sessionStorage.setItem("newFlagUrl", document.getElementById("newFlagUrl").value);
        sessionStorage.setItem("newflagDetails", document.getElementById("newflagDetails").value);
        sessionStorage.setItem("arrangementID", document.getElementById("arrangementID").value); 
    }

    window.onload = function() {
    var newFlagCountry = sessionStorage.getItem("newFlagCountry"); 
    if (newFlagCountry !== null) document.getElementById("newFlagCountry").value = newFlagCountry;

    var newFlagUrl = sessionStorage.getItem("newFlagUrl");
    if (newFlagUrl !== null) document.getElementById("newFlagUrl").value = newFlagUrl;

    var newflagDetails = sessionStorage.getItem("newflagDetails");
    if (newflagDetails !== null) document.getElementById("newflagDetails").value = newflagDetails;

    var arrangementID = sessionStorage.getItem("arrangementID");
    if (arrangementID !== null) document.getElementById("arrangementID").value = arrangementID;
    }
}
else if(window.location.href == "http://localhost:9898/game-management/draw-flags-games")
{   
    window.onbeforeunload = function() { 
        sessionStorage.setItem("drawFlagGameName", document.getElementById("drawFlagGameName").value);
        sessionStorage.setItem("drawFlagGameDetail", document.getElementById("drawFlagGameDetail").value); 
    }

    window.onload = function() {
    var drawFlagGameName = sessionStorage.getItem("drawFlagGameName"); 
    if (drawFlagGameName !== null) document.getElementById("drawFlagGameName").value = drawFlagGameName;

    var drawFlagGameDetail = sessionStorage.getItem("drawFlagGameDetail");
    if (drawFlagGameDetail !== null) document.getElementById("drawFlagGameDetail").value = drawFlagGameDetail;
    }
}
else
{ 
  sessionStorage.clear();
}
 
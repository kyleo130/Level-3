import {setResult, setSubmitted, setCorrect} from "../gamescreen/process.js"

ace.require("ace/ext/language_tools");
let editor = ace.edit("editor");
editor.setTheme("ace/theme/cobalt");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});


let defaultCode = 
`// Write a function to sort the given array "arr",
// and return the sorted array.
// You do not know the content of the array.
// e.g. arr = [9, 4, 2, 5, 7, 2, 1];
// The sorted array is: [1, 2, 2, 4, 5, 7, 9].

function sortArr(arr) {
    return arr.sort();
}
`

editor.session.setValue(defaultCode);

let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset")

let skeletonAfter = 
`
let arrBefore = [4, 1, 8, 5, 2, 9, 3, 0, 7, 6];
let arrAfter = sortArr(arrBefore);
arrAfter;
`

function testSame(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

submitButton.addEventListener('click', function() {
    let code = editor.getValue();
    try {
        let arrResult = eval(code + skeletonAfter);
        let correctResult = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        setResult(arrResult);
        setSubmitted(true);
        setCorrect(testSame(arrResult, correctResult));
        document.getElementById("alertSuccess").style.display = "none";
        document.getElementById("alertFail").style.display = "none";
        document.getElementById("alertProblem").style.display = "none";
    } catch (err) {
        console.error(err);
        document.getElementById("alertSuccess").style.display = "none";
        document.getElementById("alertFail").style.display = "none";
        document.getElementById("alertProblem").style.display = "block";
    }
}, false);

resetButton.addEventListener('click', function() {
    try {
        editor.session.setValue(defaultCode);
    } catch (error) {
        console.log(error);
    }
}, false);
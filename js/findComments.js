import { clearErrorsWhenTyping, clearErrors, hasErrors, addError } from "./Form.js";
import Client from "./Client.js";

const client = new Client();
const findCommentsForm = document.getElementById("find-comments-form");

clearErrorsWhenTyping(findCommentsForm);

const alias = localStorage.getItem("alias");

document.querySelector("h2 + p").innerText = `Find comments for user ${alias}:`;

document.getElementById("search-button").addEventListener("click", async function(e) {
    const crId = document.querySelector("input[name=crId]");
    const revisionNumber = document.querySelector("select[name=revisionNumber]");
    const fileName = document.querySelector("input[name=fileName]");
    const lineNumber = document.querySelector("input[name=lineNumber]");

    clearErrors(findCommentsForm);

    const matches = crId.value.match(/^(CR-)?(\d{8})$/);

    if (matches === null) {
        addError(crId, "Enter a valid CR ID");
    }
    
    const crIdNumber = matches && matches[2];

    if (fileName.value.length > 0 || lineNumber.value.length > 0) {
        if (!/^(\/?\w)+(\..+)?$/.test(fileName.value)) {
            addError(fileName, "Enter a valid file name");
        }
    
        if (!/^\d+$/.test(lineNumber.value)) {
            addError(lineNumber, "Enter a valid line number");
        }
    }

    if (hasErrors(findCommentsForm)) {
        return;
    }

    this.classList.add("loading");

    const comments = await client.listComments(
        "saubrent",
        crIdNumber,
        revisionNumber.value
    );

    listComments(crIdNumber, revisionNumber.value, comments);

    this.classList.remove("loading");
});

document.getElementById("findSpecific").addEventListener("click",
    () => findCommentsForm.classList.toggle("specific"));

function listComments(crId, revisionNumber, comments) {
    if (comments.length === 0) {
        document.getElementById("search-results").classList.add("none");

        document.querySelector("#search-results p").innerText = `0 results found`;

        return;
    }

    document.getElementById("search-results").classList.remove("none");

    document.querySelector("#search-results p").innerText 
        = `${comments.length} result(s) found`;

    const tbody = document.querySelector("#comments tbody");

    tbody.innerHTML = comments.map(comment => {
        const { date, fileName, lineNumber, sentiment, commentText, keyPhrases } = comment;

        return `<tr>
                    <td>${date}</td>
                    <td>${fileName}</td>
                    <td>${lineNumber}</td>
                    <td>${sentiment}</td>
                    <td>${commentText}</td>
                    <td>${keyPhrases}</td>
                </tr>`;
    });
}
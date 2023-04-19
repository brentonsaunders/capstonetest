import { clearErrorsWhenTyping, hasErrors, addError } from "./Form.js";
import Client from "./Client.js";

const client = new Client();
const submitCommentForm = document.getElementById("submit-comment-form");

clearErrorsWhenTyping(submitCommentForm);

document.getElementById("submit-button").addEventListener("click", async function(e) {
    const crId = document.querySelector("input[name=crId]");
    const revisionNumber = document.querySelector("select[name=revisionNumber]");
    const fileName = document.querySelector("input[name=fileName]");
    const lineNumber = document.querySelector("input[name=lineNumber]");
    const alias = document.querySelector("input[name=alias]");
    const date = document.querySelector("input[name=date]");
    const comment = document.querySelector("textarea[name=comment]");

    const matches = crId.value.match(/^(CR-)?(\d{8})$/);

    if (matches === null) {
        addError(crId, "Enter a valid CR ID");
    }
    
    const crIdNumber = matches && matches[2];

    if (!/^(\/?\w)+(\..+)?$/.test(fileName.value)) {
        addError(fileName, "Enter a valid file name");
    }

    if (!/^\d+$/.test(lineNumber.value)) {
        addError(lineNumber, "Enter a valid line number");
    }

    if (!/^[a-zA-Z]{6,}$/.test(alias.value)) {
        addError(alias, "Enter a valid alias");
    }

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date.value)) {
        addError(date, "Enter a valid date");
    }

    if (comment.value.length < 1) {
        addError(comment, "Enter the comment text");
    }

    if (hasErrors(submitCommentForm)) {
        return;
    }

    this.classList.add("loading");

    await client.submitComment(
        crIdNumber,
        revisionNumber.value,
        fileName.value,
        lineNumber.value,
        alias.value,
        date.value,
        comment.value
    );

    this.classList.remove("loading");

    document.querySelector(".submit-comment").classList.add("comment-submitted");
});
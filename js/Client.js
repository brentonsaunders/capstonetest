import sleep from "./sleep.js";

class Client {
    constructor() {
        const alias = localStorage.getItem("alias");

        if (!alias) {
            window.location = "midway.html";
        }
    }

    async submitComment(crId, revisionNumber, fileName, lineNumber, alias, date, commentText) {
        let comments = localStorage.getItem("comments");

        comments = (comments) ? JSON.parse(comments) : [];

        const r = Math.floor(Math.random() * 4);

        const sentiments = ["POSITIVE", "NEGATIVE", "NEUTRAL", "MIXED"];

        const sentiment = sentiments[r];



        const comment = {
            crId,
            revisionNumber,
            fileName,
            lineNumber,
            alias,
            date,
            commentText,
            sentiment,
            keyPhrases: "..., ..., ..."
        };

        comments.push(comment);

        localStorage.setItem("comments", JSON.stringify(comments));

        await sleep(2000);
    }

    async listComments(alias, crId, revisionNumber) {
        let comments = localStorage.getItem("comments");

        comments = (comments) ? JSON.parse(comments) : [];

        await sleep(2000);

        return comments;
    }
}

export default Client;
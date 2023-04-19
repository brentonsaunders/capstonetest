
document.getElementById("signIn").addEventListener("click", () => {
    const username = document.querySelector("input[name=username]").value;

    localStorage.setItem("alias", username);

    window.location = "index.html";
});
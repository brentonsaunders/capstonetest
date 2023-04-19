export function clearErrorsWhenTyping(form) {
    form.querySelectorAll(".form-field").forEach(
        formField => formField.addEventListener("input", () => {
            const formFieldRow = formField.closest(".form-field-row");

            formFieldRow.classList.remove("error");
        })
    );
}

export function hasErrors(form) {
    return form.querySelectorAll(".form-field-row.error").length > 0;
}

export function clearErrors(form) {
    form.querySelectorAll(".form-field").forEach(
        formField => {
            const formFieldRow = formField.closest(".form-field-row");

            formFieldRow.classList.remove("error");
        }
    );
}

export function addError(element, errorMsg) {
    const formFieldRow = element.closest(".form-field-row");

    formFieldRow.classList.add("error");

    const errorSpan = formFieldRow.querySelector(":scope span.error") || document.createElement("span");

    errorSpan.className = "error";
    errorSpan.innerText = errorMsg;

    element.after(errorSpan);
}
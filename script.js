function calculateDosage() {
    const weight = document.getElementById("weight").value;
    if (weight) {
        const dosage = (weight * 0.03).toFixed(1);
        document.getElementById(
            "result"
        ).innerHTML = `Empfohlene tägliche Dosierung: ${dosage} Gramm`;
    } else {
        document.getElementById("result").innerHTML =
            "Bitte geben Sie Ihr Gewicht ein.";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            answer.style.display =
                answer.style.display === "block" ? "none" : "block";
        });
    });
});
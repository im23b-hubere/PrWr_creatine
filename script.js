// Dosage Calculator Function
function calculateDosage() {
    const weightInput = document.getElementById('weight');
    const resultElement = document.getElementById('result');

    const weight = parseFloat(weightInput.value);

    if (isNaN(weight) || weight <= 0) {
        resultElement.textContent = 'Bitte geben Sie ein gültiges Gewicht ein.';
        return;
    }

    const recommendedDosage = (weight * 0.6).toFixed(1);

    resultElement.textContent = `Empfohlene Tagesdosis: ${recommendedDosage} Gramm Kreatin`;
}

// FAQ Interaction
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;

            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });


    const sections = document.querySelectorAll('.section, .faq-item, .calculator, #performanceChart, #brainChart');

    sections.forEach(section => {
        section.classList.add('hidden-section');
        observer.observe(section);
    });
});
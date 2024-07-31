document.querySelectorAll('input[name="contact-method"]').forEach((elem) => {
    elem.addEventListener("change", function() {
        const contactInfoDiv = document.getElementById("contact-info");
        contactInfoDiv.innerHTML = "";

        if (this.value === "email") {
            contactInfoDiv.innerHTML = `
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" required>
            `;
        } else if (this.value === "phone") {
            contactInfoDiv.innerHTML = `
                <label for="phone">Mobile Number:</label>
                <input type="tel" id="phone" name="phone" required>
            `;
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("captcha-canvas");
    const ctx = canvas.getContext("2d");
    const captchaInput = document.getElementById("captcha-input");
    const captchaSolution = document.getElementById("captcha-solution");
    
    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const captchaLength = 6;
        let captchaText = '';
        const charsArray = Array.from(characters);

        for (let i = 0; i < captchaLength; i++) {
            captchaText += charsArray[Math.floor(Math.random() * charsArray.length)];
        }

        captchaSolution.value = captchaText;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(captchaText, canvas.width / 2, canvas.height / 2);

        // Add some random lines and noise to make it harder to copy
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.stroke();
        }
    }

    generateCaptcha();

    document.getElementById("student-form").addEventListener("submit", function(event) {
        if (captchaInput.value !== captchaSolution.value) {
            alert("Captcha answer is incorrect. Please try again.");
            event.preventDefault(); // Prevent form submission
            generateCaptcha(); // Regenerate captcha
        }
    });
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && e.key === 'c') || (e.ctrlKey && e.key === 'x') || (e.ctrlKey && e.key === 'v') || (e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.key === 's')) {
        e.preventDefault();
    }
});

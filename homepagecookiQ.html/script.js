// Initialize EmailJS with your public key
(function(){
    emailjs.init("vzs-AO7J9zMDOfoul");
})();

// Function to send email
function sendMail() {
    // Collect form data
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,  // User's email
        q1: document.querySelector('input[name="q1"]:checked')?.value || '',
        q2: Array.from(document.querySelectorAll('input[name="q2[]"]:checked')).map(el => el.value).join(', '),
        q3: Array.from(document.querySelectorAll('input[name="q3[]"]:checked')).map(el => el.value).join(', ')
    };

    console.log("Params:", params);  // Log the params for debugging

    // Send form data to yourself (admin email)
    emailjs.send("service_hrrg719", "template_3hrnqm8", {
        name: params.name,
        email: params.email,  // User's email to be included in the admin email
        q1: params.q1,
        q2: params.q2,
        q3: params.q3
    })
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Quiz submitted successfully!");
    }, function(error) {
        console.log("FAILED...", error);
        alert("There was an error submitting the quiz.");
    });

    // Send autoreply email to the user
    emailjs.send("service_hrrg719", "template_9i3p6az", {
        name: params.name,
        email: params.email,  // Ensure user's email is included in the autoreply
        q1: params.q1,
        q2: params.q2,
        q3: params.q3
    })
    .then(function(response) {
        console.log("Autoreply SUCCESS!", response.status, response.text);
    }, function(error) {
        console.log("Autoreply FAILED...", error);
    });
}

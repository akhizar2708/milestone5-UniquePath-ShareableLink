document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resume-form");
    var resumeOutput = document.getElementById("resumeoutput");
    var placeholder = document.getElementById("placeholder");
    var printPdfBtn = document.getElementById("print-pdf-btn");
    var shareResumeBtn = document.getElementById("share-resume-btn");
    var editResumeBtn = document.getElementById("edit-resume-btn");
    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        // Get form values
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var education = document.getElementById("education").value;
        var skills = document.getElementById("skills").value.split(",");
        var workExperience = document.getElementById("workExperience").value.split(",");
        var profilePicture = document.getElementById("profilePicture").files[0];
        var profilePictureURL = "";
        if (profilePicture) {
            profilePictureURL = URL.createObjectURL(profilePicture);
        }
        // Remove the placeholder text when form is submitted
        if (placeholder) {
            placeholder.style.display = "none";
        }
        // Clear previous output
        resumeOutput.innerHTML = "";
        // Generate personal info
        var personalInfoSection = document.createElement("section");
        personalInfoSection.innerHTML = "\n      <img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" width=\"100\">\n      <h2>Personal Information</h2>\n      <p>Name: ").concat(name, "</p>\n      <p>Email: ").concat(email, "</p>\n      <p>Phone: ").concat(phone, "</p>\n    ");
        resumeOutput.appendChild(personalInfoSection);
        // Generate education section
        var educationSection = document.createElement("section");
        educationSection.innerHTML = "\n      <h2>Education</h2>\n      <p>".concat(education, "</p>\n    ");
        resumeOutput.appendChild(educationSection);
        // Generate skills section
        var skillsSection = document.createElement("section");
        var skillsList = skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join("");
        skillsSection.innerHTML = "\n      <h2>Skills</h2>\n      <ul>".concat(skillsList, "</ul>\n    ");
        resumeOutput.appendChild(skillsSection);
        // Generate work experience section
        var workExpSection = document.createElement("section");
        var workList = workExperience.map(function (work) { return "<p>".concat(work.trim(), "</p>"); }).join("");
        workExpSection.innerHTML = "\n      <h2>Work Experience</h2>\n      ".concat(workList, "\n    ");
        resumeOutput.appendChild(workExpSection);
        // Show Print PDF and Share Resume buttons
        printPdfBtn.style.display = "block";
        shareResumeBtn.style.display = "block";
        editResumeBtn.style.display = "block";
        // Show the resume output and hide the form
        resumeOutput.style.display = "block";
        form.style.display = "none"; // Hide the form after submission
    });
    // Print PDF functionality
    printPdfBtn.addEventListener("click", function () {
        var resumeContent = document.getElementById("resumeoutput");
        // Hide everything except resume content
        var printWindow = window.open("", "_blank");
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write("\n      <html>\n      <head>\n          <title>Resume PDF</title>\n          <style>\n              body {\n                  font-family: Arial, sans-serif;\n              }\n              .resume-content {\n                  margin: 20px;\n              }\n          </style>\n      </head>\n      <body>\n          <div class=\"resume-content\">\n              ".concat(resumeContent.innerHTML, "\n          </div>\n      </body>\n      </html>\n    "));
        // Open the print dialog
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.close();
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.focus();
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.print();
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.close();
    });
    // Share Resume functionality
    shareResumeBtn.addEventListener("click", function () {
        var url = window.location.href; // Get the current page URL
        navigator.clipboard.writeText(url).then(function () {
            alert("Link copied to clipboard!"); // Show an alert
        });
    });
    // Edit Resume functionality
    editResumeBtn.addEventListener("click", function () {
        form.style.display = "block"; // Show the form again
        resumeOutput.style.display = "none"; // Hide the resume output
    });
});

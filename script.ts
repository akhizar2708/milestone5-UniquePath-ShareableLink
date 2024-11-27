document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resume-form") as HTMLFormElement;
  const resumeOutput = document.getElementById("resumeoutput") as HTMLDivElement;
  const placeholder = document.getElementById("placeholder") as HTMLElement;
  const printPdfBtn = document.getElementById("print-pdf-btn") as HTMLButtonElement;
  const shareResumeBtn = document.getElementById("share-resume-btn") as HTMLButtonElement;
  const editResumeBtn = document.getElementById("edit-resume-btn") as HTMLButtonElement;

  // Handle form submission
  form.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    // Get form values
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",");
    const workExperience = (document.getElementById("workExperience") as HTMLTextAreaElement).value.split(",");

    const profilePicture = (document.getElementById("profilePicture") as HTMLInputElement).files![0];
    let profilePictureURL = "";

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
    const personalInfoSection = document.createElement("section");
    personalInfoSection.innerHTML = `
      <img src="${profilePictureURL}" alt="Profile Picture" width="100">
      <h2>Personal Information</h2>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
    `;
    resumeOutput.appendChild(personalInfoSection);

    // Generate education section
    const educationSection = document.createElement("section");
    educationSection.innerHTML = `
      <h2>Education</h2>
      <p>${education}</p>
    `;
    resumeOutput.appendChild(educationSection);

    // Generate skills section
    const skillsSection = document.createElement("section");
    const skillsList = skills.map((skill) => `<li>${skill.trim()}</li>`).join("");
    skillsSection.innerHTML = `
      <h2>Skills</h2>
      <ul>${skillsList}</ul>
    `;
    resumeOutput.appendChild(skillsSection);

    // Generate work experience section
    const workExpSection = document.createElement("section");
    const workList = workExperience.map((work) => `<p>${work.trim()}</p>`).join("");
    workExpSection.innerHTML = `
      <h2>Work Experience</h2>
      ${workList}
    `;
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
    const resumeContent = document.getElementById("resumeoutput") as HTMLElement;

    // Hide everything except resume content
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`
      <html>
      <head>
          <title>Resume PDF</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
              }
              .resume-content {
                  margin: 20px;
              }
          </style>
      </head>
      <body>
          <div class="resume-content">
              ${resumeContent.innerHTML}
          </div>
      </body>
      </html>
    `);

    // Open the print dialog
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
    printWindow?.close();
  });

  // Share Resume functionality
  shareResumeBtn.addEventListener("click", function () {
    const url = window.location.href; // Get the current page URL
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!"); // Show an alert
    });
  });

  // Edit Resume functionality
  editResumeBtn.addEventListener("click", function () {
    form.style.display = "block"; // Show the form again
    resumeOutput.style.display = "none"; // Hide the resume output
  });
});

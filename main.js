// Get references to DOM elements
var form = document.getElementById('resume-form');
var resumeContainer = document.getElementById('resume');
var nameDisplay = document.getElementById('name-display');
var emailDisplay = document.getElementById('email-display');
var educationContent = document.getElementById('education-content');
var workExperienceContent = document.getElementById('work-experience-content');
var skillsContent = document.getElementById('skills-content');
var editButton = document.getElementById('edit-resume');
var editFields = document.getElementById('edit-fields');
var saveEditsButton = document.getElementById('save-edits');
var shareLink = document.getElementById('share-link');
var downloadButton = document.getElementById('download-pdf');
// Function to generate a unique URL based on the user's name
function generateUniqueURL(name) {
    var baseURL = "https://your-netlify-site.netlify.app/resume";
    var uniqueIdentifier = encodeURIComponent(name.trim().toLowerCase());
    return "".concat(baseURL, "/").concat(uniqueIdentifier);
}
// Function to handle the resume submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var resumeData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        education: document.getElementById('education').value,
        workExperience: document.getElementById('work-experience').value,
        skills: document.getElementById('skills').value,
    };
    // Display the resume data
    nameDisplay.textContent = resumeData.name;
    emailDisplay.textContent = resumeData.email;
    educationContent.textContent = resumeData.education;
    workExperienceContent.textContent = resumeData.workExperience;
    skillsContent.textContent = resumeData.skills;
    // Show the resume section
    resumeContainer.style.display = 'block';
    // Show the share link and download button
    var uniqueURL = generateUniqueURL(resumeData.name);
    shareLink.textContent = "Share your resume: ".concat(uniqueURL);
    shareLink.href = uniqueURL;
    shareLink.style.display = 'block';
    downloadButton.style.display = 'block';
    editButton.style.display = 'block';
});
// Event listener for editing the resume
editButton.addEventListener('click', function () {
    editFields.style.display = 'block';
    editButton.style.display = 'none';
    var editName = document.getElementById('edit-name');
    var editEmail = document.getElementById('edit-email');
    var editEducation = document.getElementById('edit-education');
    var editWorkExperience = document.getElementById('edit-work-experience');
    var editSkills = document.getElementById('edit-skills');
    editName.value = nameDisplay.textContent || '';
    editEmail.value = emailDisplay.textContent || '';
    editEducation.value = educationContent.textContent || '';
    editWorkExperience.value = workExperienceContent.textContent || '';
    editSkills.value = skillsContent.textContent || '';
});
// Event listener for saving edits
saveEditsButton.addEventListener('click', function () {
    var editName = document.getElementById('edit-name').value;
    var editEmail = document.getElementById('edit-email').value;
    var editEducation = document.getElementById('edit-education').value;
    var editWorkExperience = document.getElementById('edit-work-experience').value;
    var editSkills = document.getElementById('edit-skills').value;
    nameDisplay.textContent = editName;
    emailDisplay.textContent = editEmail;
    educationContent.textContent = editEducation;
    workExperienceContent.textContent = editWorkExperience;
    skillsContent.textContent = editSkills;
    editFields.style.display = 'none';
    editButton.style.display = 'block';
});
// Download PDF functionality
downloadButton.addEventListener('click', function () {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF();
    doc.text("Resume", 10, 10);
    doc.text("Name: ".concat(nameDisplay.textContent), 10, 20);
    doc.text("Email: ".concat(emailDisplay.textContent), 10, 30);
    doc.text("Education: ".concat(educationContent.textContent), 10, 40);
    doc.text("Work Experience: ".concat(workExperienceContent.textContent), 10, 50);
    doc.text("Skills: ".concat(skillsContent.textContent), 10, 60);
    doc.save('resume.pdf');
});

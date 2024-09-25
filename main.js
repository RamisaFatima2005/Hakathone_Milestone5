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
var shareLinkInput = document.getElementById('share-link');
var downloadButton = document.getElementById('download-resume');
// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var education = document.getElementById('education').value;
    var workExperience = document.getElementById('work-experience').value;
    var skills = document.getElementById('skills').value;
    // Update resume display
    nameDisplay.textContent = name;
    emailDisplay.textContent = email;
    educationContent.textContent = education;
    workExperienceContent.textContent = workExperience;
    skillsContent.textContent = skills;
    // Generate a unique URL with query parameters
    var uniqueUrl = "".concat(window.location.origin).concat(window.location.pathname, "?name=").concat(encodeURIComponent(name), "&email=").concat(encodeURIComponent(email), "&education=").concat(encodeURIComponent(education), "&workExperience=").concat(encodeURIComponent(workExperience), "&skills=").concat(encodeURIComponent(skills));
    shareLinkInput.value = uniqueUrl;
    shareLinkInput.style.display = 'block';
    // Show edit and download buttons
    editButton.style.display = 'block';
    downloadButton.style.display = 'block';
    resumeContainer.style.display = 'block';
});
// Load data from URL on page load
window.addEventListener('DOMContentLoaded', function () {
    var params = new URLSearchParams(window.location.search);
    var nameFromUrl = params.get('name');
    var emailFromUrl = params.get('email');
    var educationFromUrl = params.get('education');
    var workExperienceFromUrl = params.get('workExperience');
    var skillsFromUrl = params.get('skills');
    if (nameFromUrl) {
        nameDisplay.textContent = decodeURIComponent(nameFromUrl);
        emailDisplay.textContent = decodeURIComponent(emailFromUrl || '');
        educationContent.textContent = decodeURIComponent(educationFromUrl || '');
        workExperienceContent.textContent = decodeURIComponent(workExperienceFromUrl || '');
        skillsContent.textContent = decodeURIComponent(skillsFromUrl || '');
        resumeContainer.style.display = 'block';
        editButton.style.display = 'block';
        downloadButton.style.display = 'block';
    }
});
// Edit resume functionality
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
// Save edits
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
    // Update the shareable link with edited data
    var updatedUrl = "".concat(window.location.origin).concat(window.location.pathname, "?name=").concat(encodeURIComponent(editName), "&email=").concat(encodeURIComponent(editEmail), "&education=").concat(encodeURIComponent(editEducation), "&workExperience=").concat(encodeURIComponent(editWorkExperience), "&skills=").concat(encodeURIComponent(editSkills));
    shareLinkInput.value = updatedUrl;
});
downloadButton.addEventListener('click', function () {
    // Create a new window for the PDF
    var pdfWindow = window.open('', '', 'width=800,height=600');
    pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.document.write("\n      <html>\n      <head>\n        <title>Resume PDF</title>\n      </head>\n      <body>\n        <h1>".concat(nameDisplay.textContent, "</h1>\n        <p>Email: ").concat(emailDisplay.textContent, "</p>\n        <h2>Education</h2>\n        <p>").concat(educationContent.textContent, "</p>\n        <h2>Work Experience</h2>\n        <p>").concat(workExperienceContent.textContent, "</p>\n        <h2>Skills</h2>\n        <p>").concat(skillsContent.textContent, "</p>\n      </body>\n      </html>\n    "));
    pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.document.close();
    pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.print();
});

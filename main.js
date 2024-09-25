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
var downloadButton = document.getElementById('download-resume');
var shareLinkInput = document.getElementById('share-link');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var education = document.getElementById('education').value;
    var workExperience = document.getElementById('work-experience').value;
    var skills = document.getElementById('skills').value;
    // Update the resume display
    nameDisplay.textContent = name;
    emailDisplay.textContent = email;
    educationContent.textContent = education;
    workExperienceContent.textContent = workExperience;
    skillsContent.textContent = skills;
    // Generate unique URL based on name
    var uniqueUrl = "".concat(window.location.origin, "/resume/").concat(name.replace(/\s+/g, '-').toLowerCase());
    shareLinkInput.value = uniqueUrl;
    shareLinkInput.style.display = 'block';
    // Show edit and download buttons
    editButton.style.display = 'block';
    downloadButton.style.display = 'block';
    resumeContainer.style.display = 'block';
});
editButton.addEventListener('click', function () {
    // Show editable fields and hide edit button
    editFields.style.display = 'block';
    editButton.style.display = 'none';
    // Prefill the fields with current resume data
    document.getElementById('edit-name').value = nameDisplay.textContent || '';
    document.getElementById('edit-email').value = emailDisplay.textContent || '';
    document.getElementById('edit-education').value = educationContent.textContent || '';
    document.getElementById('edit-work-experience').value = workExperienceContent.textContent || '';
    document.getElementById('edit-skills').value = skillsContent.textContent || '';
});
saveEditsButton.addEventListener('click', function () {
    // Get values from editable fields
    var editName = document.getElementById('edit-name').value;
    var editEmail = document.getElementById('edit-email').value;
    var editEducation = document.getElementById('edit-education').value;
    var editWorkExperience = document.getElementById('edit-work-experience').value;
    var editSkills = document.getElementById('edit-skills').value;
    // Update resume with edited information
    nameDisplay.textContent = editName;
    emailDisplay.textContent = editEmail;
    educationContent.textContent = editEducation;
    workExperienceContent.textContent = editWorkExperience;
    skillsContent.textContent = editSkills;
    // Hide the editable fields and show the edit button again
    editFields.style.display = 'none';
    editButton.style.display = 'block';
});
downloadButton.addEventListener('click', function () {
    // Create a new window for the PDF
    var pdfWindow = window.open('', '', 'width=800,height=600');
    pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.document.write("\n    <html>\n    <head>\n      <title>Resume PDF</title>\n    </head>\n    <body>\n      <h1>".concat(nameDisplay.textContent, "</h1>\n      <p>Email: ").concat(emailDisplay.textContent, "</p>\n      <h2>Education</h2>\n      <p>").concat(educationContent.textContent, "</p>\n      <h2>Work Experience</h2>\n      <p>").concat(workExperienceContent.textContent, "</p>\n      <h2>Skills</h2>\n      <p>").concat(skillsContent.textContent, "</p>\n    </body>\n    </html>\n  "));
    pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.document.close();
    pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.print(); // Trigger the browser's print-to-PDF functionality
});

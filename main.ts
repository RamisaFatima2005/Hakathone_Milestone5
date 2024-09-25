const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeContainer = document.getElementById('resume') as HTMLElement;
const nameDisplay = document.getElementById('name-display') as HTMLElement;
const emailDisplay = document.getElementById('email-display') as HTMLElement;
const educationContent = document.getElementById('education-content') as HTMLElement;
const workExperienceContent = document.getElementById('work-experience-content') as HTMLElement;
const skillsContent = document.getElementById('skills-content') as HTMLElement;
const editButton = document.getElementById('edit-resume') as HTMLButtonElement;
const editFields = document.getElementById('edit-fields') as HTMLElement;
const saveEditsButton = document.getElementById('save-edits') as HTMLButtonElement;
const shareLinkInput = document.getElementById('share-link') as HTMLInputElement;
const downloadButton = document.getElementById('download-resume') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const workExperience = (document.getElementById('work-experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;

    // Update resume display
    nameDisplay.textContent = name;
    emailDisplay.textContent = email;
    educationContent.textContent = education;
    workExperienceContent.textContent = workExperience;
    skillsContent.textContent = skills;

    // Generate a unique URL with query parameters
    const uniqueUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&education=${encodeURIComponent(education)}&workExperience=${encodeURIComponent(workExperience)}&skills=${encodeURIComponent(skills)}`;
    shareLinkInput.value = uniqueUrl;
    shareLinkInput.style.display = 'block';

    // Show edit and download buttons
    editButton.style.display = 'block';
    downloadButton.style.display = 'block';
    resumeContainer.style.display = 'block';
});

// Load data from URL on page load
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get('name');
    const emailFromUrl = params.get('email');
    const educationFromUrl = params.get('education');
    const workExperienceFromUrl = params.get('workExperience');
    const skillsFromUrl = params.get('skills');

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
editButton.addEventListener('click', () => {
    editFields.style.display = 'block';
    editButton.style.display = 'none';

    const editName = document.getElementById('edit-name') as HTMLInputElement;
    const editEmail = document.getElementById('edit-email') as HTMLInputElement;
    const editEducation = document.getElementById('edit-education') as HTMLInputElement;
    const editWorkExperience = document.getElementById('edit-work-experience') as HTMLInputElement;
    const editSkills = document.getElementById('edit-skills') as HTMLInputElement;

    editName.value = nameDisplay.textContent || '';
    editEmail.value = emailDisplay.textContent || '';
    editEducation.value = educationContent.textContent || '';
    editWorkExperience.value = workExperienceContent.textContent || '';
    editSkills.value = skillsContent.textContent || '';
});

// Save edits
saveEditsButton.addEventListener('click', () => {
    const editName = (document.getElementById('edit-name') as HTMLInputElement).value;
    const editEmail = (document.getElementById('edit-email') as HTMLInputElement).value;
    const editEducation = (document.getElementById('edit-education') as HTMLInputElement).value;
    const editWorkExperience = (document.getElementById('edit-work-experience') as HTMLInputElement).value;
    const editSkills = (document.getElementById('edit-skills') as HTMLInputElement).value;

    nameDisplay.textContent = editName;
    emailDisplay.textContent = editEmail;
    educationContent.textContent = editEducation;
    workExperienceContent.textContent = editWorkExperience;
    skillsContent.textContent = editSkills;

    editFields.style.display = 'none';
    editButton.style.display = 'block';

    // Update the shareable link with edited data
    const updatedUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(editName)}&email=${encodeURIComponent(editEmail)}&education=${encodeURIComponent(editEducation)}&workExperience=${encodeURIComponent(editWorkExperience)}&skills=${encodeURIComponent(editSkills)}`;
    shareLinkInput.value = updatedUrl;
});

downloadButton.addEventListener('click', () => {
    // Create a new window for the PDF
    const pdfWindow = window.open('', '', 'width=800,height=600');
    pdfWindow?.document.write(`
      <html>
      <head>
        <title>Resume PDF</title>
      </head>
      <body>
        <h1>${nameDisplay.textContent}</h1>
        <p>Email: ${emailDisplay.textContent}</p>
        <h2>Education</h2>
        <p>${educationContent.textContent}</p>
        <h2>Work Experience</h2>
        <p>${workExperienceContent.textContent}</p>
        <h2>Skills</h2>
        <p>${skillsContent.textContent}</p>
      </body>
      </html>
    `);
    pdfWindow?.document.close();
    pdfWindow?.print();
  });
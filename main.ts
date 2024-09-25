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
const downloadButton = document.getElementById('download-resume') as HTMLButtonElement;
const shareLinkInput = document.getElementById('share-link') as HTMLInputElement;

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLInputElement).value;
  const workExperience = (document.getElementById('work-experience') as HTMLInputElement).value;
  const skills = (document.getElementById('skills') as HTMLInputElement).value;
  
  // Update the resume display
  nameDisplay.textContent = name;
  emailDisplay.textContent = email;
  educationContent.textContent = education;
  workExperienceContent.textContent = workExperience;
  skillsContent.textContent = skills;

  // Generate unique URL based on name
  const uniqueUrl = `${window.location.origin}/resume/${name.replace(/\s+/g, '-').toLowerCase()}`;
  shareLinkInput.value = uniqueUrl;
  shareLinkInput.style.display = 'block';

  // Show edit and download buttons
  editButton.style.display = 'block';
  downloadButton.style.display = 'block';
  resumeContainer.style.display = 'block';
});

editButton.addEventListener('click', () => {
  // Show editable fields and hide edit button
  editFields.style.display = 'block';
  editButton.style.display = 'none';

  // Prefill the fields with current resume data
  (document.getElementById('edit-name') as HTMLInputElement).value = nameDisplay.textContent || '';
  (document.getElementById('edit-email') as HTMLInputElement).value = emailDisplay.textContent || '';
  (document.getElementById('edit-education') as HTMLInputElement).value = educationContent.textContent || '';
  (document.getElementById('edit-work-experience') as HTMLInputElement).value = workExperienceContent.textContent || '';
  (document.getElementById('edit-skills') as HTMLInputElement).value = skillsContent.textContent || '';
});

saveEditsButton.addEventListener('click', () => {
  // Get values from editable fields
  const editName = (document.getElementById('edit-name') as HTMLInputElement).value;
  const editEmail = (document.getElementById('edit-email') as HTMLInputElement).value;
  const editEducation = (document.getElementById('edit-education') as HTMLInputElement).value;
  const editWorkExperience = (document.getElementById('edit-work-experience') as HTMLInputElement).value;
  const editSkills = (document.getElementById('edit-skills') as HTMLInputElement).value;

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
  pdfWindow?.print(); // Trigger the browser's print-to-PDF functionality
});

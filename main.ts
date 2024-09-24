// Define interfaces for the form fields
interface ResumeData {
    name: string;
    email: string;
    education: string;
    workExperience: string;
    skills: string;
}

// Get references to DOM elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeContainer = document.getElementById('resume') as HTMLDivElement;
const nameDisplay = document.getElementById('name-display') as HTMLHeadingElement;
const emailDisplay = document.getElementById('email-display') as HTMLParagraphElement;
const educationContent = document.getElementById('education-content') as HTMLParagraphElement;
const workExperienceContent = document.getElementById('work-experience-content') as HTMLParagraphElement;
const skillsContent = document.getElementById('skills-content') as HTMLParagraphElement;
const editButton = document.getElementById('edit-resume') as HTMLButtonElement;
const editFields = document.getElementById('edit-fields') as HTMLDivElement;
const saveEditsButton = document.getElementById('save-edits') as HTMLButtonElement;
const shareLink = document.getElementById('share-link') as HTMLAnchorElement;
const downloadButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Function to generate a unique URL based on the user's name
function generateUniqueURL(name: string): string {
    const baseURL = "https://your-netlify-site.netlify.app/resume";  
    const uniqueIdentifier = encodeURIComponent(name.trim().toLowerCase());  
    return `${baseURL}/${uniqueIdentifier}`;
}

// Function to handle the resume submission
form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const resumeData: ResumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        education: (document.getElementById('education') as HTMLInputElement).value,
        workExperience: (document.getElementById('work-experience') as HTMLInputElement).value,
        skills: (document.getElementById('skills') as HTMLInputElement).value,
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
    const uniqueURL = generateUniqueURL(resumeData.name);
    shareLink.textContent = `Share your resume: ${uniqueURL}`;
    shareLink.href = uniqueURL;
    shareLink.style.display = 'block';
    downloadButton.style.display = 'block';

    editButton.style.display = 'block';
});

// Event listener for editing the resume
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

// Event listener for saving edits
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
});

// Download PDF functionality
downloadButton.addEventListener('click', () => {
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF();

    doc.text(`Resume`, 10, 10);
    doc.text(`Name: ${nameDisplay.textContent}`, 10, 20);
    doc.text(`Email: ${emailDisplay.textContent}`, 10, 30);
    doc.text(`Education: ${educationContent.textContent}`, 10, 40);
    doc.text(`Work Experience: ${workExperienceContent.textContent}`, 10, 50);
    doc.text(`Skills: ${skillsContent.textContent}`, 10, 60);

    doc.save('resume.pdf');
});

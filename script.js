// Resume data structure
const resumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  selectedTemplate: "modern",
}

// DOM elements
const tabBtns = document.querySelectorAll(".tab-btn")
const tabPanels = document.querySelectorAll(".tab-panel")
const previewBtn = document.getElementById("previewBtn")
const exportBtn = document.getElementById("exportBtn")
const previewModal = document.getElementById("previewModal")
const closePreviewBtn = document.getElementById("closePreview")
const exportFromPreviewBtn = document.getElementById("exportFromPreview")
const resumePreview = document.getElementById("resumePreview")

// Form elements
const personalInfoInputs = {
  fullName: document.getElementById("fullName"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  location: document.getElementById("location"),
  website: document.getElementById("website"),
  linkedin: document.getElementById("linkedin"),
  summary: document.getElementById("summary"),
}

// Lists
const experienceList = document.getElementById("experienceList")
const educationList = document.getElementById("educationList")
const skillsList = document.getElementById("skillsList")

// Add buttons
const addExperienceBtn = document.getElementById("addExperience")
const addEducationBtn = document.getElementById("addEducation")
const addSkillBtn = document.getElementById("addSkill")

// Template cards
const templateCards = document.querySelectorAll(".template-card")

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  initializeTabs()
  initializePersonalInfo()
  initializeTemplateSelection()
  initializeButtons()
  updateButtonStates()
})

// Tab functionality
function initializeTabs() {
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab
      switchTab(tabId)
    })
  })
}

function switchTab(tabId) {
  // Update tab buttons
  tabBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabId)
  })

  // Update tab panels
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId)
  })
}

// Personal info functionality
function initializePersonalInfo() {
  Object.keys(personalInfoInputs).forEach((key) => {
    const input = personalInfoInputs[key]
    input.addEventListener("input", () => {
      resumeData.personalInfo[key] = input.value
      updateButtonStates()
    })
  })
}

// Experience functionality
addExperienceBtn.addEventListener("click", addExperience)

function addExperience() {
  const id = Date.now().toString()
  const experience = {
    id,
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  }

  resumeData.experience.push(experience)
  renderExperienceList()
  updateButtonStates()
}

function removeExperience(id) {
  resumeData.experience = resumeData.experience.filter((exp) => exp.id !== id)
  renderExperienceList()
  updateButtonStates()
}

function updateExperience(id, field, value) {
  const experience = resumeData.experience.find((exp) => exp.id === id)
  if (experience) {
    if (field === "current") {
      experience[field] = value
      if (value) {
        experience.endDate = ""
      }
    } else {
      experience[field] = value
    }
    renderExperienceList()
    updateButtonStates()
  }
}

function renderExperienceList() {
  if (resumeData.experience.length === 0) {
    experienceList.innerHTML =
      '<div class="empty-state"><p>No work experience added yet. Click "Add Experience" to get started.</p></div>'
    return
  }

  experienceList.innerHTML = resumeData.experience
    .map(
      (exp) => `
        <div class="experience-item">
            <button class="remove-btn" onclick="removeExperience('${exp.id}')">
                <i class="fas fa-trash"></i>
            </button>
            <div class="item-header">
                <h4 class="item-title">Experience Entry</h4>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Company *</label>
                    <input type="text" value="${exp.company}" 
                           onchange="updateExperience('${exp.id}', 'company', this.value)"
                           placeholder="Company Name">
                </div>
                <div class="form-group">
                    <label>Position *</label>
                    <input type="text" value="${exp.position}"
                           onchange="updateExperience('${exp.id}', 'position', this.value)"
                           placeholder="Job Title">
                </div>
                <div class="form-group">
                    <label>Start Date *</label>
                    <input type="month" value="${exp.startDate}"
                           onchange="updateExperience('${exp.id}', 'startDate', this.value)">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" value="${exp.endDate}"
                           onchange="updateExperience('${exp.id}', 'endDate', this.value)"
                           ${exp.current ? "disabled" : ""}>
                </div>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" ${exp.current ? "checked" : ""}
                           onchange="updateExperience('${exp.id}', 'current', this.checked)">
                    Currently working here
                </label>
            </div>
            <div class="form-group">
                <label>Description *</label>
                <textarea rows="3" placeholder="Describe your responsibilities and achievements..."
                          onchange="updateExperience('${exp.id}', 'description', this.value)">${exp.description}</textarea>
            </div>
        </div>
    `,
    )
    .join("")
}

// Education functionality
addEducationBtn.addEventListener("click", addEducation)

function addEducation() {
  const id = Date.now().toString()
  const education = {
    id,
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    gpa: "",
  }

  resumeData.education.push(education)
  renderEducationList()
  updateButtonStates()
}

function removeEducation(id) {
  resumeData.education = resumeData.education.filter((edu) => edu.id !== id)
  renderEducationList()
  updateButtonStates()
}

function updateEducation(id, field, value) {
  const education = resumeData.education.find((edu) => edu.id === id)
  if (education) {
    education[field] = value
    renderEducationList()
    updateButtonStates()
  }
}

function renderEducationList() {
  if (resumeData.education.length === 0) {
    educationList.innerHTML =
      '<div class="empty-state"><p>No education added yet. Click "Add Education" to get started.</p></div>'
    return
  }

  educationList.innerHTML = resumeData.education
    .map(
      (edu) => `
        <div class="education-item">
            <button class="remove-btn" onclick="removeEducation('${edu.id}')">
                <i class="fas fa-trash"></i>
            </button>
            <div class="item-header">
                <h4 class="item-title">Education Entry</h4>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Institution *</label>
                    <input type="text" value="${edu.institution}"
                           onchange="updateEducation('${edu.id}', 'institution', this.value)"
                           placeholder="University Name">
                </div>
                <div class="form-group">
                    <label>Degree *</label>
                    <input type="text" value="${edu.degree}"
                           onchange="updateEducation('${edu.id}', 'degree', this.value)"
                           placeholder="Bachelor's, Master's, etc.">
                </div>
                <div class="form-group">
                    <label>Field of Study *</label>
                    <input type="text" value="${edu.field}"
                           onchange="updateEducation('${edu.id}', 'field', this.value)"
                           placeholder="Computer Science, Business, etc.">
                </div>
                <div class="form-group">
                    <label>GPA</label>
                    <input type="text" value="${edu.gpa}"
                           onchange="updateEducation('${edu.id}', 'gpa', this.value)"
                           placeholder="3.8/4.0">
                </div>
                <div class="form-group">
                    <label>Start Date *</label>
                    <input type="month" value="${edu.startDate}"
                           onchange="updateEducation('${edu.id}', 'startDate', this.value)">
                </div>
                <div class="form-group">
                    <label>End Date *</label>
                    <input type="month" value="${edu.endDate}"
                           onchange="updateEducation('${edu.id}', 'endDate', this.value)">
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Skills functionality
addSkillBtn.addEventListener("click", addSkill)

function addSkill() {
  const id = Date.now().toString()
  const skill = {
    id,
    name: "",
    level: "Intermediate",
  }

  resumeData.skills.push(skill)
  renderSkillsList()
  updateButtonStates()
}

function removeSkill(id) {
  resumeData.skills = resumeData.skills.filter((skill) => skill.id !== id)
  renderSkillsList()
  updateButtonStates()
}

function updateSkill(id, field, value) {
  const skill = resumeData.skills.find((skill) => skill.id === id)
  if (skill) {
    skill[field] = value
    renderSkillsList()
    updateButtonStates()
  }
}

function renderSkillsList() {
  if (resumeData.skills.length === 0) {
    skillsList.innerHTML =
      '<div class="empty-state"><p>No skills added yet. Click "Add Skill" to get started.</p></div>'
    return
  }

  skillsList.innerHTML = resumeData.skills
    .map(
      (skill) => `
        <div class="skill-item">
            <div class="form-group">
                <input type="text" value="${skill.name}"
                       onchange="updateSkill('${skill.id}', 'name', this.value)"
                       placeholder="Skill name (e.g., JavaScript, Project Management)">
            </div>
            <div class="form-group skill-level">
                <select onchange="updateSkill('${skill.id}', 'level', this.value)">
                    <option value="Beginner" ${skill.level === "Beginner" ? "selected" : ""}>Beginner</option>
                    <option value="Intermediate" ${skill.level === "Intermediate" ? "selected" : ""}>Intermediate</option>
                    <option value="Advanced" ${skill.level === "Advanced" ? "selected" : ""}>Advanced</option>
                    <option value="Expert" ${skill.level === "Expert" ? "selected" : ""}>Expert</option>
                </select>
            </div>
            <button class="remove-btn" onclick="removeSkill('${skill.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `,
    )
    .join("")
}

// Template selection
function initializeTemplateSelection() {
  templateCards.forEach((card) => {
    card.addEventListener("click", () => {
      const templateId = card.dataset.template
      selectTemplate(templateId)
    })
  })
}

function selectTemplate(templateId) {
  resumeData.selectedTemplate = templateId

  // Update template cards
  templateCards.forEach((card) => {
    const isSelected = card.dataset.template === templateId
    card.classList.toggle("active", isSelected)

    const btn = card.querySelector(".template-select-btn")
    btn.textContent = isSelected ? "Selected" : "Select"
    btn.className = isSelected ? "btn btn-primary template-select-btn" : "btn btn-outline template-select-btn"
  })
}

// Button functionality
function initializeButtons() {
  previewBtn.addEventListener("click", showPreview)
  exportBtn.addEventListener("click", exportToPDF)
  closePreviewBtn.addEventListener("click", closePreview)
  exportFromPreviewBtn.addEventListener("click", exportToPDF)
}

function updateButtonStates() {
  const isValid = isFormValid()
  previewBtn.disabled = !isValid
  exportBtn.disabled = !isValid
}

function isFormValid() {
  const { fullName, email, phone, location, summary } = resumeData.personalInfo
  return fullName && email && phone && location && summary
}

// Preview functionality
function showPreview() {
  generateResumeHTML()
  previewModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closePreview() {
  previewModal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Resume generation
function generateResumeHTML() {
  const template = resumeData.selectedTemplate
  let html = ""

  switch (template) {
    case "modern":
      html = generateModernTemplate()
      break
    case "classic":
      html = generateClassicTemplate()
      break
    case "creative":
      html = generateCreativeTemplate()
      break
    default:
      html = generateModernTemplate()
  }

  resumePreview.innerHTML = html
}

function generateModernTemplate() {
  const { personalInfo, experience, education, skills } = resumeData

  return `
        <div class="modern-template" id="resume-content">
            <div class="resume-header">
                <h1 class="resume-name">${personalInfo.fullName}</h1>
                <div class="resume-contact">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        ${personalInfo.email}
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        ${personalInfo.phone}
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        ${personalInfo.location}
                    </div>
                    ${
                      personalInfo.website
                        ? `
                        <div class="contact-item">
                            <i class="fas fa-globe"></i>
                            ${personalInfo.website}
                        </div>
                    `
                        : ""
                    }
                    ${
                      personalInfo.linkedin
                        ? `
                        <div class="contact-item">
                            <i class="fab fa-linkedin"></i>
                            ${personalInfo.linkedin}
                        </div>
                    `
                        : ""
                    }
                </div>
            </div>

            ${
              personalInfo.summary
                ? `
                <div class="resume-section">
                    <h2 class="section-title">Professional Summary</h2>
                    <p>${personalInfo.summary}</p>
                </div>
            `
                : ""
            }

            ${
              experience.length > 0
                ? `
                <div class="resume-section">
                    <h2 class="section-title">Work Experience</h2>
                    ${experience
                      .map(
                        (exp) => `
                        <div class="experience-item">
                            <div class="item-header">
                                <h3 class="item-title">${exp.position}</h3>
                                <span class="item-date">
                                    ${formatDate(exp.startDate)} - ${exp.current ? "Present" : formatDate(exp.endDate)}
                                </span>
                            </div>
                            <div class="item-company">${exp.company}</div>
                            <div class="item-description">${exp.description}</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            `
                : ""
            }

            ${
              education.length > 0
                ? `
                <div class="resume-section">
                    <h2 class="section-title">Education</h2>
                    ${education
                      .map(
                        (edu) => `
                        <div class="education-item">
                            <div class="item-header">
                                <h3 class="item-title">${edu.degree} in ${edu.field}</h3>
                                <span class="item-date">
                                    ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
                                </span>
                            </div>
                            <div class="item-company">${edu.institution}</div>
                            ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ""}
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            `
                : ""
            }

            ${
              skills.length > 0
                ? `
                <div class="resume-section">
                    <h2 class="section-title">Skills</h2>
                    <div class="skills-grid">
                        ${skills
                          .map(
                            (skill) => `
                            <div class="skill-item">
                                <div class="skill-name">${skill.name}</div>
                                <div class="skill-level">${skill.level}</div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            `
                : ""
            }
        </div>
    `
}

function generateClassicTemplate() {
  const { personalInfo, experience, education, skills } = resumeData

  return `
        <div class="classic-template" id="resume-content">
            <div class="resume-header">
                <h1 class="resume-name">${personalInfo.fullName}</h1>
                <div class="resume-contact">
                    <div>${personalInfo.email} • ${personalInfo.phone}</div>
                    <div>${personalInfo.location}</div>
                    ${
                      personalInfo.website || personalInfo.linkedin
                        ? `
                        <div>
                            ${personalInfo.website ? personalInfo.website : ""}
                            ${personalInfo.website && personalInfo.linkedin ? " • " : ""}
                            ${personalInfo.linkedin ? personalInfo.linkedin : ""}
                        </div>
                    `
                        : ""
                    }
                </div>
            </div>

            ${
              personalInfo.summary
                ? `
                <div class="resume-section">
                    <h2 class="section-title">Summary</h2>
                    <div class="section-divider"></div>
                    <p>${personalInfo.summary}</p>
                </div>
            `
                : ""
            }

            ${
              experience.length > 0
                ? `
                <div class="resume-section">
                    <h2 class="section-title">Experience</h2>
                    <div class="section-divider"></div>
                    ${experience
                      .map(
                        (exp) => `
                        <div class="experience-item">
                            <div class="item-header">
                                <h3 class="item-title">${exp.position}</h3>
                                <span class="item-date">
                                    ${formatDate(exp.startDate)} - ${exp.current ? "Present" : formatDate(exp.endDate)}
                                </span>
                            </div>
                            <div class="item-company">${exp.company}</div>
                            <div class="item-description">${exp.description}</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            `
                : ""
            }

            ${
              education.length > 0
                ? `
                <div class="resume-section">
                    <h2 class="section-title">Education</h2>
                    <div class="section-divider"></div>
                    ${education
                      .map(
                        (edu) => `
                        <div class="education-item">
                            <div class="item-header">
                                <h3 class="item-title">${edu.degree} in ${edu.field}</h3>
                                <span class="item-date">
                                    ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
                                </span>
                            </div>
                            <div class="item-company">${edu.institution}</div>
                            ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ""}
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            `
                : ""
            }

            ${
              skills.length > 0
                ? `
                <div class="resume-section">
                    <h2 class="section-title">Skills</h2>
                    <div class="section-divider"></div>
                    <div class="skills-list">
                        ${skills
                          .map(
                            (skill) => `
                            <div class="skill-item">
                                <span class="skill-name">${skill.name}</span>
                                <span class="skill-level">${skill.level}</span>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            `
                : ""
            }
        </div>
    `
}

function generateCreativeTemplate() {
  const { personalInfo, experience, education, skills } = resumeData

  return `
        <div class="creative-template" id="resume-content">
            <div class="sidebar">
                <div class="resume-header">
                    <h1 class="resume-name">${personalInfo.fullName}</h1>
                    <div class="resume-contact">
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>${personalInfo.email}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>${personalInfo.phone}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${personalInfo.location}</span>
                        </div>
                        ${
                          personalInfo.website
                            ? `
                            <div class="contact-item">
                                <i class="fas fa-globe"></i>
                                <span>${personalInfo.website}</span>
                            </div>
                        `
                            : ""
                        }
                        ${
                          personalInfo.linkedin
                            ? `
                            <div class="contact-item">
                                <i class="fab fa-linkedin"></i>
                                <span>${personalInfo.linkedin}</span>
                            </div>
                        `
                            : ""
                        }
                    </div>
                </div>

                ${
                  skills.length > 0
                    ? `
                    <div class="resume-section">
                        <h2 class="section-title">Skills</h2>
                        ${skills
                          .map(
                            (skill) => `
                            <div class="skill-item">
                                <div class="skill-name">${skill.name}</div>
                                <div class="skill-level">${skill.level}</div>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: ${getSkillWidth(skill.level)}"></div>
                                </div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }

                ${
                  education.length > 0
                    ? `
                    <div class="resume-section">
                        <h2 class="section-title">Education</h2>
                        ${education
                          .map(
                            (edu) => `
                            <div class="education-item">
                                <h3 class="item-title">${edu.degree}</h3>
                                <div class="item-company">${edu.field}</div>
                                <div class="item-company">${edu.institution}</div>
                                <div class="item-date">
                                    ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
                                </div>
                                ${edu.gpa ? `<div class="item-date">GPA: ${edu.gpa}</div>` : ""}
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }
            </div>

            <div class="main-content">
                ${
                  personalInfo.summary
                    ? `
                    <div class="resume-section">
                        <h2 class="section-title">About Me</h2>
                        <p>${personalInfo.summary}</p>
                    </div>
                `
                    : ""
                }

                ${
                  experience.length > 0
                    ? `
                    <div class="resume-section">
                        <h2 class="section-title">Experience</h2>
                        ${experience
                          .map(
                            (exp) => `
                            <div class="experience-item">
                                <h3 class="item-title">${exp.position}</h3>
                                <div class="item-company">${exp.company}</div>
                                <div class="item-date">
                                    ${formatDate(exp.startDate)} - ${exp.current ? "Present" : formatDate(exp.endDate)}
                                </div>
                                <div class="item-description">${exp.description}</div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }
            </div>
        </div>
    `
}

// Utility functions
function formatDate(dateString) {
  if (!dateString) return ""
  const date = new Date(dateString + "-01")
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

function getSkillWidth(level) {
  switch (level) {
    case "Beginner":
      return "25%"
    case "Intermediate":
      return "50%"
    case "Advanced":
      return "75%"
    case "Expert":
      return "100%"
    default:
      return "50%"
  }
}

// Export functionality
function exportToPDF() {
  // Generate the resume HTML if not already done
  if (!resumePreview.innerHTML) {
    generateResumeHTML()
  }

  // Create a new window for printing
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Resume - ${resumeData.personalInfo.fullName}</title>
                    <link rel="stylesheet" href="styles.css">
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
                    <style>
                        @media print {
                            body { margin: 0; background: white; }
                            .resume-preview { box-shadow: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="resume-preview">
                        ${resumePreview.innerHTML}
                    </div>
                </body>
            </html>
        `)
    printWindow.document.close()

    // Wait for styles to load, then print
    setTimeout(() => {
      printWindow.print()
    }, 1000)
  }
}

// Close modal when clicking outside
previewModal.addEventListener("click", (e) => {
  if (e.target === previewModal) {
    closePreview()
  }
})

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && previewModal.classList.contains("active")) {
    closePreview()
  }
})

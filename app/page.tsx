"use client"

import { useState } from "react"
import type { ResumeData, Template, PersonalInfo, Experience, Education, Skill } from "@/types/resume"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { ExperienceForm } from "@/components/experience-form"
import { EducationForm } from "@/components/education-form"
import { SkillsForm } from "@/components/skills-form"
import { TemplateSelector } from "@/components/template-selector"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, FileText } from "lucide-react"

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional design with blue accents",
    component: ModernTemplate,
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional serif font with elegant styling",
    component: ClassicTemplate,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Eye-catching design with sidebar layout",
    component: CreativeTemplate,
  },
]

const initialPersonalInfo: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  summary: "",
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: initialPersonalInfo,
    experience: [],
    education: [],
    skills: [],
  })

  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [activeTab, setActiveTab] = useState("personal")
  const [showPreview, setShowPreview] = useState(false)

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setResumeData((prev) => ({ ...prev, personalInfo }))
  }

  const updateExperience = (experience: Experience[]) => {
    setResumeData((prev) => ({ ...prev, experience }))
  }

  const updateEducation = (education: Education[]) => {
    setResumeData((prev) => ({ ...prev, education }))
  }

  const updateSkills = (skills: Skill[]) => {
    setResumeData((prev) => ({ ...prev, skills }))
  }

  const selectedTemplateComponent = templates.find((t) => t.id === selectedTemplate)?.component

  const exportToPDF = () => {
    const element = document.getElementById("resume-content")
    if (element) {
      // Create a new window for printing
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Resume - ${resumeData.personalInfo.fullName}</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @media print {
                  body { margin: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${element.outerHTML}
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
  }

  const isFormValid = () => {
    return (
      resumeData.personalInfo.fullName &&
      resumeData.personalInfo.email &&
      resumeData.personalInfo.phone &&
      resumeData.personalInfo.location &&
      resumeData.personalInfo.summary
    )
  }

  if (showPreview && selectedTemplateComponent) {
    const TemplateComponent = selectedTemplateComponent
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold">Resume Preview</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Back to Editor
              </Button>
              <Button onClick={exportToPDF} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
        <div className="p-8">
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold">Interactive Resume Builder</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(true)}
              disabled={!isFormValid()}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button onClick={exportToPDF} disabled={!isFormValid()} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <ExperienceForm data={resumeData.experience} onChange={updateExperience} />
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <EducationForm data={resumeData.education} onChange={updateEducation} />
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <SkillsForm data={resumeData.skills} onChange={updateSkills} />
          </TabsContent>

          <TabsContent value="template" className="space-y-6">
            <TemplateSelector
              templates={templates}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
              resumeData={resumeData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

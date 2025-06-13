import type { ResumeData } from "@/types/resume"
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react"

interface CreativeTemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const getSkillWidth = (level: string) => {
    switch (level) {
      case "Beginner":
        return "w-1/4"
      case "Intermediate":
        return "w-1/2"
      case "Advanced":
        return "w-3/4"
      case "Expert":
        return "w-full"
      default:
        return "w-1/2"
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" id="resume-content">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{data.personalInfo.fullName}</h1>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{data.personalInfo.location}</span>
              </div>
              {data.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="break-all">{data.personalInfo.website}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <span className="break-all">{data.personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4 border-b border-purple-400 pb-2">Skills</h2>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}</span>
                    </div>
                    <div className="w-full bg-purple-400 rounded-full h-2">
                      <div className={`bg-white rounded-full h-2 ${getSkillWidth(skill.level)}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-purple-400 pb-2">Education</h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-purple-200">{edu.field}</p>
                    <p className="text-purple-200">{edu.institution}</p>
                    <p className="text-xs text-purple-300">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-xs text-purple-300">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-800 mb-3 border-b-2 border-purple-200 pb-1">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-1">Experience</h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-purple-600 rounded-full"></div>
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-purple-200"></div>
                    <div className="mb-2">
                      <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                      <p className="font-semibold text-purple-600">{exp.company}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import type { Template, ResumeData } from "@/types/resume"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
  resumeData: ResumeData
}

export function TemplateSelector({ templates, selectedTemplate, onSelectTemplate, resumeData }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate === template.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardContent className="p-4">
              <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                <div className="scale-[0.2] origin-top-left w-[500%] h-[500%]">
                  <template.component data={resumeData} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
                {selectedTemplate === template.id && <Check className="w-5 h-5 text-blue-500" />}
              </div>
              <Button
                className="w-full mt-2"
                variant={selectedTemplate === template.id ? "default" : "outline"}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectTemplate(template.id)
                }}
              >
                {selectedTemplate === template.id ? "Selected" : "Select"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

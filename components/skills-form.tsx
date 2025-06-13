"use client"

import type { Skill } from "@/types/resume"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

interface SkillsFormProps {
  data: Skill[]
  onChange: (data: Skill[]) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediate",
    }
    onChange([...data, newSkill])
  }

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange(data.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)))
  }

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <Button onClick={addSkill} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((skill) => (
          <div key={skill.id} className="flex items-center gap-4 p-3 border rounded-lg">
            <div className="flex-1">
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                placeholder="Skill name (e.g., JavaScript, Project Management)"
              />
            </div>
            <div className="w-40">
              <Select
                value={skill.level}
                onValueChange={(value) => updateSkill(skill.id, "level", value as Skill["level"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">No skills added yet. Click "Add Skill" to get started.</div>
        )}
      </CardContent>
    </Card>
  )
}

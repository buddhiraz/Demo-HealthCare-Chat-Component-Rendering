'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; // Import Recharts components

// Type for single value vital info
type VitalInfo = {
  name: string
  value: string
  unit: string
  normal_range?: string
  date: string
}

// Type for chart info (multiple values over time)
type ChartInfo = {
  name: string
  description: string
  unit: string
  values: { value: number, date: string }[]
}

// VitalCard component for single value health parameters
const VitalCard: React.FC<VitalInfo> = ({ name, value, unit, normal_range, date }) => {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>{name}</CardTitle> {/* Example: Blood Pressure */}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value} {unit}</p> {/* Example: 120/80 mmHg */}
        {normal_range && <p className="text-sm">Normal Range: {normal_range}</p>} {/* Example: 90/60 mmHg - 120/80 mmHg */}
        <p className="text-xs text-gray-500">Date: {new Date(date).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  );
}

// VitalChart component for health parameters with multiple values over time
const VitalChart: React.FC<ChartInfo> = ({ name, description, unit, values }) => {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>{name}</CardTitle> {/* Example: Random Blood Glucose */}
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{description}</p> {/* Example: Measures blood glucose levels after eating */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={values}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString()} />
            <YAxis />
            <Tooltip labelFormatter={(date) => new Date(date).toLocaleString()} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function HealthChatInterface() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [uiComponents, setUiComponents] = useState<any[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      const aiMessage = { role: 'assistant', content: data.text_response }
      setMessages(prev => [...prev, aiMessage])

      if (data.ui_components && data.ui_components.length > 0) {
        setUiComponents(data.ui_components)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }])
    }
  }

  const renderUiComponent = (component: any) => {
    switch (component.type) {
      case 'VitalCard':
        return <VitalCard key={component.data.name} {...component.data} />
      case 'VitalChart':
        return <VitalChart key={component.data.name} {...component.data} />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about patient vitals..."
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>

      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={index}>
            <Card className="mb-2">
              <CardContent>
                <p><strong>{message.role === 'user' ? 'You:' : 'AI:'}</strong> {message.content}</p>
              </CardContent>
            </Card>

            {/* Render UI Components (Vital Cards or Charts) only after the last message */}
            {index === messages.length - 1 && uiComponents.map(renderUiComponent)}
          </div>
        ))}
      </div>
    </div>
  )
}

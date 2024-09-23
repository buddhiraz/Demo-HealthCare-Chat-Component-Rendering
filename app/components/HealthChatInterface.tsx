'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Dot } from 'recharts'; // Import Recharts components

// Type for single value vital info
type VitalInfo = {
  name: string
  value: number
  unit: string
  normal_range?: { min: number, max: number } | string
  date: string
}

// Type for chart info (multiple values over time)
type ChartInfo = {
  name: string
  description: string
  unit: string
  normal_range?: { min: number, max: number }
  values: { value: number, date: string }[]
}

// VitalCard component for single value health parameters
const VitalCard: React.FC<VitalInfo> = ({ name, value, unit, normal_range, date }) => {
  let valueColor = 'text-green-500';
  if (normal_range && typeof normal_range === 'object' && ('min' in normal_range && 'max' in normal_range)) {
    if (value < normal_range.min || value > normal_range.max) {
      valueColor = 'text-red-500';
    }
  }

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${valueColor}`}>{value} {unit}</p>
        {normal_range && typeof normal_range === 'object' && (
          <p className="text-sm">Normal Range: {normal_range.min} - {normal_range.max} {unit}</p>
        )}
        <p className="text-xs text-gray-500">Date: {new Date(date).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  );
}

// Custom dot component to color points based on normal range
const CustomDot = (props: any) => {
  const { cx, cy, value, normal_range } = props;
  let fill = "#82ca9d"; // green for within range

  if (normal_range) {
    if (value < normal_range.min || value > normal_range.max) {
      fill = "#ff6666"; // red for out of range
    }
  }

  return <Dot cx={cx} cy={cy} r={8} fill={fill} />;
}

// VitalChart component for health parameters with multiple values over time
const VitalChart: React.FC<ChartInfo> = ({ name, description, unit, values, normal_range }) => {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{description}</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={values}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString()} />
            <YAxis />
            <Tooltip labelFormatter={(date) => new Date(date).toLocaleString()} />

            {/* Draw normal range reference lines if available */}
            {normal_range && (
              <>
                <ReferenceLine y={normal_range.min} stroke="green" strokeDasharray="3 3" label={`Min: ${normal_range.min}`} />
                <ReferenceLine y={normal_range.max} stroke="green" strokeDasharray="3 3" label={`Max: ${normal_range.max}`} />
              </>
            )}

            {/* Line chart with custom dots */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              dot={<CustomDot normal_range={normal_range} />}
            />
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
      const response = await fetch('http://0.0.0.0:8000/api/sessions/132/message', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjZjYzNmY2I2NDAzMjc2MGVlYjljMjZmNzdkNDA3YTY5NGM1MmIwZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaGVhbHRoLWJhY2tlbmQtZGNjN2YiLCJhdWQiOiJoZWFsdGgtYmFja2VuZC1kY2M3ZiIsImF1dGhfdGltZSI6MTcyNzA5NDQ3MSwidXNlcl9pZCI6IlgzTEI3M1pyY2laeWVKV2RIaE5iME5CUXplTTIiLCJzdWIiOiJYM0xCNzNacmNpWnllSldkSGhOYjBOQlF6ZU0yIiwiaWF0IjoxNzI3MDk0NDcxLCJleHAiOjE3MjcwOTgwNzEsImVtYWlsIjoiYW51cmFnNTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFudXJhZzUwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.CjDmiFjRL39Pnpm5opNU0Jk3WrhDzPZZ4BPQM3eJ1lFXA-_qLbM4zU617wKkg7SE3129SA8ZB_7CYT2SJRsNuJeKqRcE58mH4tYxcgX7NLWnNJ8mIypOSPk53gASetoh0kzqCSr_URr81y97952nsdLHnK9YfCNG-f0jK4snBd_3DqBRlfaF9Gct5EHLz7BMj5VPIT9zArgt3J4NHPOlmgboHo5PlAvQRRMQCRwJhAUgJ5PURhUAUbsCwQ-m27F2SMbGzhatdRxyaDcuC4InytGYWnrArYgP3wHx_PKEVTPJ5lDQTn62LSqSwh3lLYhk23TCUNKV_v6GHN0vqe5kLg`,  // Replace with actual token
        },
        body: JSON.stringify({ text: input }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      const aiMessage = { role: 'assistant', content: data.bot_message.text }
      setMessages(prev => [...prev, aiMessage])

      if (data.bot_message.ui_component) {
        setUiComponents(data.bot_message.ui_component)
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

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

# Sample Reponse 

```json
{
    "user_message": {
        "role": "user",
        "text": "Some blood glucose and haemoglobin info ?"
    },
    "bot_message": {
        "role": "assistant",
        "text": "Certainly! I'll provide you with more detailed information about your blood glucose and hemoglobin levels from the available data.\nLet me explain these results in more detail:\n\n1. Fasting Blood Glucose:\n   Your fasting blood glucose level is 92 mg/dL, which falls within the normal range of 70-100 mg/dL. This is a good result. Fasting blood glucose is an important indicator of how well your body manages blood sugar. A level below 100 mg/dL is considered normal, 100-125 mg/dL is considered prediabetes, and 126 mg/dL or higher indicates diabetes.\n\n2. Hemoglobin:\n   Your hemoglobin level is 14.2 g/dL, which is within the normal range for adults (typically 13.5-17.5 g/dL). Hemoglobin is a protein in your red blood cells that carries oxygen throughout your body. A normal hemoglobin level indicates that your blood has a good oxygen-carrying capacity.\n\nBoth of these results are positive indicators of your health:\n\n- Your blood glucose level suggests that your body is managing blood sugar effectively, which is important for preventing diabetes and maintaining overall health.\n- Your hemoglobin level indicates that you likely have a sufficient number of healthy red blood cells, which is crucial for delivering oxygen to all parts of your body.\n\nIt's important to note that while these individual readings are good, regular monitoring over time can provide a more comprehensive picture of your health. If you have any concerns or if you're at risk for diabetes or anemia, your healthcare provider might recommend more frequent testing or additional tests like HbA1c for blood sugar or a complete blood count (CBC) for a more detailed look at your blood cells.\n\nIs there anything specific about these results you'd like me to explain further?",
        "ui_component": [
            {
                "type": "VitalCard",
                "data": {
                    "name": "Fasting Blood Glucose",
                    "description": "Blood sugar level after fasting",
                    "loinc_code": "1558-6",
                    "value": "92",
                    "unit": "mg/dL",
                    "normal_range": {
                        "min": 70,
                        "max": 100
                    },
                    "date": "2024-09-05T13: 53: 27.996581"
                }
            },
            {
                "type": "VitalCard",
                "data": {
                    "name": "Hemoglobin",
                    "description": "Oxygen-carrying protein in red blood cells",
                    "loinc_code": "718-7",
                    "value": "14.2",
                    "unit": "g/dL",
                    "normal_range": {
                        "min": 13.5,
                        "max": 17.5
                    },
                    "date": "2024-09-05T13: 53: 27.996601"
                }
            }
        ]
    }
}
```

### Component1 : VitalCard
```json
  {
    "type": "VitalCard",
    "data": {
      "name": "Testosterone Levels",
      "description": "Measurement of testosterone in the blood",
      "loinc_code": "2986-8",
      "value": "550",
      "unit": "ng/dL",
      "date": "2024-08-10T08:23:11Z"
    }
  }
```

### Component1 : VitalChart
```json
 {
    "type": "VitalChart",
    "data": {
      "name": "Body Weight",
      "description": "Measurements of body weight over time",
      "loinc_code": "29463-7",
      "unit": "kg",
      "normal_range": { "min": 18.5, "max": 24.9 },
      "values": [
        {
          "value": 65.5,
          "date": "2024-09-02T07:08:42.130146"
        },
        {
          "value": 70.5,
          "date": "2024-09-02T07:08:42.130146"
        }
      ]
    }
  }

```

![image](https://github.com/user-attachments/assets/23c8d6bc-aee1-4c8d-878d-f7795103aad8)





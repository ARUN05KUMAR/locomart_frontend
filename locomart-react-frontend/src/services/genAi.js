// utils/useGemini.ts

import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API,
})

export const generateWithGemini = async ({
    prompt,
    model = 'gemini-2.0-pro', // or gemini-2.0-flash if you want speed
    context = '',
}) => {
    try {
        const result = await ai.models.generateContent({
            model,
            contents: context + prompt,
        })

        // Get the response text
        const response = await result.response
        const text = response.text()

        return { success: true, text }
    } catch (error) {
        console.error('Gemini API Error:', error)
        return { success: false, text: '', error }
    }
}

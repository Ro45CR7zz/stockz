import {inngest} from "@/lib/inngest/client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "@/lib/inngest/prompt";
import { success } from "better-auth";
import { sendWelcomeEmail } from "../nodemailer";
import { GoogleGenAI } from "@google/genai";

export const sendSignUpEmail = inngest.createFunction(
    {id: 'sign-up-email'},
    {event: 'app/user.created'},
    async ({event, step}) =>{
        const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk Tolerance: ${event.data.riskTolerance}
            - Preferred Industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile);

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-3-flash-preview' }),
            body: {
                contents:[
                    {
                        role: 'user',
                        parts: [
                            { text: prompt }
                        ]
                    }]
            }
        });

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining Stockzz! You can now track real-time stock prices and receive personalized alerts based on your preferences. We\'re excited to have you on board and help you stay informed about the market. Happy investing!'
            const {data:{email, name}} = event;
            return await sendWelcomeEmail({email, name, intro: introText})
        })

        return {
            success: true,
            message: 'Welcome email sent successfully',
        }
    }


)
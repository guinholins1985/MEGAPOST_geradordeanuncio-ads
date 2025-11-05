
import { GoogleGenAI, Type } from "@google/genai";
import type { AdCopy, FormState } from '../types';

export const generateAdCopy = async (formData: FormState): Promise<AdCopy> => {
  if (!process.env.API_KEY) {
    throw new Error("A variável de ambiente API_KEY não está definida.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Você é um especialista em marketing digital e copywriting, especializado na criação de anúncios de alta conversão para Google Ads e Meta Ads (Facebook/Instagram).

    **Tarefa:** Crie textos de anúncio com base nas seguintes informações:

    *   **Nome do Produto/Serviço:** ${formData.productName}
    *   **Descrição:** ${formData.productDescription}
    *   **Público-alvo:** ${formData.targetAudience}
    *   **Tom de Voz Desejado:** ${formData.tone}

    **Requisitos de Saída:**
    - Gere 3 headlines e 2 descriptions para Google Ads. Headlines devem ter no máximo 30 caracteres. Descriptions devem ter no máximo 90 caracteres.
    - Gere 2 primary texts e 2 headlines para Meta Ads. Primary texts podem ser mais longos (cerca de 125 caracteres). Headlines para Meta Ads devem ter no máximo 40 caracteres.
    - O texto deve ser persuasivo, focado nos benefícios e com uma chamada para ação clara.
    - Retorne a resposta estritamente no formato JSON, conforme o schema fornecido.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      googleAds: {
        type: Type.OBJECT,
        properties: {
          headlines: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 headlines para Google Ads (máx 30 caracteres cada)."
          },
          descriptions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2 descriptions para Google Ads (máx 90 caracteres cada)."
          },
        },
      },
      metaAds: {
        type: Type.OBJECT,
        properties: {
          primaryTexts: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2 textos principais para Meta Ads (aprox. 125 caracteres)."
          },
          headlines: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2 headlines para Meta Ads (máx 40 caracteres cada)."
          },
        },
      },
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    return parsedJson as AdCopy;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw new Error("Não foi possível gerar o texto do anúncio. Tente novamente.");
  }
};

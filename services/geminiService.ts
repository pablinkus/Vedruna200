
import { GoogleGenAI } from "@google/genai";
import { FormData, LetterResult, LetterMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * Builds the customized prompt for Santa Joaquina de Vedruna.
 */
const buildSystemInstruction = (mode: LetterMode): string => {
  let modeSpecific = "";
  if (mode === LetterMode.SCHOOL) {
    modeSpecific = "Escribes como fundadora preocupada por la gestión pedagógica y el espíritu del centro educativo. Tono institucional pero cálido.";
  } else if (mode === LetterMode.INDIVIDUAL) {
    modeSpecific = "Escribes como una madre espiritual que da consejo personal. Tono cercano, comprensivo y motivador.";
  } else if (mode === LetterMode.SISTER) {
    modeSpecific = "Escribes de hermana a hermana carmelita. Tono profundamente espiritual, fraternal, centrado en la oración y la misión compartida.";
  }

  return `
    Actúa como Santa Joaquina de Vedruna, fundadora de las Hermanas Carmelitas de la Caridad. 
    Escribe una carta en estilo epistolar del siglo XIX, adaptada a los tiempos actuales.
    ${modeSpecific}
    
    Instrucciones de estilo:
    1. Usa un lenguaje sencillo, cálido y lleno de esperanza.
    2. Utiliza frases cortas y párrafos breves.
    3. No cites textualmente documentos largos, úsalos como inspiración para el tono y valores.
    4. Céntrate en el valor o necesidad que el usuario te aporta.
    5. No inventes hechos históricos falsos sobre el centro o la persona.
    6. Extensión: entre 250 y 400 palabras.
    7. Firma siempre como "Joaquina de Vedruna".
    8. Saludo personalizado según el contexto.
    9. Escribe siempre en español.
  `;
};

/**
 * Simulates a RAG call by providing a summarized context of the core documents.
 */
const getRagContext = (): string => {
  return `
    Documentos de referencia (Resumen):
    - Proyecto Educativo Vedruna: "Educar desde el amor para la vida". Valores: vida, dignidad, justicia, libertad, solidaridad, cuidado de la naturaleza. Lema: "Hacedlo todo por amor, y nada por fuerza".
    - Epistolario (1823-1850): Cartas a sus hijos, nuera y hermanas. Muestran a una Joaquina resiliente, que confía plenamente en la Divina Providencia a pesar de las estrecheces económicas y persecuciones políticas. Destaca su "pedagogía de la proximidad" y su deseo de que todos "sean unos santos".
    - Valores pedagógicos: Gánate el corazón de los alumnos. El educador es guía y compañero de viaje.
  `;
};

export const generateLetter = async (data: FormData): Promise<LetterResult> => {
  const userContext = `
    MODO: ${data.mode}
    CONTEXTO:
    ${data.centerName ? `- Centro: ${data.centerName}` : ''}
    ${data.name ? `- Nombre: ${data.name}` : ''}
    ${data.community ? `- Comunidad: ${data.community}` : ''}
    ${data.mission ? `- Misión: ${data.mission}` : ''}
    - Ubicación: ${data.city}, ${data.province}
    - Necesidad/Valor a tratar: ${data.needValue}
    ${data.message ? `- Mensaje adicional del usuario: ${data.message}` : ''}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escribe la carta en español basándote en este contexto: ${userContext}`,
      config: {
        systemInstruction: buildSystemInstruction(data.mode) + "\n" + getRagContext(),
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const text = response.text || "Lo siento, Joaquina no puede escribirte en este momento.";
    
    return {
      content: text
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("No se pudo contactar con Joaquina. Revisa tu conexión.");
  }
};

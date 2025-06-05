// import { Groq } from "groq-sdk";
// import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//   const groq = new Groq({
//     apiKey: process.env.GROQ_API_KEY,
//   });

//   try {
//     const body = await req.json();
//     const prompt = body.prompt || "Hello from Vercel!";

//     const response = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const message =
//       response.choices[0]?.message?.content || "No content received";

//     return Response.json({ message });
//   } catch (error: any) {
//     return Response.json(
//       { error: error.message || "Unexpected error" },
//       { status: 500 }
//     );
//   }
// }

import { Groq } from "groq-sdk";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const message =
      "La inteligencia artificial (IA) es una rama de la informática que busca crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana. Entre estas tareas se incluyen el reconocimiento de voz, la toma de decisiones, la traducción de idiomas y el aprendizaje automático. A lo largo de los años, la IA ha evolucionado desde simples algoritmos basados en reglas hasta sistemas complejos como redes neuronales profundas. Actualmente, se aplica en áreas tan diversas como la medicina, la educación, la industria automotriz y el entretenimiento. Su avance plantea oportunidades enormes, pero también desafíos éticos y sociales importantes.";

    return Response.json({ message });
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}

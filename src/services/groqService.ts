export async function getGroqResponse(prompt: string): Promise<string> {
  const res = await fetch("/api/groq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error al generar respuesta con IA");
  }

  const data = await res.json();
  return data.message;
}

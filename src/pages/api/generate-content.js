import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export default async function handler(req, res) {
  const { location } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const articleResult = await model.generateContent([
      `without including date, in 500 words each, provide data about the actual atmosphere condition at ${location} and use meteorology to predict how the weather will behave in the future, secondly, write a detailed farming strategy, guide and advice for farmers based on the weather condition and key weather info of ${location} . Format the response with headers and paragraphs. do not include placeholders, specify everything`,
    ]);

    // For image generation
    const imageResult = await model.generateContent([
      `Generate an image representing the weather in ${location}`,
    ]);

    res.status(200).json({
      article: articleResult.response.text(),
      imageUrl: imageResult.response.image_url, // Ensure this matches the actual response format
    });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
}

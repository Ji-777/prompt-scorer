// 提示词评分逻辑：使用 deepseek 调用模型
const deepseek = require("deepseek-sdk");

const model = deepseek({
  apiKey: process.env.DEEPSEEK_API_KEY!,
});

export async function evaluatePrompt(prompt: string) {
  const response = await model.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content:
          "You're a prompt engineer. Give this prompt a score from 0-100 and explain why.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const result = response.choices[0].message.content;
  return result;
}

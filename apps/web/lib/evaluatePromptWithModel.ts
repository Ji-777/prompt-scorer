// apps/web/lib/evaluatePromptWithModel.ts

export type SupportedModel =
  | "openai"
  | "claude"
  | "gemini"
  | "kimi"
  | "qwen";

export async function evaluatePromptWithModel(
  prompt: string,
  modelType: SupportedModel
): Promise<string> {
  switch (modelType) {
    case "openai":
      return await evaluateWithOpenAI(prompt);
    case "claude":
      return await evaluateWithClaude(prompt);
    case "gemini":
      return await evaluateWithGemini(prompt);
    case "kimi":
      return await evaluateWithKimi(prompt);
    case "qwen":
      return await evaluateWithQwen(prompt);
    default:
      throw new Error(`Unsupported model type: ${modelType}`);
  }
}

// 🔵 OpenAI
async function evaluateWithOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY!;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You're a prompt engineer. Score the user's prompt from 0 to 100 and explain why.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const json = await response.json();
  return json.choices?.[0]?.message?.content ?? "No response from OpenAI.";
}

// 🟠 Claude (Anthropic)
async function evaluateWithClaude(prompt: string): Promise<string> {
  const apiKey = process.env.CLAUDE_API_KEY!;
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `Please evaluate the following prompt from 0 to 100 and explain why:\n\n${prompt}`,
        },
      ],
    }),
  });

  const json = await response.json();
  return json.content?.[0]?.text ?? "No response from Claude.";
}

// 🟡 Gemini
async function evaluateWithGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY!;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Score this prompt from 0 to 100 and explain your reasoning:\n\n${prompt}`,
              },
            ],
          },
        ],
      }),
    }
  );

  const json = await response.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response from Gemini.";
}

// 🟣 Kimi（Moonshot）
async function evaluateWithKimi(prompt: string): Promise<string> {
  const apiKey = process.env.KIMI_API_KEY!;
  const response = await fetch("https://api.moonshot.cn/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "moonshot-v1-8k",
      messages: [
        {
          role: "system",
          content:
            "You're a prompt engineer. Give the user's prompt a score (0–100) with explanation.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  const json = await response.json();
  return json.choices?.[0]?.message?.content ?? "No response from Kimi.";
}

// 🔴 Qwen（阿里通义）
async function evaluateWithQwen(prompt: string): Promise<string> {
  const apiKey = process.env.QWEN_API_KEY!;
  const response = await fetch("https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "qwen-plus",
      input: {
        prompt: `Please score this prompt between 0 and 100 and explain the reason:\n\n${prompt}`,
      },
    }),
  });

  const json = await response.json();
  return json.output?.text ?? "No response from Qwen.";
}

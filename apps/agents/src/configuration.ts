import { Annotation } from "@langchain/langgraph";
import { SYSTEM_PROMPT_TEMPLATE } from "./prompts.js";
import { RunnableConfig } from "@langchain/core/runnables";

export const ConfigurationSchema = Annotation.Root({
  systemPromptTemplate: Annotation<string>,
  model: Annotation<string>,
});

export function ensureConfiguration(
  config: RunnableConfig,
): typeof ConfigurationSchema.State {
  const configurable = config.configurable ?? {};
  return {
    systemPromptTemplate:
      typeof configurable.systemPromptTemplate === "string"
        ? configurable.systemPromptTemplate
        : SYSTEM_PROMPT_TEMPLATE,
    model:
      typeof configurable.model === "string"
        ? configurable.model
        : "deepseek/deepseek-chat", // ✅ 带 provider 的标准格式
  };
}

import { initChatModel } from "langchain/chat_models/universal";

/**
 * Load a chat model from a fully specified name.
 * @param fullySpecifiedName - Format: 'provider/model' or just 'model'
 */
export async function loadChatModel(fullySpecifiedName: string) {
  if (typeof fullySpecifiedName !== "string") {
    throw new Error(
      `Invalid model format: expected string but got ${typeof fullySpecifiedName}`
    );
  }

  const index = fullySpecifiedName.indexOf("/");
  if (index === -1) {
    return await initChatModel(fullySpecifiedName); // 只有 model，无 provider
  } else {
    const provider = fullySpecifiedName.slice(0, index);
    const model = fullySpecifiedName.slice(index + 1);
    return await initChatModel(model, { modelProvider: provider });
  }
}

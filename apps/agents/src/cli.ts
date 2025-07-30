import { graph } from "./graph.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  let messages = [];

  const promptUser = () => {
    rl.question("🧠 你说: ", async (input) => {
      messages.push({ role: "user", content: input });

      const res = await graph.invoke({ messages });
      const last = res.messages[res.messages.length - 1];

      console.log("🤖 AI:", last.content || "[空响应]");

      messages = res.messages; // 保存上下文
      promptUser(); // 继续下一轮
    });
  };

  promptUser();
}

main();

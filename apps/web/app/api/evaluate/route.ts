// apps/web/app/api/evaluate/route.ts

import { NextResponse } from "next/server";
import { evaluatePromptWithModel } from "@/lib/evaluatePromptWithModel";

export async function POST(req: Request) {
  try {
    const { prompt, model = "openai" } = await req.json();

    // ✅ 传入两个参数
    const result = await evaluatePromptWithModel(prompt, model);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("评分失败:", error);
    return NextResponse.json({ error: "评分失败" }, { status: 500 });
  }
}

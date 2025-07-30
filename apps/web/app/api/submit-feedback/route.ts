import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 修正路径，仅指向当前 apps/web 下的 feedback.json 文件
const filePath = path.join(process.cwd(), 'feedback.json');

export async function POST(req: NextRequest) {
  try {
    const { rating, comment } = await req.json();

    const newFeedback = {
      id: Date.now(),
      user: 'Anonymous',
      comment,
      rating,
      timestamp: new Date().toISOString(),
    };

    let feedbacks = [];
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      feedbacks = JSON.parse(data);
    } catch (e) {
      // 文件不存在也没关系
    }

    feedbacks.unshift(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(feedbacks, null, 2));

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Saving feedback failed:', error);
    return new NextResponse('Failed to save feedback', { status: 500 });
  }
}

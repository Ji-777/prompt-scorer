// apps/web/app/utils/db.ts

import { openDB } from 'idb'

const DB_NAME = 'PromptCoachDB'
const STORE_NAME = 'scoreRecords'

// ✅ 评分数据结构（已支持 feedback）
export interface ScoreRecord {
  id: string
  prompt: string
  score: number
  suggestions: string[]
  timestamp: number
  feedback?: string // ✅ 新增：用户反馈
}

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    },
  })
}

export async function addRecord(record: ScoreRecord) {
  const db = await getDB()
  await db.put(STORE_NAME, record)
}

export async function getAllRecords(): Promise<ScoreRecord[]> {
  const db = await getDB()
  return await db.getAll(STORE_NAME)
}

export async function clearRecords() {
  const db = await getDB()
  await db.clear(STORE_NAME)
}

export async function updateFeedback(id: string, feedback: string) {
  const db = await getDB()
  const record = await db.get(STORE_NAME, id)
  if (record) {
    record.feedback = feedback
    await db.put(STORE_NAME, record)
  }
}

// lib/utils/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://649d9e0a016a.ngrok-free.app';
const USER_AGENT = 'AmalaAtlas/1.0';

async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': USER_AGENT,
    ...(options.headers || {}),
  };
  return fetch(url, { ...options, headers });
}

export async function createSession(appName: string, userId: string, sessionId: string) {
  const path = `/apps/${appName}/users/${userId}/sessions/${sessionId}`;
  const res = await apiFetch(path, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
}

export async function runQuery({ appName, userId, sessionId, text }: { appName: string; userId: string; sessionId: string; text: string; }) {
  const path = '/run';
  const body = {
    app_name: appName,
    user_id: userId,
    session_id: sessionId,
    new_message: {
      role: 'user',
      parts: [{ text }],
    },
  };
  const res = await apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to run query');
  return res.json();
}

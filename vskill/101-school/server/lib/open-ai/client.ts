import { assertString } from '../../../lib/assert'

const GEMINI_ENDPOINT = 'https://api.gemini.com/v1'

export async function fetchApi<T>(
  path: string,
  {
    method,
    body,
    apiKey = getApiKey(),
  }: {
    method?: 'GET' | 'POST'
    body?: Record<string, unknown>
    apiKey?: string
  },
): Promise<T> {
  assertString(apiKey, 'No Gemini API Key provided')

  const response = await fetch(`${GEMINI_ENDPOINT}${path}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
  })

  if (!response.ok) {
    throw new Error(
      `Gemini API responded with ${response.status}: ${await response.text()}`
    )
  }

  const json = await response.json()

  return json as T
}

function getApiKey(): string | undefined {
  if (typeof process !== 'undefined') {
    return process.env?.GEMINI_API_KEY
  }
}

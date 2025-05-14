import { fetchApi } from './client'
import {
  ChatFunction,
  ChatMessage,
  ChatResponse,
  // We alias the OpenAI response type as GeminiChatCompletion,
  // assuming Gemini returns a similar structure.
  OpenAIChatCompletion as GeminiChatCompletion,
  SupportedModels,
} from './types'
import { assert } from '../../../lib/assert'

interface Options {
  messages: ChatMessage[]
  model?: SupportedModels
  temperature?: number
  apiKey?: string
  functions?: ChatFunction[]
  functionCall?: string
}

export async function fetchCompletion({
  messages,
  functions,
  functionCall,
  apiKey,
  model = 'gpt-4-1106-preview', // Change this if Gemini uses a different model name
  temperature = 0,
}: Options): Promise<ChatResponse> {
  const response = await fetchApi<GeminiChatCompletion>(`/chat/completions`, {
    method: 'POST',
    body: {
      model,
      temperature,
      messages,
      functions,
      function_call: functionCall ? { name: functionCall } : undefined,
    },
    apiKey,
  })

  assert(response.choices.length === 1, 'Expected response.choices to be 1')

  const [choice] = response.choices

  return choice.message
}






















/*{import { fetchApi } from './client'
import {
  ChatFunction,
  ChatMessage,
  ChatResponse,
  // You can keep using the same type if Gemini’s response is identical,
  // or rename it to GeminiChatCompletion if you want clearer naming.
  OpenAIChatCompletion as GeminiChatCompletion,
  SupportedModels,
} from './types'
import { assert } from '../../../lib/assert'

interface Options {
  messages: ChatMessage[]
  model?: SupportedModels
  temperature?: number
  apiKey?: string
  functions?: ChatFunction[]
  functionCall?: string
}

export async function fetchCompletion({
  messages,
  functions,
  functionCall,
  apiKey,
  model = 'gpt-4-1106-preview', // Change if Gemini uses a different model name
  temperature = 0,
}: Options): Promise<ChatResponse> {
  const response = await fetchApi<GeminiChatCompletion>(`/chat/completions`, {
    method: 'POST',
    body: {
      model,
      temperature,
      messages,
      functions,
      function_call: functionCall ? { name: functionCall } : undefined,
    },
    apiKey,
  })

  assert(response.choices.length === 1, 'Expected response.choices to be 1')

  const [choice] = response.choices

  return choice.message
}
}*/
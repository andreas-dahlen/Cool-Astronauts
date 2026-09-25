import type { CombinedUserSchema } from '@project/shared'
import { randomUUID } from 'node:crypto'

export const users: CombinedUserSchema[] = [
  {
    userId: randomUUID(),
    name: 'Berit'
  },
  {
    userId: randomUUID(),
    name: 'Sandulf'
  }
]
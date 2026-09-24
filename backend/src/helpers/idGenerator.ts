

const MAX_ID = 1_000_000
export function generateId<T>(
  items: T[],
  key: keyof T,
): number {
  let id = Math.floor(Math.random() * MAX_ID)

  while (items.some(item => item[key] === id)) {
    id = Math.floor(Math.random() * MAX_ID)
  }

  return id
}

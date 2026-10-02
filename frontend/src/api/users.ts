import { UserWithIdArraySchema, type ProductWithId, type UserWithId } from '@project/shared'



export async function getUser(basePath: string): Promise<UserWithId> {

  try {
    const response = await fetch(`${basePath}users`)
    console.log(response.status, response.url)
    const rawData = await response.json()
    const data = UserWithIdArraySchema.parse(rawData)

    const user = data.find(userData => userData.name === "Berit")

    if (!user) {
      throw new Error(`Couldn't find user`)
    }

    return user

  } catch (error) {
    throw new Error('Could not fetch users')
  }
}
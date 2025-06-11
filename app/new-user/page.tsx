import { createUser } from '@/utils/auth'
import { redirect } from 'next/navigation'

const NewUser = async () => {
  await createUser(redirect('/journal'))
  return <div>Hello</div>
}

export default NewUser

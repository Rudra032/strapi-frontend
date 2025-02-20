import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request) {
  // Disable Draft Mode by clearing the cookie
  draftMode().disable()

  // Redirect to the homepage
  redirect('/')
}
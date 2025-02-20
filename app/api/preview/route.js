import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request) {
  // const { searchParams } = new URL(request.url)
  // const secret = searchParams.get('secret')
  // const slug = searchParams.get('slug')

  // // Check the secret and next parameters
  // // This secret should only be known to this route handler and the CMS
  // if (secret !== process.env.NEXT_PUBLIC_PREVIEW_SECRET) {
  //   return new Response('Invalid token', { status: 401 })
  // }

  // Enable Draft Mode by setting the cookie
  draftMode().enable()

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(`/articles`)
}
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST(request) {
  const headersList = await headers()
  const origin = headersList.get('origin')

  const user = await getUserSession();
  const formData = await request.formData();
  const price = formData.get("price");
  const title = formData.get("title");
  const taskId = formData.get("taskId");
  const proposalId = formData.get("proposalId");
  const freelancerEmail = formData.get("freelancerEmail");

  const session = await stripe.checkout.sessions.create({
    customer_email: user?.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(Number(price) * 100),
          product_data: {
            name: title,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: { taskId, proposalId, freelancerEmail },
    success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  return NextResponse.redirect(session.url, 303)
}
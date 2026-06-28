import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
    "freelancer_growth": "price_1TnFLzL7yFdaGLeX4EKujzc3",
"freelancer_elite": "price_1TnG5TL7yFdaGLeXeaZVE3vw"
}
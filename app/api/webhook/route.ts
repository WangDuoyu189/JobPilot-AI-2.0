import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: Request){
  const body=await req.text();
  const sig=req.headers.get("stripe-signature");
  if(!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !sig)
    return new NextResponse("Webhook not configured",{status:400});
  const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
  try{
    const event=stripe.webhooks.constructEvent(body,sig,process.env.STRIPE_WEBHOOK_SECRET);
    if(event.type==="checkout.session.completed") console.log("checkout completed");
    if(event.type==="customer.subscription.deleted") console.log("subscription canceled");
    return NextResponse.json({received:true});
  }catch(e:any){return new NextResponse(`Webhook Error: ${e.message}`,{status:400})}
}

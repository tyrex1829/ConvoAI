import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import { cookies } from "next/headers";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(request: Request) {
  try {
    // Get cookies from the request
    const cookieStore = await cookies();

    // Verify user session by calling the backend
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    const userResponse = await fetch(`${backendUrl}/user/data`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userData = await userResponse.json();

    if (!userData.data) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const priceId = process.env.STRIPE_PRICE_ID;

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?cancel=true`,
      customer_email: userData.data.email,
      metadata: {
        userId: userData.data.id,
      },
    });

    if (stripeSession) {
      return NextResponse.json({ status: 200, session_url: stripeSession.url });
    }

    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Payment route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

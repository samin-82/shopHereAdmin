import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const {
      orderItems,
      shippingAddress,
      customer: customerInfo,
      total,
    } = await req.json();

    ////////////////////////
    await connectToDB();

    const newOrder = new Order({
      customerClerkId: customerInfo.clerkId,
      products: orderItems,
      shippingAddress,
      // shippingRate: session?.shipping_cost?.shipping_rate,
      shippingRate: 0,
      totalAmount: total,
    });

    await newOrder.save();

    let customer = await Customer.findOne({ clerkId: customerInfo.clerkId });

    if (customer) {
      customer.orders.push(newOrder._id);
    } else {
      customer = new Customer({
        ...customerInfo,
        orders: [newOrder._id],
      });
    }

    await customer.save();

    return new NextResponse("Order created", { status: 200 });
    //////////////////////////

    // return NextResponse.json({ result: "result" }, { status: 200 });
  } catch (err) {
    console.log("[EXPayment_POST]", err);
    return new NextResponse("problem with EXPayment", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
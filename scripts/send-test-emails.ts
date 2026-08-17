import { sendTrackingUpdate, sendStatusUpdate } from "@/lib/mailer";

const TO = "moneybman0@gmail.com";

const DUMMY = {
  name:            "Test Customer",
  email:           TO,
  ref:             "DC-TEST01",
  tracking_number: "DGC-20260817-0001",
};

async function run() {
  console.log("Sending 5 test emails to", TO, "\n");

  console.log("1/5 Being Prepared...");
  await sendTrackingUpdate({ ...DUMMY, templateId: "processing", message: "We are pleased to confirm that your order has been successfully confirmed and is now being prepared by our fulfilment team.\n\nOur team is carefully preparing your order to ensure everything is correct before it moves to the next stage.\n\nWe will notify you as soon as your order is ready for packing." });
  console.log("    ✓ Sent");

  console.log("2/5 Being Packed...");
  await sendTrackingUpdate({ ...DUMMY, templateId: "packed", message: "Your order has successfully moved to the packing stage.\n\nOur fulfilment team is currently checking and securely packaging your order to ensure that it is properly prepared for transportation.\n\nOnce packing and final quality checks are completed, your order will proceed to shipping. You will receive another notification when your order has been dispatched." });
  console.log("    ✓ Sent");

  console.log("3/5 Shipped (auto email)...");
  await sendStatusUpdate({ ...DUMMY, status: "shipped" });
  console.log("    ✓ Sent");

  console.log("4/5 Out for Delivery...");
  await sendTrackingUpdate({ ...DUMMY, templateId: "out_for_delivery", message: "Great news. Your Daisy Gadgets Co. order is now out for delivery.\n\nYour assigned delivery driver is currently completing the delivery route and will contact you directly when they are approaching your location.\n\nKindly keep your phone available and ensure that someone is available to receive the order.\n\nPlease note: Delivery times may vary depending on the driver's route, traffic and other scheduled deliveries.\n\nWe appreciate your patience and look forward to completing your delivery successfully." });
  console.log("    ✓ Sent");

  console.log("5/5 Delivered (auto email)...");
  await sendStatusUpdate({ ...DUMMY, status: "delivered" });
  console.log("    ✓ Sent");

  console.log("\nAll 5 emails sent. Check your inbox.");
}

run().catch(console.error);

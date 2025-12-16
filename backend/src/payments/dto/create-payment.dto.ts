export class CreatePaymentDto {
  orderId: string;
  razorpay_payment_id: string;  // card, upi, cod
}
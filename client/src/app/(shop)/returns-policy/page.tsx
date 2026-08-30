export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns Policy</h1>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">30-Day Returns</h2>
          <p>
            We accept returns within 30 days of delivery. Items must be unworn, in original condition,
            and returned in their original packaging with all tags attached.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">How to Return</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Email us at <a href="mailto:MkhabeleEnterprise@gmail.com" className="text-gray-900 underline">MkhabeleEnterprise@gmail.com</a> with your order number and reason for return.</li>
            <li>We will send you a return reference number within 1–2 business days.</li>
            <li>Pack the item securely and ship it back to the address provided.</li>
            <li>Once received and inspected, your refund will be processed within 5–7 business days.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Non-Returnable Items</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Items marked as final sale</li>
            <li>Items that have been worn, washed, or altered</li>
            <li>Items returned without original packaging</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Refunds</h2>
          <p>
            Refunds are issued to the original payment method. Shipping costs are non-refundable
            unless the return is due to a defect or our error.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h2>
          <p>
            Questions? Reach us at{' '}
            <a href="mailto:MkhabeleEnterprise@gmail.com" className="text-gray-900 underline">
              MkhabeleEnterprise@gmail.com
            </a>{' '}
            or call{' '}
            <a href="tel:0724816274" className="text-gray-900 underline">
              0724816274
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

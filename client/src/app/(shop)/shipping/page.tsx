export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Info</h1>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Delivery Areas</h2>
          <p>We deliver nationwide across South Africa. All major cities and surrounding areas are covered.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Delivery Times</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-900">Location</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-900">Estimated Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Johannesburg &amp; Pretoria</td>
                  <td className="px-4 py-3">2–3 business days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Cape Town &amp; surrounds</td>
                  <td className="px-4 py-3">3–5 business days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Durban &amp; KZN</td>
                  <td className="px-4 py-3">3–5 business days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Other areas</td>
                  <td className="px-4 py-3">5–7 business days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Shipping Costs</h2>
          <p>
            Shipping costs are calculated at checkout based on your location and order size.
            Free shipping is available on qualifying orders.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Tracking</h2>
          <p>
            Once your order is dispatched, you will receive a tracking number via email.
            You can use this to monitor your delivery status.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Questions?</h2>
          <p>
            Contact us at{' '}
            <a href="mailto:MkhabeleEnterprise@gmail.com" className="text-gray-900 underline">
              MkhabeleEnterprise@gmail.com
            </a>{' '}
            or{' '}
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

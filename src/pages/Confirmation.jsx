import { useParams, Link } from 'react-router-dom'
import { getInvoiceById } from '../utils/invoice'
import { formatCurrency } from '../utils/pricing'
import { formatDisplayDate } from '../utils/dateUtils'
import { BUSINESS } from '../data/businessInfo'

export default function Confirmation() {
  const { invoiceId } = useParams()
  const invoice = getInvoiceById(invoiceId)

  if (!invoice) {
    return (
      <div className="page container">
        <p>We couldn&rsquo;t find that invoice on this device.</p>
        <Link to="/menu" className="btn btn--primary">Back to menu</Link>
      </div>
    )
  }

  return (
    <div className="page container">
      <div className="page-header page-header--center">
        <p className="confirmation-badge">✓ Order placed</p>
        <h1>Thank you, {invoice.customer.fullName.split(' ')[0]}!</h1>
        <p>Your order has been saved. Please print or save a copy of your invoice below for pickup.</p>
      </div>

      <div className="invoice" id="invoice-print">
        <div className="invoice__header">
          <div>
            <h2>{BUSINESS.name}</h2>
            <p>{BUSINESS.address}</p>
            <p>{BUSINESS.phone} · {BUSINESS.email}</p>
          </div>
          <div className="invoice__meta">
            <p><strong>Invoice #</strong> {invoice.id}</p>
            <p><strong>Date placed</strong> {new Date(invoice.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="invoice__section">
          <h3>Pickup</h3>
          <p>{formatDisplayDate(invoice.pickup.date)}</p>
          <p>{invoice.pickup.window}</p>
          <p>{invoice.pickup.location}</p>
        </div>

        <div className="invoice__section">
          <h3>Customer</h3>
          <p>{invoice.customer.fullName}</p>
          <p>{invoice.customer.phone}</p>
          <p>{invoice.customer.email}</p>
        </div>

        <div className="invoice__section">
          <h3>Items</h3>
          <table className="invoice__table" aria-label="Ordered items">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Servings</th>
                <th scope="col">Price / person</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{formatCurrency(item.pricePerPerson)}</td>
                  <td>{formatCurrency(item.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="invoice__totals">
            <div><span>Subtotal</span><span>{formatCurrency(invoice.totals.subtotal)}</span></div>
            <div><span>Estimated tax</span><span>{formatCurrency(invoice.totals.tax)}</span></div>
            <div className="invoice__grand-total"><span>Total due at pickup</span><span>{formatCurrency(invoice.totals.total)}</span></div>
          </div>
        </div>

        <div className="invoice__section">
          <h3>Payment method</h3>
          <p>
            {invoice.payment.method}
            {invoice.payment.cardLast4 && ` ending in ${invoice.payment.cardLast4}`}
          </p>
        </div>

        {invoice.specialInstructions && (
          <div className="invoice__section">
            <h3>Special instructions</h3>
            <p>{invoice.specialInstructions}</p>
          </div>
        )}

        <p className="invoice__disclaimer">
          This invoice was generated locally on your device for demonstration purposes. No real payment has been processed.
        </p>
      </div>

      <div className="invoice-actions">
        <button type="button" className="btn btn--primary" onClick={() => window.print()}>
          Print invoice
        </button>
        <Link to="/menu" className="btn btn--ghost">Place another order</Link>
      </div>
    </div>
  )
}

import { Link, useParams } from 'react-router-dom'
import { getInvoice } from '../utils/invoices'
import { formatCurrency } from '../utils/currency'
import { formatFriendlyDate } from '../utils/date'
import { BUSINESS } from '../data/business'

export default function Invoice() {
  const { orderId } = useParams()
  const invoice = getInvoice(orderId)

  if (!invoice) {
    return (
      <div className="container invoice-page invoice-page--missing">
        <h1>Invoice not found</h1>
        <p>We couldn't find an order with that ID on this device.</p>
        <Link to="/menu" className="btn btn--primary">
          Back to menu
        </Link>
      </div>
    )
  }

  const placedAt = new Date(invoice.placedAt)

  return (
    <div className="container invoice-page">
      <div className="invoice-page__actions no-print">
        <Link to="/menu" className="btn btn--ghost">
          Order more
        </Link>
        <button type="button" className="btn btn--primary" onClick={() => window.print()}>
          Print invoice
        </button>
      </div>

      <div className="invoice">
        <header className="invoice__header">
          <div>
            <h1>{BUSINESS.name}</h1>
            <p>{BUSINESS.address}</p>
            <p>{BUSINESS.phone}</p>
          </div>
          <div className="invoice__meta">
            <h2>Invoice</h2>
            <p>
              <strong>Order #</strong> {invoice.id}
            </p>
            <p>
              <strong>Placed</strong> {placedAt.toLocaleString('en-US')}
            </p>
          </div>
        </header>

        <section className="invoice__section">
          <h3>Pickup details</h3>
          <p>{formatFriendlyDate(invoice.pickupDate)} at {invoice.pickupTime}</p>
          <p>{invoice.pickupAddress}</p>
          <p>Serving {invoice.guestCount} guests</p>
        </section>

        <section className="invoice__section">
          <h3>Customer</h3>
          <p>{invoice.customer.fullName}</p>
          <p>{invoice.customer.phone}</p>
          <p>{invoice.customer.email}</p>
        </section>

        <section className="invoice__section">
          <h3>Payment</h3>
          <p>
            {invoice.payment.method}
            {invoice.payment.cardLast4 ? ` ending in ${invoice.payment.cardLast4}` : ''}
          </p>
        </section>

        <section className="invoice__section">
          <h3>Order items</h3>
          <table className="invoice__table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Servings</th>
                <th>Unit price</th>
                <th>Line total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.unitPrice)}</td>
                  <td>{formatCurrency(item.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice__totals">
            <div>
              <span>Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div>
              <span>Tax</span>
              <span>{formatCurrency(invoice.tax)}</span>
            </div>
            <div className="invoice__totals-final">
              <span>Total</span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </section>

        {invoice.specialInstructions && (
          <section className="invoice__section">
            <h3>Special instructions</h3>
            <p>{invoice.specialInstructions}</p>
          </section>
        )}

        <p className="invoice__footer-note">
          Thank you for your order! This invoice is saved on this device for your records. Please bring a copy
          (printed or on your phone) when you pick up your order.
        </p>
      </div>
    </div>
  )
}

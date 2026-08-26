import { Link } from 'react-router-dom'
import { getInvoices } from '../utils/invoice'
import { formatCurrency } from '../utils/pricing'
import { formatDisplayDate } from '../utils/dateUtils'

export default function OrderRecords() {
  const invoices = getInvoices()

  return (
    <div className="page container">
      <div className="page-header">
        <h1>Order Records</h1>
        <p>
          A read-only record of invoices generated on this device, kept for the business owner&rsquo;s
          reference. This is not an admin panel — nothing here can be edited or paid.
        </p>
      </div>

      {invoices.length === 0 ? (
        <p>No orders have been placed on this device yet.</p>
      ) : (
        <div className="records-list">
          {invoices.map((invoice) => (
            <div className="records-list__item" key={invoice.id}>
              <div>
                <p className="records-list__id">{invoice.id}</p>
                <p>{invoice.customer.fullName} · {invoice.customer.phone}</p>
                <p>Pickup: {formatDisplayDate(invoice.pickup.date)} ({invoice.pickup.window})</p>
              </div>
              <div className="records-list__amount">
                <p>{formatCurrency(invoice.totals.total)}</p>
                <Link to={`/confirmation/${invoice.id}`}>View invoice</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

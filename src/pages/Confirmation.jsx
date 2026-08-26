import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle.js'
import { getLastOrder, getOrderByInvoiceNumber } from '../utils/orders.js'
import { formatCurrency } from '../utils/format.js'
import { fromInputDateString, formatLongDate } from '../utils/date.js'

export default function Confirmation() {
  usePageTitle('Order confirmation')
  const location = useLocation()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const invoiceNumber = location.state?.invoiceNumber
    const found = invoiceNumber ? getOrderByInvoiceNumber(invoiceNumber) : getLastOrder()
    setOrder(found)
  }, [location.state])

  if (!order) {
    return (
      <div className="page container">
        <h1>Order confirmation</h1>
        <p>
          We couldn&rsquo;t find a recent order. <Link to="/menu">Start a new order</Link>.
        </p>
      </div>
    )
  }

  const pickupDate = order.pickupDate ? fromInputDateString(order.pickupDate) : null

  return (
    <div className="page page--confirmation container">
      <h1>Thank you, your order is confirmed</h1>
      <p>
        A copy of this invoice has been saved on this device for your records, and the
        business has a local copy as well. Please print or save this page for pickup.
      </p>

      <div className="invoice" aria-labelledby="invoice-heading">
        <div className="invoice__header">
          <div>
            <h2 id="invoice-heading">Invoice {order.invoiceNumber}</h2>
            <p>Homestead Table Catering</p>
            <p>123 Maple Street, Millbrook, ST 00000</p>
            <p>(555) 555-0142</p>
          </div>
          <div>
            <p>Placed: {new Date(order.placedAt).toLocaleString('en-US')}</p>
            {pickupDate && <p>Pickup date: {formatLongDate(pickupDate)}</p>}
            <p>Pickup time: {order.pickupTimeLabel}</p>
          </div>
        </div>

        <h3>Customer</h3>
        <p>
          {order.customer.fullName}
          <br />
          {order.customer.email}
          <br />
          {order.customer.phone}
        </p>

        <h3>Order items</h3>
        <table className="invoice-table">
          <caption className="visually-hidden">Itemized list of ordered dishes</caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Servings</th>
              <th scope="col">Price per person</th>
              <th scope="col">Line total</th>
            </tr>
          </thead>
          <tbody>
            {order.lines.map((line) => (
              <tr key={line.id}>
                <th scope="row">{line.name}</th>
                <td>{line.quantity}</td>
                <td>{formatCurrency(line.pricePerPerson)}</td>
                <td>{formatCurrency(line.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={3}>
                Total servings
              </th>
              <td>{order.totalPortions}</td>
            </tr>
            <tr>
              <th scope="row" colSpan={3}>
                Total due at pickup
              </th>
              <td>{formatCurrency(order.totalPrice)}</td>
            </tr>
          </tfoot>
        </table>

        <h3>Payment method</h3>
        <p>{order.paymentMethodLabel}</p>

        {order.instructions && (
          <>
            <h3>Special instructions</h3>
            <p>{order.instructions}</p>
          </>
        )}
      </div>

      <div className="confirmation-actions">
        <button type="button" className="button button--primary" onClick={() => window.print()}>
          Print invoice
        </button>
        <Link to="/menu" className="button button--secondary">
          Place another order
        </Link>
      </div>
    </div>
  )
}

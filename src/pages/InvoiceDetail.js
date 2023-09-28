import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import ShowInvoiceDetails from '../components/ShowInvoiceDetails';
import "../App.css"
const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null)
  const invoices = useSelector((state) => state.invoices)

  useEffect(() => {
    const targetInvoice = invoices.find((invoice) => invoice.id === id);
    if (targetInvoice) {
      setInvoice(targetInvoice)
    }
  }, [invoices, invoice, id])

  return (
    <div className="container">
      <div className='mb-5'>
        <Link to="/">
          <Button variant="outline-primary" size="sm">
            Back Home
          </Button>
        </Link>{' '}
        <Link to={`/invoice/edit/${id}`}>
          <Button variant="outline-dark" size="sm">
            Edit Invoice
          </Button>
        </Link>{' '}
      </div>
      {invoice ?
        <ShowInvoiceDetails invoice={invoice} />
        :
        <div>
          <h1> No invoice found with ID: {id}</h1>
          <h2>To create a new invoice, click
            <Link to="/create"> Here.</Link>
          </h2>
        </div>
      }
    </div>
  )
}

export default InvoiceDetail
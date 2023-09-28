import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Container from "react-bootstrap/Container"
import InvoiceForm from "../components/InvoiceForm"

const EditInvoice = () => {
  const { id } = useParams()
  const [invoice, setInvoice] = useState(null)
  const invoices = useSelector((state) => state.invoices)

  useEffect(() => {
    const targetInvoice = invoices.find((invoice) => invoice.id === id);
    if (targetInvoice) {
      setInvoice(targetInvoice)
    }
  }, [invoices, invoice, id])
  return (
    <div className='d-flex flex-column align-items-center justify-content-center w-100'>
      <Container>
        {invoice ?
          <InvoiceForm invoice={invoice} />
          :
          <div>No Invoice with id: {id}</div>
        }
      </Container>
    </div>
  )
}

export default EditInvoice

import React from 'react'
import { useParams } from 'react-router-dom';
const InvoiceDetail = () => {
  const { id } = useParams();
  return (
    <div>
      Invoice Id: {id}
    </div>
  )
}

export default InvoiceDetail

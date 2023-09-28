import React from 'react'
import { Table, Col, Row } from "react-bootstrap"

const ShowInvoiceDetails = ({ invoice }) => {
  return (
    <div id="invoiceCapture">
      <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
        <div className="w-100">
          <h4 className="fw-bold my-2">{invoice?.info?.billFrom || 'John Uberbacher'}</h4>
          <h6 className="fw-bold text-secondary mb-1">
            Invoice #: {invoice?.info?.invoiceNumber || ''}
          </h6>
        </div>
        <div className="text-end ms-4">
          <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
          <h5 className="fw-bold text-secondary"> {invoice?.currency} {invoice?.total}</h5>
        </div>
      </div>
      <div className="p-4">
        <Row className="mb-4">
          <Col md={4}>
            <div className="fw-bold">Billed to:</div>
            <div>{invoice?.info?.billTo || ''}</div>
            <div>{invoice?.info?.billToAddress || ''}</div>
            <div>{invoice?.info?.billToEmail || ''}</div>
          </Col>
          <Col md={4}>
            <div className="fw-bold">Billed From:</div>
            <div>{invoice?.info?.billFrom || ''}</div>
            <div>{invoice?.info?.billFromAddress || ''}</div>
            <div>{invoice?.info?.billFromEmail || ''}</div>
          </Col>
          <Col md={4}>
            <div className="fw-bold mt-2">Date Of Issue:</div>
            <div>{invoice?.info?.dateOfIssue || ''}</div>
          </Col>
        </Row>
        <Table className="mb-0">
          <thead>
            <tr>
              <th>QTY</th>
              <th>DESCRIPTION</th>
              <th className="text-end">PRICE</th>
              <th className="text-end">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {invoice?.items.map((item, i) => {
              return (
                <tr id={i} key={i}>
                  <td style={{ width: '70px' }}>
                    {item?.quantity}
                  </td>
                  <td>
                    {item?.name} - {item?.description}
                  </td>
                  <td className="text-end" style={{ width: '100px' }}>{invoice?.currency} {item?.price}</td>
                  <td className="text-end" style={{ width: '100px' }}>{invoice?.currency} {item?.price * item?.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Table>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr className="text-end">
              <td></td>
              <td className="fw-bold" style={{ width: '100px' }}>SUBTOTAL</td>
              <td className="text-end" style={{ width: '100px' }}>{invoice?.currency} {invoice?.subTotal}</td>
            </tr>
            {invoice?.taxAmmount !== 0.00 &&
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: '100px' }}>TAX</td>
                <td className="text-end" style={{ width: '100px' }}>{invoice?.currency} {invoice?.taxAmmount}</td>
              </tr>
            }
            {invoice?.discountAmmount !== 0.00 &&
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: '100px' }}>DISCOUNT</td>
                <td className="text-end" style={{ width: '100px' }}>{invoice?.currency} {invoice?.discountAmmount}</td>
              </tr>
            }
            <tr className="text-end">
              <td></td>
              <td className="fw-bold" style={{ width: '100px' }}>TOTAL</td>
              <td className="text-end" style={{ width: '100px' }}>{invoice?.currency} {invoice?.total}</td>
            </tr>
          </tbody>
        </Table>
        {invoice?.info?.notes &&
          <div className="bg-light py-3 px-4 rounded">
            {invoice?.info?.notes}
          </div>}
      </div>
    </div>
  )
}

export default ShowInvoiceDetails

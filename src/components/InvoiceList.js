import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Dropdown, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { deleteInvoice, copyInvoice } from "../features/invoiceSlice"
import '../App.css';

const InvoiceList = ({ invoices }) => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  //pagination
  const itemsPerPage = 16;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInvoices = invoices.slice(startIndex, endIndex);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };
  const handleCopyInvoice = (invoice) => {
    const invoiceNumber = `INV-${uuidv4().substr(0, 8)}`
    const newInvoice = {
      ...invoice,
      id: invoiceNumber,
      info: { ...invoice.info, invoiceNumber: invoiceNumber }
    }
    dispatch(copyInvoice({ id: invoice?.info?.invoiceNumber, invoice: newInvoice }))
  }

  return (
    <>
      {(invoices.length <= 0) ?
        <h4>Currently, there are no invoices to display. To create a new invoice, click
          <Link to="/create"> Here.</Link>
        </h4>
        :
        <div>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Customer Name</th>
                <th>Amount</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvoices?.map((invoice, index) => (
                <tr
                  key={invoice?.info?.invoiceNumber}
                  onClick={() => handleRowClick(index)}
                  className={selectedRow === index ? 'selected' : ''}
                >
                  <td>{invoice?.info?.invoiceNumber}</td>
                  <td>{invoice?.info?.billTo}</td>
                  <td>{invoice?.total}</td>
                  <td>
                    <Dropdown >
                      <Dropdown.Toggle variant="primary" size="sm" id="dropdown-info">
                        select
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='dropdown-menu'>
                        <Link as={Link} to={`/invoice/${invoice?.info?.invoiceNumber}`}>
                          <Dropdown.Item as="li">
                            View
                          </Dropdown.Item>
                        </Link>
                        <Link to={`/invoice/edit/${invoice?.info?.invoiceNumber}`}>
                          <Dropdown.Item as="li" >
                            Edit
                          </Dropdown.Item>
                        </Link>
                        <Dropdown.Item as="li" onClick={() => handleCopyInvoice(invoice)}>
                          Copy
                        </Dropdown.Item>
                        <Dropdown.Item as="li" onClick={() => dispatch(deleteInvoice({ id: invoice?.info?.invoiceNumber }))}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pagination">
            <Button
              className="pagination-button"
              variant='outline-secondary'
              onClick={() => handlePageChange(1)}
              disabled={isFirstPage}
            >
              First
            </Button>
            <Button
              className="pagination-button"
              variant='outline-primary'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={isFirstPage}
            >
              Back
            </Button>
            <Button
              className="pagination-button"
              variant='outline-primary'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={isLastPage}
            >
              Next
            </Button>
            <Button
              className="pagination-button"
              variant='outline-secondary'
              onClick={() => handlePageChange(totalPages)}
              disabled={isLastPage}
            >
              Last
            </Button>
          </div>
        </div>
      }
    </>
  );
};

export default InvoiceList;

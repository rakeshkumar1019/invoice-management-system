import React from 'react';
import {Row, Col,Button,Modal} from "react-bootstrap"
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import {addInvoice,editInvoice} from "../features/invoiceSlice"
import ShowInvoiceDetails from './ShowInvoiceDetails';

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [612, 792]
    });
    pdf.internal.scaleFactor = 1;
    const imgProps= pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice-001.pdf');
  });
}


const InvoiceModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const saveInvoice = (invoice) => {
    const { closeModal, ...newInvoice } = invoice;
    const invoiceData = {id:newInvoice.info.invoiceNumber,...newInvoice}
    if(window.location.pathname.includes('edit')){
      dispatch(editInvoice(invoiceData))
    }else{
      dispatch(addInvoice(invoiceData))
    }
    navigate("/")
  }

  return (
    <div>
      <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
        <ShowInvoiceDetails invoice={props} />
        <div className="pb-4 px-4">
          <Row>
            <Col md={6}>
              <Button variant="primary" className="d-block w-100" onClick={() =>saveInvoice(props)}>
                <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Save Invoice
              </Button>
            </Col>
            <Col md={6}>
              <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
                <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                Download Copy
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <hr className="mt-4 mb-3" />
    </div>
  );
}

export default InvoiceModal;

import React from 'react'
import Container from 'react-bootstrap/Container';
import InvoiceForm from "../components/InvoiceForm"
const CreateInvoice = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
            <Container>
                <InvoiceForm />
            </Container>
        </div>
    )
}

export default CreateInvoice

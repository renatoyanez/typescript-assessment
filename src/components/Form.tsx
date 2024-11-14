import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface IFormField {
  label?: string;
  controlId?: string;
  placeholder?: string;
  type?: string;
}

interface IFormRow {
  columns?: IFormField[];
}

interface IFormProps {
  formFields?: IFormRow[];
}

const Column = (props: IFormField) => {
  return (
    <Form.Group className="mb-3" controlId={props.controlId}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control type={props.type} placeholder={props.placeholder} />
    </Form.Group>
  );
};

function CustomForm({ formFields = [] }: IFormProps) {
  return (
    <Form>
      {/* {formFields.map((row) => {
        return <Column {...row.columns} />;
      })} */}
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default CustomForm;

import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export interface IFormField {
  name?: string;
  value?: string;
  onChange?: (event?: any) => void;
  label?: string;
  controlId?: string;
  placeholder?: string;
  type?: string;
}

interface IFormProps {
  rows: IFormField[];
}

const CustomForm: React.FC<IFormProps> = ({ rows = [] }) => {
  return (
    <Form style={{ padding: "4rem 0" }}>
      {rows.map((row) => (
        <Row key={row.controlId}>
          <Form.Group className="mb-3" controlId={row.controlId}>
            <Form.Label style={{ display: "flex" }}>{row.label}</Form.Label>
            <Form.Control
              name={row.name}
              value={row.value}
              onChange={row.onChange}
              type={row.type}
              placeholder={row.placeholder}
            />
          </Form.Group>
        </Row>
      ))}
    </Form>
  );
};

export default CustomForm;

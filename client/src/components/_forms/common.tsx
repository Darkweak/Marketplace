import * as React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field } from '../Objects/Field';
import { Link } from '../Objects/Link';
import { Spinner } from 'react-bootstrap';

const mapStateToProps = ({CommonReducer: {isLoading}}: any) => ({isLoading});

export const formatFormDatas = (elements: any) => [].reduce.call(elements, (data: any, element: any) => {
    if ('' !== element.value) {
        data[ element.name ] = element.value;
    }
    return data;

}, {});

export const generateFields: any = (fields: Field[], isLoading: boolean) => (
    fields.map((field, index) => (
        <Form.Group key={index}>
            {
                field.label && (
                    <Form.Label>
                        {field.label}
                    </Form.Label>
                )
            }
            <Form.Control
                name={field.name}
                type={field.type ? field.type : 'text'}
                placeholder={field.placeholder && field.placeholder}
                disabled={isLoading}
            />
            {
                field.text && (
                    <Form.Label>
                        {field.text}
                    </Form.Label>
                )
            }
        </Form.Group>
    ))
);

interface FormProps {
    additionnalLinks?: Link[];
    fields: Field[];
    isLoading?: boolean;
    onSubmit: any;
}

export const GenerateForm: React.FunctionComponent<FormProps> = connect<any, any>(
    mapStateToProps,
    {}
)(({
       additionnalLinks = [],
       children,
       fields,
       isLoading,
       onSubmit
   }) => <Form onSubmit={onSubmit}>
        {children}
        {
            generateFields(fields, isLoading)
        }
        <Button variant="success" type="submit" className="d-block m-auto" disabled={isLoading}>
            { isLoading ? <Spinner animation="border" size="sm"/> : 'Valider' }
        </Button>
        <div className="py-2 text-center">
            {
                additionnalLinks.map((link: Link, index: number) => <a className="d-block" key={index} href={link.path}>{link.label}</a>)
            }
        </div>
    </Form>
);

import * as React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field } from '../Objects/Field';
import { Link } from '../Objects/Link';
import { CommonReducerProps } from './store/commonReducer';

interface Reducers {
    CommonReducer: CommonReducerProps;
}
const mapStateToProps = (reducers: Reducers) => ({
    isLoading: reducers.CommonReducer.isLoading
});

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

export const GenerateForm: any = connect(
    mapStateToProps,
    {}
)(({
       additionnalLinks = [],
       children,
       fields,
       isLoading,
       onSubmit,
       withoutText
   }: any) => <Form onSubmit={(event: any) => {
            event.preventDefault();
            onSubmit(formatFormDatas(event.target.elements))
        }}>
        {children}
        {
            generateFields(fields, isLoading)
        }
        <Button variant="success" type="submit" className="d-block m-auto" disabled={isLoading}>
            { isLoading ? <Spinner animation="border" size="sm"/> : 'Valider' }
        </Button>
        <div className="py-2 text-center">
            {
                withoutText ?
                    null :
                    additionnalLinks.map(
                        (link: Link, index: number) => <a className="d-block" key={index} href={link.path}>{link.label}</a>
                    )
            }
        </div>
    </Form>
);

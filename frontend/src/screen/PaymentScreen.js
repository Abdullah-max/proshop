import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import Meta from '../components/Meta';


const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    if(!shippingAddress){
        history.push('/shipping')
    }

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <>
        <Meta title='Payment' />
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                
                <Col>
                    <Form.Check 
                        type='radio'
                        label='PayPal or credit card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e)=> setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
                </Form.Group>
                    <Button type='submit'>
                        Continue
                    </Button>
            </Form>
        </FormContainer>
        </>
    )
}

export default PaymentScreen

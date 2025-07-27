package com.trading.service;

import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.trading.domain.PaymentMethod;
import com.trading.modal.PaymentOrder;
import com.trading.modal.User;
import com.trading.response.PaymentResponse;

public interface PaymentOrderService {

	PaymentOrder createOrder(User user, Long amount,
							PaymentMethod paymentMethod);
	
	PaymentOrder getPaymentOrderById(Long id) throws Exception;
	
	Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;
	
	PaymentResponse createRazorpayPaymentLink(User user, Long amount, Long paymentMethod) throws RazorpayException;
	
	PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;
}

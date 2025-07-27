package com.trading.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.trading.domain.PaymentMethod;
import com.trading.modal.PaymentOrder;
import com.trading.modal.User;
import com.trading.response.PaymentResponse;
import com.trading.service.PaymentOrderService;
import com.trading.service.UserService;

@RestController
public class PaymentController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private PaymentOrderService paymentOrderService;
	
	@PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
	public ResponseEntity<PaymentResponse> paymentHandler(
			@PathVariable PaymentMethod paymentMethod,
			@PathVariable Long amount,
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		PaymentResponse paymentResponse;
		
		PaymentOrder order = paymentOrderService.createOrder(user, amount, paymentMethod);
		
		if(paymentMethod.equals(PaymentMethod.RAZORPAY)) {
			paymentResponse = paymentOrderService.createRazorpayPaymentLink(user, amount, null);
		}
		else {
			paymentResponse = paymentOrderService.createStripePaymentLink(user, amount, order.getId());
		}
			
		return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
		
	}
	
}

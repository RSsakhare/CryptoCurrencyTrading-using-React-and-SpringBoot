package com.trading.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trading.modal.PaymentDetails;
import com.trading.modal.User;
import com.trading.service.PaymentDetailsService;
import com.trading.service.UserService;

@RestController
@RequestMapping("/api")
public class PaymentDetailsController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private PaymentDetailsService paymentDetailsService;
	
	@PostMapping("/payment-details")
	public ResponseEntity<PaymentDetails> addPaymentDetails(
			@RequestBody PaymentDetails paymentDetailsRequest,
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		PaymentDetails paymentDetails = paymentDetailsService.addPaymentDetails(
							paymentDetailsRequest.getAccountNumber(),
							paymentDetailsRequest.getAccountHolderName(),
							paymentDetailsRequest.getIfsc(),
							paymentDetailsRequest.getBankName(),
							user
							);
		return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
	}
	
	@GetMapping("/payment-details")
	public ResponseEntity<PaymentDetails> getUsersPaymentDetails(
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		PaymentDetails paymentDetails = paymentDetailsService.getUsersPaymentDetails(user);
		
		return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
	}
}

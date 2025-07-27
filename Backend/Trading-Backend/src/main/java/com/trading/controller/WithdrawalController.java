package com.trading.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;


import com.trading.modal.User;
import com.trading.modal.Wallet;
import com.trading.modal.Withdrawal;
import com.trading.service.UserService;
import com.trading.service.WalletService;
import com.trading.service.WithdrawalService;

@RestController
public class WithdrawalController {

	@Autowired
	private WithdrawalService withdrawalService;
	
	@Autowired
	private WalletService walletService;
	
	@Autowired
	private UserService userService;
	
	// private WalletTransactionS
	
	@PostMapping("/api/withdrawal/{amount}")
	public ResponseEntity<?> withdrawalRequest(
			@PathVariable Long amount,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserProfileByJwt(jwt);
		Wallet userWallet = walletService.getUserWallet(user);
		
		Withdrawal withdrawal = withdrawalService.requestWithdrawal(amount, user);
		walletService.addBalance(userWallet, -withdrawal.getAmount());
		
		
		
		return new ResponseEntity<>(withdrawal, HttpStatus.OK);
		
	}
	
	@PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
	public ResponseEntity<?> procedWithdrawal(
			@PathVariable Long id,
			@PathVariable boolean accept,
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		Withdrawal withdrawal = withdrawalService.proceedWithWithdrawal(id, accept);
		
		Wallet userWallet = walletService.getUserWallet(user);
		
		if(!accept) {
			walletService.addBalance(userWallet, withdrawal.getAmount());
		}
				
		return new ResponseEntity<>(withdrawal, HttpStatus.OK);
		
	}
	
	@GetMapping("/api/withdrawal")
	public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		List<Withdrawal> withdrawal = withdrawalService.getUsersWithdrawalHistory(user);
		
		return new ResponseEntity<>(withdrawal, HttpStatus.OK);
		
	}
	
	@SuppressWarnings("unused")
	@GetMapping("/api/admin/withdrawal")
	public ResponseEntity<List<Withdrawal>> getAllWithdrawalRequest(
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		List<Withdrawal> withdrawal = withdrawalService.getAllWithdrawalRequest();
		
		return new ResponseEntity<>(withdrawal, HttpStatus.OK);
	}
	
	
}

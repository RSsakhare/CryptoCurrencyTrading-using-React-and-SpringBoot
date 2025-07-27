package com.trading.service;

import java.util.List;

import com.trading.modal.Order;
import com.trading.modal.User;
import com.trading.modal.Wallet;
import com.trading.modal.WalletTransaction;

public interface WalletService {

	Wallet getUserWallet(User user);
	
	Wallet addBalance(Wallet wallet, Long money);
	
	Wallet findWalletById(Long id) throws Exception;
	
	Wallet walletToWalletTransfer(User sender,Wallet receiverWallet,Long amount) throws Exception;
	
	Wallet payOrderPayment(Order order, User user) throws Exception;
	
	List<WalletTransaction> getWalletTransactions(Wallet wallet);
	
	Wallet createWalletIfAbsent(User user);
}

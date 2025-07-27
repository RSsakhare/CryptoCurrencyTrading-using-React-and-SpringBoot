package com.trading.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trading.modal.Wallet;
import com.trading.modal.WalletTransaction;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {

	    List<WalletTransaction> findByWallet(Wallet wallet);
}

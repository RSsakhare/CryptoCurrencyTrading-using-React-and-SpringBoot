package com.trading.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trading.domain.WithdrawalStatus;
import com.trading.modal.User;
import com.trading.modal.Withdrawal;
import com.trading.repository.WithdrawalRepository;

@Service
public class WithdrawalServiceImpl implements WithdrawalService{

	@Autowired
	private WithdrawalRepository withdrawalRepository;
	
	@Override
	public Withdrawal requestWithdrawal(Long amount, User user) {
		
		Withdrawal withdrawal = new Withdrawal();
		withdrawal.setAmount(amount);
		withdrawal.setUser(user);
		withdrawal.setStatus(WithdrawalStatus.PENDING);
		
		return withdrawalRepository.save(withdrawal);
	}

	@Override
	public Withdrawal proceedWithWithdrawal(Long withdrawalId, boolean accept) throws Exception {
		
		Optional<Withdrawal> withdrawal = withdrawalRepository.findById(withdrawalId);
		if(withdrawal.isEmpty()) {
			throw new Exception("withdrawal not found");
		}
		Withdrawal withdrawal1 = withdrawal.get();
		
		withdrawal1.setDate(LocalDateTime.now());
		
		if(accept) {
			withdrawal1.setStatus(WithdrawalStatus.SUCCESS);
		}
		else {
			withdrawal1.setStatus(WithdrawalStatus.PENDING);
		}
		return withdrawalRepository.save(withdrawal1);
	}

	@Override
	public List<Withdrawal> getUsersWithdrawalHistory(User user) {
		// TODO Auto-generated method stub
		return withdrawalRepository.findByUserId(user.getId());
	}

	@Override
	public List<Withdrawal> getAllWithdrawalRequest() {
		// TODO Auto-generated method stub
		return withdrawalRepository.findAll();
	}

}

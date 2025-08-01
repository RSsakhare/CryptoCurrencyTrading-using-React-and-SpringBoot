package com.trading.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trading.modal.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmail(String email);
	
	Optional<User> findById(Long id);

}

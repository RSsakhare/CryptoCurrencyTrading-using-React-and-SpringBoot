package com.trading.modal;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.trading.domain.USER_ROLE;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String fullName;
	
	private String email;
	
	private int mobile;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	
	@Embedded
	private TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
	
	private USER_ROLE role=USER_ROLE.ROLE_CUSTOMER;
}

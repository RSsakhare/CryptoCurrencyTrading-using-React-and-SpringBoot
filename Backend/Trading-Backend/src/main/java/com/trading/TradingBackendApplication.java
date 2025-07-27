package com.trading;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.trading")
public class TradingBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TradingBackendApplication.class, args);
	}

}

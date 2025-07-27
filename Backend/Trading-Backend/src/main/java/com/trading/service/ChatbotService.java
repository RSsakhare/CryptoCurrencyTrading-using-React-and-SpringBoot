package com.trading.service;

import com.trading.response.ApiResponse;

public interface ChatbotService {

	ApiResponse getCoinDetails(String prompt) throws Exception;
	
	String simpleChat(String prompt);
	
	
}

package com.trading.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trading.dto.PromptBody;
import com.trading.response.ApiResponse;
import com.trading.service.ChatbotService;

@RestController
@RequestMapping("/ai/chat")
public class ChatbotController {

	private final ChatbotService chatbotService;
	
	public ChatbotController(ChatbotService chatbotService) {
		this.chatbotService = chatbotService;
	}
	
	@PostMapping()
	public ResponseEntity<ApiResponse> getCoinDetails(@RequestBody PromptBody prompt) throws Exception{
		
		
	
		ApiResponse response = chatbotService.getCoinDetails(prompt.getPrompt());
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PostMapping("/simple")
	public ResponseEntity<String> simpleChatHandler(@RequestBody PromptBody prompt) throws Exception{
		
		String response = chatbotService.simpleChat(prompt.getPrompt());
	
	//	ApiResponse response = new ApiResponse();
	//	response.setMessage(prompt.getPrompt());
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}

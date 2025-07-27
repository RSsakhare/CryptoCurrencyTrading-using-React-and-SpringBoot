package com.trading.exception;

@SuppressWarnings("serial")
public class WatchlistNotFoundException extends RuntimeException {
    
	public WatchlistNotFoundException(String message) {
        super(message);
    }
}


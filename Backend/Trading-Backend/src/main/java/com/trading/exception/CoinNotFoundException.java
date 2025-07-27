package com.trading.exception;

@SuppressWarnings("serial")
public class CoinNotFoundException extends RuntimeException {
    public CoinNotFoundException(String message) {
        super(message);
    }
}


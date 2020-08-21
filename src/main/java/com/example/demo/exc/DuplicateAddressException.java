package com.example.demo.exc;

public class DuplicateAddressException extends RuntimeException{

    public DuplicateAddressException(String message){
        super(message);
    }

    public DuplicateAddressException(Throwable cause) {
        super(cause);
    }
}

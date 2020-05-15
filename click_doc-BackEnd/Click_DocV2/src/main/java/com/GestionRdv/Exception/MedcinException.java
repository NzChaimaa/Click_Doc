package com.GestionRdv.Exception;

import org.springframework.http.HttpStatus;

public class MedcinException {
	
	private  HttpStatus status;
	private  String message;
	public HttpStatus getStatus() {
		return status;
	}
	public String getMessage() {
		return message;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public MedcinException(HttpStatus status, String message) {
		super();
		this.status = status;
		this.message = message;
	}
	@Override
	public String toString() {
		return "GestionProduitException [status=" + status + ", message=" + message + "]";
	}

}

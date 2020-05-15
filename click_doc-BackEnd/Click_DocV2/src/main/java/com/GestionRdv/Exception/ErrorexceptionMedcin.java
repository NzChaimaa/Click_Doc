package com.GestionRdv.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ErrorexceptionMedcin extends RuntimeException{
	public ErrorexceptionMedcin(String message) {
//		super("le medcin a l'id: "+id+" n'exicete pas");
		super(message);
	}

}

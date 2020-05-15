package com.GestionRdv.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.GestionRdv.Exception.ErrorexceptionMedcin;
import com.GestionRdv.Exception.MedcinException;
@CrossOrigin(origins = "http://localhost:3000")
@ControllerAdvice
public class ExceptionController {
	@ExceptionHandler
	public ResponseEntity<MedcinException> handleAccessDeniedException(ErrorexceptionMedcin ex) {
	MedcinException e= new MedcinException(HttpStatus.NOT_FOUND,ex.getMessage());
    return new ResponseEntity<MedcinException>(e, HttpStatus.NOT_FOUND);
}
	@ExceptionHandler
	public ResponseEntity<MedcinException> handleAccessDenied(Exception ex) {
		MedcinException e= new MedcinException(HttpStatus.BAD_REQUEST,ex.getMessage());
	    return new ResponseEntity<MedcinException>(e, HttpStatus.BAD_REQUEST);
	}
}

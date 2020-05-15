package com.GestionRdv.Controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GestionRdv.Entity.Medcin;
import com.GestionRdv.Entity.Reservation;
import com.GestionRdv.Services.IserviceMedcin;
import com.GestionRdv.Services.IserviceReservation;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ReservationController {
@Autowired
private IserviceReservation controllerReservation;
@Autowired
private IserviceMedcin controllerMedcin;

//selection  tous les reservations
@GetMapping("/reservation")
public List<Reservation> selectionTousReservation(){
	return controllerReservation.selectionTousReservation();
}
//selectionner une reservation par ID
@GetMapping(value = "/reservation/{id}")
public Reservation se(@PathVariable("id") Long id) {
	return controllerReservation.selectionTousReservation(id).map(reservationent ->{
		return controllerReservation.selectionTousReservation(id).get();
	}).orElseThrow(()->new Error());
}
//ajouter une reservation
@PostMapping(value="/reservation")
public Reservation enregistreReservation(@RequestBody Reservation r) {
	controllerReservation.ajouterModifierReservation(r);
	return r;
}
//supprimer une reservation 
@DeleteMapping( value = "/reservation/{id}")
public void suprimerResrvation(@PathVariable("id") Long id) {
	controllerReservation.suprimerReservation(id);
}
//modifier une reservation
@PutMapping("/reservation/{id}")
public Reservation modifierReservation(@RequestBody Reservation r , @PathVariable("id") Long id) {
	Reservation reservation = controllerReservation.selectionTousReservation(id).map(reservationent ->{
		return controllerReservation.selectionTousReservation(id).get();
	}).orElseThrow(()->new Error());
	controllerReservation.ajouterModifierReservation(reservation);
	return r;	
}
//selectionner les reservations par  date et  par medecin_Id 
@GetMapping("/reservations/{id}/{date}")
public List<Reservation> findAllByReservationDate(@PathVariable("id")Long id,@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date){
	Medcin medcin = controllerMedcin.selectionMedcinId(id).map(reservationent ->{
		return controllerMedcin.selectionMedcinId(id).get();
	}).orElseThrow(()->new Error());
	return controllerReservation.findAllByReservationDate(medcin,date);
}
//selectionner les reservations par status et  par medecin_Id 
@GetMapping("/reservationm/{id}/{status}")
public List<Reservation> findAllByReservationStatus(@PathVariable("id")Long id,@PathVariable("status") String status){
	Medcin medcin = controllerMedcin.selectionMedcinId(id).map(reservationent ->{
		return controllerMedcin.selectionMedcinId(id).get();
	}).orElseThrow(()->new Error());
	return controllerReservation.findAllByReservationStatus(medcin, status);
}

}

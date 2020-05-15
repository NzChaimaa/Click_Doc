package com.GestionRdv.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GestionRdv.Entity.Patient;
import com.GestionRdv.Entity.Reservation;
import com.GestionRdv.Entity.Role;
import com.GestionRdv.Services.IservicePatient;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PatientController {
	@Autowired
	private IservicePatient controllerPatient;
	//selection de tous les patient
		@GetMapping("/patients/reservations/{patient_id}")
		public List<Reservation> findReservationByidPatient(@PathVariable("patient_id") Long id){
			return controllerPatient.findReservationByidPatient(controllerPatient.selectionPatientId(id).map(patient ->{
				return controllerPatient.selectionPatientId(id).get();
			}).orElseThrow(()-> new Error()));
		}

	
	//selection de tous les patient
	@GetMapping("/patients")
	public List<Patient> selectTousPatient(){
		return controllerPatient.selectTousPatient();
	}
	//selection d'un patient par ID
	@GetMapping(value = "/patients/{id}")
	public Patient selectionPatientId(@PathVariable("id") Long id) {
		return controllerPatient.selectionPatientId(id).map(patient ->{
			return controllerPatient.selectionPatientId(id).get();
		}).orElseThrow(()-> new Error());	
	}
	// ajoutation d'un patient 
	@PostMapping(value="/login/patients")
	public Patient enregistrePatient(@RequestBody Patient p) {
		controllerPatient.ajouteModifierPatient(p);
		return p;
	}
	//supprission patient 
	@DeleteMapping( value = "/patients/{id}")
	public void suprimerPatient(@PathVariable("id") Long id) {
		controllerPatient.selectionPatientId(id);
	}
	//modification d un patient
	@PutMapping("/patients/{id}")
	public Patient modifierPatient(@RequestBody Patient p , @PathVariable("id") Long id) {
		Patient patient = controllerPatient.selectionPatientId(id).map(pt ->{
			return controllerPatient.selectionPatientId(id).get();
		}).orElseThrow(()-> new Error());
		controllerPatient.ajouteModifierPatient(patient);
		return p;
	}
}

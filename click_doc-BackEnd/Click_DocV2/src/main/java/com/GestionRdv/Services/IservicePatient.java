package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import com.GestionRdv.Entity.Patient;
import com.GestionRdv.Entity.Reservation;

public interface IservicePatient {
	public void ajouteModifierPatient(Patient p);
	public List<Patient> selectTousPatient();
	public Optional<Patient> selectionPatientId(Long id);
	public void suprimerPatient(Long id);
	public Patient findByUsername(String name);
	//
	public List<Reservation> findReservationByidPatient(Patient patient);
}

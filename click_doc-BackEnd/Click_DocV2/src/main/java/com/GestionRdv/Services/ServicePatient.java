package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.GestionRdv.Dao.IpatientDao;
import com.GestionRdv.Entity.Patient;
import com.GestionRdv.Entity.Reservation;


@Service
public class ServicePatient implements IservicePatient{
@Autowired
private IpatientDao servicePatient;
@Autowired
PasswordEncoder passwordencoder;
public void ajouteModifierPatient(Patient p) {
	p.setPassword(passwordencoder.encode(p.getPassword()));
	servicePatient.save(p);
}
public List<Patient> selectTousPatient(){
	return servicePatient.findAll();
}
public Optional<Patient> selectionPatientId(Long id){
	return servicePatient.findById(id);
}
public void suprimerPatient(Long id) {
	servicePatient.deleteById(id);
}
public Patient findByUsername(String name) {
	return servicePatient.findByUsername(name);
}
public List<Reservation> findReservationByidPatient(Patient patient){
	return patient.getResrvation();
}
}

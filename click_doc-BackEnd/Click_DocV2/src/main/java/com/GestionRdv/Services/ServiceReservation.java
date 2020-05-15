package com.GestionRdv.Services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.GestionRdv.Dao.IreservationDao;
import com.GestionRdv.Entity.Medcin;
import com.GestionRdv.Entity.Reservation;

@Service
public class ServiceReservation implements IserviceReservation{
@Autowired
private IreservationDao serviceReservation;
//Ajouter  ou modifier une resrvation
public void ajouterModifierReservation(Reservation r) {
	serviceReservation.save(r);
}
//selection tous les reservations 
public List<Reservation> selectionTousReservation(){
	return serviceReservation.findAll();
}
//selctionner une reservation par une Id
public Optional<Reservation> selectionTousReservation(Long id){
	return serviceReservation.findById(id);
}
//Supressimer une reservation
public void suprimerReservation(Long id) {
	serviceReservation.deleteById(id);
}
//selectionner tous les reservations par date et medecin_Id
public List<Reservation> findAllByReservationDate(Medcin medcin ,Date date_de_reservation){
	return serviceReservation.findAllByReservationDate(medcin, date_de_reservation);
 }
//selectionner tous les reservations par status medecin_Id 
public List<Reservation> findAllByReservationStatus(Medcin medcin ,String status){
	return serviceReservation.findAllByReservationStatus(medcin, status);
}
}

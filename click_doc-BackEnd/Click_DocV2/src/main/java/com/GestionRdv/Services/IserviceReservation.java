package com.GestionRdv.Services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.GestionRdv.Entity.Medcin;
import com.GestionRdv.Entity.Reservation;

public interface IserviceReservation {
	//Ajouter  ou modifier une resrvation
	public void ajouterModifierReservation(Reservation r) ;
	//selection tous les reservations 
	public List<Reservation> selectionTousReservation();
	//selctionner une reservation par une Id
	public Optional<Reservation> selectionTousReservation(Long id);
	//Suprimer une reservation
	public void suprimerReservation(Long id);
	//selectionner tous les reservations par date et medecin_Id
	public List<Reservation> findAllByReservationDate(Medcin medcin ,Date date_de_reservation);
	//selectionner tous les reservations par status medecin_Id 
	public List<Reservation> findAllByReservationStatus(Medcin medcin ,String status);
}

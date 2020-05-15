package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import com.GestionRdv.Entity.Disponibilite;
import com.GestionRdv.Entity.Medcin;
import com.GestionRdv.Entity.Reservation;
import com.GestionRdv.Entity.Specialite;
import com.GestionRdv.Entity.Ville;

public interface IserviceMedcin {
	public void ajouteModifierMedcin(Medcin m);
	public List<Medcin> selectTousMedcin();
	public Optional<Medcin> selectionMedcinId(Long id);
	public void suprimerMedcin(Long id) ;
	//jwt authentificat
	public Medcin findByUsername(String nom);
	
	
	//serchin nom or prenom
	public List<Medcin> findMedcinByNomOrPrenom(String nom , String prenom);
	//serchin ville nom specil
	public List<Medcin> findMedcinByNomAndSpecilAndVille(String nom , Ville ville,String specialite);
	//search by prenom nom specialite ville (OR)
   public List<Medcin> findMedcinByNomOrPrenomOrSpeOrVille(String nom , String prenom , Ville ville , Specialite specialite);
 //select all reservation for medcin
 	public List<Reservation> findReservationByidMedcin(Medcin medcin);
	//select liste diponibilite for medcin
	public List<Disponibilite> findDisponibiliteByidMedcin(Medcin medcin);
}

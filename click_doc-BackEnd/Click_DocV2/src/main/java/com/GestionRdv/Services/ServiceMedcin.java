package com.GestionRdv.Services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.GestionRdv.Dao.ImedcinDao;
import com.GestionRdv.Entity.Disponibilite;
import com.GestionRdv.Entity.Medcin;
import com.GestionRdv.Entity.Reservation;
import com.GestionRdv.Entity.Specialite;
import com.GestionRdv.Entity.Ville;
@Service
public class ServiceMedcin implements IserviceMedcin{
@Autowired
private ImedcinDao serviceMedcin;
@Autowired
PasswordEncoder passwordencoder; 
	public void ajouteModifierMedcin(Medcin m) {
//		m.setMot_de_passe(passwordencoder.encode(m.getMot_de_passe()));
		m.setPassword(passwordencoder.encode(m.getPassword()));
		serviceMedcin.save(m);
	}
	public List<Medcin> selectTousMedcin(){
		return serviceMedcin.findAll();
	}
	public Optional<Medcin> selectionMedcinId(Long id){
		return serviceMedcin.findById(id);
	}
	public void suprimerMedcin(Long id) {
		serviceMedcin.deleteById(id);
	}
	// authenticate jwt
	public Medcin findByUsername(String nom){
		return serviceMedcin.findByUsername(nom);
	}
	
	//serch nom or prenom
	public List<Medcin> findMedcinByNomOrPrenom(String nom , String prenom) {
		ArrayList<Medcin> list = new ArrayList<Medcin>();
	    Medcin m = new Medcin();
	    m.setUsername(nom);
	    m.setPrenom(nom);
	    Example<Medcin> allMedcin = Example.of(m, ExampleMatcher.matchingAny());
	    Iterable<Medcin> medcins = serviceMedcin.findAll(allMedcin);
	    
	    for (Medcin e : medcins) {
	        System.out.println(e);
	        list.add(e);
	    }
	    return list; 
	}
	//search by prenom nom specialite ville (OR) important
	public List<Medcin> findMedcinByNomOrPrenomOrSpeOrVille(String nom , String prenom , Ville ville , Specialite specialite) {
		ArrayList<Medcin> list = new ArrayList<Medcin>();
	    Medcin m = new Medcin();
	    m.setNom(nom);
	    m.setPrenom(nom);
	    m.setVille(ville);
	    m.setSpecialite(specialite);
	    Example<Medcin> allMedcin = Example.of(m, ExampleMatcher.matchingAny());
	    Iterable<Medcin> medcins = serviceMedcin.findAll(allMedcin);
	    
	    for (Medcin e : medcins) {
	        System.out.println(e);
	        list.add(e);
	    }
	    return list; 
	}
	
	//search nom preom and specialite and ville (and)
	public List<Medcin> findMedcinByNomAndSpecilAndVille(String nom , Ville ville,String specialite) {
		ArrayList<Medcin> list = new ArrayList<Medcin>();
	    System.out.println("-- finding employees with name Diana or dept IT --");
	    Medcin m = new Medcin();
	    m.setUsername(nom);
//	    Specialite s = new Specialite();
//	    s.setLabel(specialite);
	    m.setSpecialition(specialite);
	    m.setVille(ville);
	    System.out.println("Example entity: "+m);
	    Example<Medcin> allMedcin = Example.of(m, ExampleMatcher.matchingAll());
	    Iterable<Medcin> medcins = serviceMedcin.findAll(allMedcin);
	    for (Medcin e : medcins) {
	        System.out.println(e);
	        list.add(e);
	    }
	    return list; 
	}
//select liste reservation for medcin
	public List<Reservation> findReservationByidMedcin(Medcin medcin){
	return medcin.getResrvation();
}
	
	//select liste diponibilite for medcin
		public List<Disponibilite> findDisponibiliteByidMedcin(Medcin medcin){
		return medcin.getDisponibilite();
	}
//	//select all reservation for medcinjfjfj
//		public List<Reservation> findReservationByidMedcinAndDate(Medcin medcin, Date d){
//			ArrayList<Reservation> list = new ArrayList<Reservation>();
//			Reservation r = new Reservation();
//			r.setMedcin(medcin);
//			r.setDate_de_reservation(d);
////			r.setDate_de_reservation(date_de_reservation);
//		    Example<Reservation> allMedcin = Example.of(r, ExampleMatcher.matchingAny());
//		    Iterable<Reservation> medcins = serviceMedcin.findAll(allMedcin);
//		    
//		    for (Reservation e :medcins) {
//		        System.out.println(e);
//		        list.add(e);
//		    }
//		    return list; 
//		r.getDate_de_reservation();
//		return medcin.getResrvation();
//	}
}

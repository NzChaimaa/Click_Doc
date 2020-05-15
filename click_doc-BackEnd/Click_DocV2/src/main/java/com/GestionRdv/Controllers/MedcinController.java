package com.GestionRdv.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.GestionRdv.Entity.Disponibilite;
import com.GestionRdv.Entity.Medcin;
import com.GestionRdv.Entity.Reservation;
import com.GestionRdv.Entity.Role;
import com.GestionRdv.Entity.Specialite;
import com.GestionRdv.Entity.Ville;
import com.GestionRdv.Exception.ErrorexceptionMedcin;
import com.GestionRdv.Services.IserviceMedcin;
import com.GestionRdv.Services.IserviceRole;
import com.GestionRdv.Services.IserviceSpecialite;
import com.GestionRdv.Services.IserviceVille;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
//@Secured({"medcin"})
public class MedcinController {
@Autowired
private IserviceMedcin controllerMedcin;
@Autowired
private IserviceSpecialite controllerSpecialite;
@Autowired
private IserviceVille controllerVille;
@Autowired
private IserviceRole controllerRole;
//select all reservation for medcin
@GetMapping("/medcin/reservation/{medcin_id}")
	public List<Reservation> findReservationByidMedcin(@PathVariable("medcin_id") Long id){
//	return controllerMedcin.findReservationByidMedcin(controllerMedcin.selectionMedcinId(id).get());
	return controllerMedcin.findReservationByidMedcin((Medcin) controllerMedcin.selectionMedcinId(id).map(md ->{
		return controllerMedcin.findReservationByidMedcin(controllerMedcin.selectionMedcinId(id).get());
	}).orElseThrow(()-> new Error()));
}
//select liste diponibilite for medcin
@GetMapping("/medcin/disponibilites/{medcin_id}")
public List<Disponibilite> findDisponibiliteByidMedcin(@PathVariable("medcin_id") Long id){
	return controllerMedcin.findDisponibiliteByidMedcin((Medcin) controllerMedcin.selectionMedcinId(id).map(dis->{
		return controllerMedcin.findDisponibiliteByidMedcin(controllerMedcin.selectionMedcinId(id).get());
	}).orElseThrow(()-> new Error()));
}
//serch nom or prenom imortant
@GetMapping("/search/medcins")
public List<Medcin> findMedcinByNomOrPrenomOrSpeOrVille(@RequestParam(value = "nom" , required = false) String nom
	                                                     , @RequestParam(value = "prenom" , required = false)  String prenom
	                                                     ,@RequestParam(value = "ville" , required = false)   String v
                                                          ,@RequestParam(value = "label", required = false) String label){

       Specialite s =   controllerSpecialite.findByLabel(label);
      Ville ville =       controllerVille.findByLabel(v);
	
	return controllerMedcin.findMedcinByNomOrPrenomOrSpeOrVille(nom, prenom, ville, s);
}



@GetMapping("/search/medcins/{nom}/{prenom}")
public List<Medcin> find(@PathVariable("nom") String nom ,@PathVariable("prenom") String prenom) {
      return controllerMedcin.findMedcinByNomOrPrenom(nom, prenom);
   
}
//serch nom and ville specialite
@GetMapping("/search/medcins/{nom}/{ville}/{specialite}")
public List<Medcin> findA(@PathVariable("nom") String nom ,@PathVariable("ville") Ville ville ,@PathVariable("specialite")  String specialite){
      return controllerMedcin.findMedcinByNomAndSpecilAndVille(nom, ville, specialite);
}


//selection de tous les medcin

@GetMapping("/medcins")
public List<Medcin> selectTousMedcin(){
	return controllerMedcin.selectTousMedcin();
}
//selection d'un medcin par ID
@GetMapping(value = "/medcins/{id}")
public Medcin selectionMedcinId(@PathVariable("id") Long id) {
	return controllerMedcin.selectionMedcinId(id).map(admin ->{
	return controllerMedcin.selectionMedcinId(id).get();
}).orElseThrow(()->new Error());
//	Optional<Medcin> m = controllerMedcin.selectionMedcinId(id);
//	if (!m.isPresent()) {
////		mm = controllerMedcin.selectionMedcinId(id).get();
//		throw new ErrorexceptionMedcin("hhhhh");
//	}
//	else {
//		return controllerMedcin.selectionMedcinId(id).get();
//	}

}

// ajoutation d'un medcin 
@PostMapping(value="/login/medcin")
public Medcin enregistreMedcin(@RequestBody Medcin m) {
	Role r = controllerRole.selectionRoleId(2L).map(role ->{
		return controllerRole.selectionRoleId(2L).get();
	}).orElseThrow(()-> new Error());
	m.setRole(r);
	controllerMedcin.ajouteModifierMedcin(m);
	return m;
}
//supprission Medcin 
@DeleteMapping( value = "/medcins/{id}")
public void suprimerMedcin(@PathVariable("id") Long id) {
	controllerMedcin.suprimerMedcin(id);
}
//modification d un medcin
@PutMapping("/medcins/{id}")
public Medcin modifierMedcin(@RequestBody Medcin m , @PathVariable Long id) {
	Medcin medcin = controllerMedcin.selectionMedcinId(id).map(medcn -> {
		return controllerMedcin.selectionMedcinId(id).get();
	}).orElseThrow(()-> new ErrorexceptionMedcin("le medcin a l'id: "+id+" n'existe pas"));
	controllerMedcin.ajouteModifierMedcin(medcin);
	return m;
}
}

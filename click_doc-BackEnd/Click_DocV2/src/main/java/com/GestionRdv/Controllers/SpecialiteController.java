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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.GestionRdv.Entity.Specialite;
import com.GestionRdv.Services.IserviceSpecialite;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SpecialiteController {
@Autowired
private IserviceSpecialite controllerSpecialite;


//selection de tous les specialite
@GetMapping("/get/specialite")
public List<Specialite> selectTousSpecialite(){
	return controllerSpecialite.selectTousSpecialite();
}
//selection d'un specialite par ID
@GetMapping(value = "/get/specialite/{id}")
public Specialite sel(@PathVariable("id") Long id) {
	return controllerSpecialite.selectionSpecialiteId(id).map(specialite -> {
		return controllerSpecialite.selectionSpecialiteId(id).get();
	}).orElseThrow(()-> new Error());
}
//ajoutation d'un specialite 
@PostMapping(value="/specialite")
public Specialite enregistreSpecialite(@RequestBody Specialite s) {
	controllerSpecialite.ajouterModifierSpecialite(s);
	return s;
}
//supprission specialite 
@DeleteMapping( value ="/specialite/{id}")
public void suprimeSpeciaite(@PathVariable("id") Long id) {
	controllerSpecialite.suprimerSpecialite(id);
}
//supprission specialite 
@PutMapping( value = "/specialite/{id}")
public Specialite modifierSpecialite(@RequestBody Specialite s , @PathVariable Long id) {
	Specialite specialite = controllerSpecialite.selectionSpecialiteId(id).map(spe -> {
		return controllerSpecialite.selectionSpecialiteId(id).get();
	}).orElseThrow(()-> new Error());;
	controllerSpecialite.ajouterModifierSpecialite(specialite);
	return s;
}
}

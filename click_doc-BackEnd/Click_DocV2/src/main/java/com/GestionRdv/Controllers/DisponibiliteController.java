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

import com.GestionRdv.Entity.Disponibilite;
import com.GestionRdv.Services.IserviceDisponibilite;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class DisponibiliteController {
@Autowired
private IserviceDisponibilite controllerDisponibilite;

//selection de tous les disponibilite
@GetMapping("/disponibilites")
public List<Disponibilite> selectTousDisponibilites(){
	return controllerDisponibilite.selectTousDisponibilites();
}
//selection d'un disponibilite par ID
@GetMapping(value = "/disponibilites/{id}")
public Disponibilite selectionDisponibiliteId(@PathVariable("id") Long id) {
	return controllerDisponibilite.selectionDisponibiliteId(id).map(dispo -> {
		return controllerDisponibilite.selectionDisponibiliteId(id).get();
	}).orElseThrow(()->new Error() );
}
//ajoutation d'un disponibilite 
@PostMapping(value="/disponibilites")
public Disponibilite enregistreDisponibilite(@RequestBody Disponibilite d) {
	controllerDisponibilite.ajouteModifierDisponibilite(d);
	return d;
}
//supprission disponibilite 
@DeleteMapping( value = "/disponibilites/{id}")
public void suprimeDisponibilite(@PathVariable("id") Long id) {
	controllerDisponibilite.suprimerDisponibilite(id);
}
//supprission disponibilite 
@PutMapping("/disponibilites/{id}")
public Disponibilite modifierDisponibilite(@RequestBody Disponibilite d , @PathVariable("id") Long id) {
	Disponibilite dispo = controllerDisponibilite.selectionDisponibiliteId(id).map(disp ->{
		return controllerDisponibilite.selectionDisponibiliteId(id).get();
	}).orElseThrow(()-> new Error());;
	controllerDisponibilite.ajouteModifierDisponibilite(dispo);
	return d;	
}
}

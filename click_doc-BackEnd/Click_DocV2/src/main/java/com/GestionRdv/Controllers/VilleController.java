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
import org.springframework.web.bind.annotation.RestController;

import com.GestionRdv.Entity.Ville;
import com.GestionRdv.Services.IserviceVille;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class VilleController {
@Autowired
private IserviceVille controllerVille;
//selection de tous ville
@GetMapping("/get/villes")
public List<Ville> selectTousVille(){
	return controllerVille.selectTousVille();
}
//selection d'un ville par ID
@GetMapping(value = "/get/villes/{id}")
public Ville selectVilleId(@PathVariable("id") Long id) {
	return controllerVille.selectionVilleId(id).map(ville -> {
		return controllerVille.selectionVilleId(id).get();
	}).orElseThrow(()-> new Error());
}
//ajouter ville
@PostMapping(value = "/api/villes")
public Ville enregistreVille(@RequestBody Ville v) {
	controllerVille.ajouterModifierVille(v);
	return v;
}
//suprimer ville
@DeleteMapping(value = "/api/villes/{id}")
public void suprimerVille(@PathVariable("id") Long id) {
	controllerVille.suprimerVille(id);
}
//modifier ville
@PutMapping( value = "/api/villes/{id}")
public Ville modifierVille(@RequestBody Ville v,@PathVariable("id") Long id) {
	Ville ville = controllerVille.selectionVilleId(id).map(vl -> {
		return controllerVille.selectionVilleId(id).get();
	}).orElseThrow(()-> new Error());
	controllerVille.ajouterModifierVille(ville);
	return v;
}
}

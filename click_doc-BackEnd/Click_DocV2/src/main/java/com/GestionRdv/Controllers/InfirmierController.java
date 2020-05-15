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

import com.GestionRdv.Entity.Infirmier;
import com.GestionRdv.Services.IserviceInfirmier;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class InfirmierController {
	@Autowired
	private IserviceInfirmier controllerInfirmier;
	//selection de tous les infimirers
	@GetMapping("/infirmiers")
	public List<Infirmier> selectTousInfirmier(){
		return controllerInfirmier.selectTousInfirmier();
	}
	//selection d'un infirmier par ID
	@GetMapping(value = "/infirmiers/{id}")
	public Infirmier d(@PathVariable("id") Long id) {
		return controllerInfirmier.selectionInfirmierId(id).map(infimier ->{
			return controllerInfirmier.selectionInfirmierId(id).get();
		}).orElseThrow(()-> new Error());
	}
	// ajoutation d'un infirmier 
	@PostMapping(value="/login/infirmiers")
	public Infirmier enregistreInfimier(@RequestBody Infirmier i) {
		controllerInfirmier.ajouteModifierInfirmier(i);
		return i;
	}
	//supprission infirmier 
	@DeleteMapping( value = "/infirmiers/{id}")
	public void suprimerInfirmier(@PathVariable("id") Long id) {
		controllerInfirmier.suprimerInfirmier(id);
	}
	//modification d un infirmier
	@PutMapping("/infirmiers/{id}")
	public Infirmier modifierInfirmier(@RequestBody Infirmier i , @PathVariable("id") Long id) {
		Infirmier infirmier = controllerInfirmier.selectionInfirmierId(id).map(inf ->{
			return  controllerInfirmier.selectionInfirmierId(id).get();
		}).orElseThrow(()-> new Error());
		controllerInfirmier.ajouteModifierInfirmier(infirmier);
		return i;
	}
}

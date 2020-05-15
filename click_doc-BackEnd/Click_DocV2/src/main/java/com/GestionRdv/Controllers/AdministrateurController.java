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

import com.GestionRdv.Dao.Iadministrateurdao;
import com.GestionRdv.Entity.Administrateur;
import com.GestionRdv.Entity.Patient;
import com.GestionRdv.Entity.Role;
import com.GestionRdv.Services.IserviceAdministrateur;
import com.GestionRdv.Services.IserviceNotificationMail;
import com.GestionRdv.Services.IservicePatient;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AdministrateurController {
@Autowired
private IserviceAdministrateur controllerAdmin;
@Autowired
private IserviceNotificationMail mailSend;
@Autowired
private IservicePatient patientService;
@PostMapping("/sendmail/{id}")
public String send(@PathVariable("id") Long id ) {
	Patient p = patientService.selectionPatientId(id).map(patient ->{
		return patientService.selectionPatientId(id).get();
	}).orElseThrow(()-> new Error());
	String mail = p.getEmail();
	String href = "<h4 style=\"color:red;\"> Votre reservation est valider</h4>"+
			"<button><a href=\"http://localhost:8015/afficheCltt\">cliquer pour confirmer</a></button>";
	String html = href;
	 String subject = "just a test";
	 mailSend.sendEmail(mail, subject, html);
	return "redirect:/afficheClt";
}
//selection de tous les disponibilite
@GetMapping("/administrateurs")
public List<Administrateur> selectTousAdmin(){
	return controllerAdmin.selectTousAdin();
}
//select Admin 
@GetMapping("/administrateurs/{id}")
public Administrateur selectionAdminId(@PathVariable("id") Long id) {
	return controllerAdmin.selectAdminId(id).map(admin ->{
		return controllerAdmin.selectAdminId(id).get();
	}).orElseThrow(()->new Error());
}
//ajoute admin
@PostMapping(value = "/login/admin")
public Administrateur ajoute(@RequestBody Administrateur admin) {
controllerAdmin.jouterModifierAdmin(admin);
return admin;
}
//suprimier admin
@DeleteMapping(value= "/administrateurs/{id}")
public void suprimierAdminId(@PathVariable("id") Long id) {
	controllerAdmin.suprimierAdmin(id);
}
//modifier amdin
@PutMapping("/administrateurs/{id}")
public Administrateur modifierAdmin(@RequestBody Administrateur admin , @PathVariable("id") Long id) {
	admin.setId(id);
	controllerAdmin.jouterModifierAdmin(admin);
	return admin;
}

}

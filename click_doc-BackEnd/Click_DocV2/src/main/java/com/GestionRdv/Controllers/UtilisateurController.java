package com.GestionRdv.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.GestionRdv.Entity.Utilisateur;
import com.GestionRdv.Services.IserviceUtilisateur;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UtilisateurController {
@Autowired
private IserviceUtilisateur controllerUser;
@GetMapping(value = "/users")
public Utilisateur selectUser(@RequestParam("username")String username) {
return	controllerUser.findByUsername(username);
}
}

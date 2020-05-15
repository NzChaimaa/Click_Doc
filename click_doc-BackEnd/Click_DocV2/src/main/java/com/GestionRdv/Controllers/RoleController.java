package com.GestionRdv.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.GestionRdv.Config.JwtRequest;
import com.GestionRdv.Config.JwtResponse;
import com.GestionRdv.Config.JwtTokenUtil;
import com.GestionRdv.Entity.Role;
import com.GestionRdv.Services.IserviceRole;
import com.GestionRdv.Services.JwtUserDetailsService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class RoleController {
@Autowired
private IserviceRole controllerRole;

@GetMapping("/roles")
public List<Role> selectTousRole(){
	return controllerRole.selectTousRole();
}

//selection d'un role par ID
@GetMapping(value = "/roles/{id}")
public Role sel(@PathVariable("id")Long id) {
	return controllerRole.selectionRoleId(id).map(role -> {
		return controllerRole.selectionRoleId(id).get();
	}).orElseThrow(()-> new Error());
}
//ajoutation d'un role 
@PostMapping(value="/roles")
public Role enregistreRole(@RequestBody Role r) {
	controllerRole.ajouteModifierRole(r);
	return r;
}
//supprission role 
@DeleteMapping( value = "/roles/{id}")
public void suprimeRole(@PathVariable("id") Long id) {
	controllerRole.suprimerRole(id);
}
//supprission role 
@PatchMapping("/roles/{id}")
public Role modifierRole(@RequestBody Role r , @PathVariable("id") Long id) {
	Role role = controllerRole.selectionRoleId(id).map(rl -> {
		return controllerRole.selectionRoleId(id).get();
	}).orElseThrow(()-> new Error());
	controllerRole.ajouteModifierRole(role);
	return r;
}
}

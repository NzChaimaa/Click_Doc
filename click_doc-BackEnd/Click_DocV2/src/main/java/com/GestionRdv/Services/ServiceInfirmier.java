package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.GestionRdv.Dao.IinfimerDoa;
import com.GestionRdv.Entity.Infirmier;



@Service
public class ServiceInfirmier implements IserviceInfirmier{
@Autowired
private IinfimerDoa servicesInfirmier;
@Autowired
PasswordEncoder passwordencoder; 

public void ajouteModifierInfirmier(Infirmier i) {
	i.setPassword(passwordencoder.encode(i.getPassword()));
	servicesInfirmier.save(i);
	
}
public List<Infirmier> selectTousInfirmier(){
	return servicesInfirmier.findAll();
}
public Optional<Infirmier> selectionInfirmierId(Long id){
	return servicesInfirmier.findById(id);
}
public void suprimerInfirmier(Long id) {
	servicesInfirmier.deleteById(id);
}
//jwt 
public Infirmier findByUsername(String nom) {
	return servicesInfirmier.findByUsername(nom);
}
}

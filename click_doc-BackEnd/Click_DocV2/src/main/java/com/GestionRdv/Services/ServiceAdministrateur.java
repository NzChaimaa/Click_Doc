package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.GestionRdv.Dao.Iadministrateurdao;
import com.GestionRdv.Entity.Administrateur;

@Service
public class ServiceAdministrateur implements IserviceAdministrateur{
@Autowired
private Iadministrateurdao serviceAdmin;
@Autowired
PasswordEncoder passwordencoder;
public void jouterModifierAdmin(Administrateur a) {
	a.setPassword(passwordencoder.encode(a.getPassword()));
	serviceAdmin.save(a);
}
public List<Administrateur> selectTousAdin(){
return	serviceAdmin.findAll();
}
public Optional<Administrateur> selectAdminId(Long id){
return	serviceAdmin.findById(id);
}
public void suprimierAdmin(Long id){
 serviceAdmin.deleteById(id);	
}


}

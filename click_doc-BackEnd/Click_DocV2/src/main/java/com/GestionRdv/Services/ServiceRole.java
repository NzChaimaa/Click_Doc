package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionRdv.Dao.Iroledao;
import com.GestionRdv.Entity.Role;

@Service
public class ServiceRole implements IserviceRole{
@Autowired
private Iroledao serviceRole;
public void ajouteModifierRole(Role r) {
	serviceRole.save(r);
}
public List<Role> selectTousRole(){
return serviceRole.findAll();
}
public Optional<Role> selectionRoleId(Long id){
	return serviceRole.findById(id);
}
public void suprimerRole(Long id) {
	serviceRole.deleteById(id);
}
}

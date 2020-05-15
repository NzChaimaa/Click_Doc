package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionRdv.Dao.IdisponibiliteDao;
import com.GestionRdv.Entity.Disponibilite;

@Service
public class ServiceDisponibilite implements IserviceDisponibilite{
@Autowired
private IdisponibiliteDao serviceDisponibilite;
public void ajouteModifierDisponibilite(Disponibilite d) {
	serviceDisponibilite.save(d);
}
public List<Disponibilite> selectTousDisponibilites(){
	return serviceDisponibilite.findAll();
}
public Optional<Disponibilite> selectionDisponibiliteId(Long id){
	return serviceDisponibilite.findById(id);
}
public void suprimerDisponibilite(Long id) {
	serviceDisponibilite.deleteById(id);
}
}

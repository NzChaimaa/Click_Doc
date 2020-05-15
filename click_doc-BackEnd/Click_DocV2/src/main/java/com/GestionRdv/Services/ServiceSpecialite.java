package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.GestionRdv.Dao.IspecialiteDao;
import com.GestionRdv.Entity.Specialite;

@Service
public class ServiceSpecialite implements IserviceSpecialite{
@Autowired
private IspecialiteDao serviceSpecialite;
public void ajouterModifierSpecialite(Specialite s) {
	serviceSpecialite.save(s);
}
public List<Specialite> selectTousSpecialite(){
	return serviceSpecialite.findAll();	
}
public Optional<Specialite> selectionSpecialiteId(Long id){
return serviceSpecialite.findById(id);
}
public void suprimerSpecialite(Long id){
	serviceSpecialite.deleteById(id);
}

//
public Specialite findByLabel(String label){
	return  serviceSpecialite.findByLabel(label);
//	return serviceSpecialite.findByLabel(label, pageable);
}

}

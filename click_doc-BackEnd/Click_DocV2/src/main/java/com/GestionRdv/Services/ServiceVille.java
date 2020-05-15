package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionRdv.Dao.IvilleDao;
import com.GestionRdv.Entity.Ville;

@Service
public class ServiceVille implements IserviceVille{
@Autowired
private IvilleDao serviceVille;
public void ajouterModifierVille(Ville v) {
serviceVille.save(v);
}
public List<Ville> selectTousVille(){
return serviceVille.findAll();	
}
public Optional<Ville> selectionVilleId(Long id){
return serviceVille.findById(id);
}
public void suprimerVille(Long id){
serviceVille.deleteById(id);
}

//
public Ville findByLabel(String label){
return  serviceVille.findByLabel(label);
}
}

package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import com.GestionRdv.Entity.Infirmier;

public interface IserviceInfirmier {
	public void ajouteModifierInfirmier(Infirmier i);
	public List<Infirmier> selectTousInfirmier();
	public Optional<Infirmier> selectionInfirmierId(Long id);
	public void suprimerInfirmier(Long id);
	//jwt
	public Infirmier findByUsername(String nom) ;
}

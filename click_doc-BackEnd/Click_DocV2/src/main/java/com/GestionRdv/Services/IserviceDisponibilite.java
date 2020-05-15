package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import com.GestionRdv.Entity.Disponibilite;

public interface IserviceDisponibilite {
	public void ajouteModifierDisponibilite(Disponibilite d);
	public List<Disponibilite> selectTousDisponibilites();
	public Optional<Disponibilite> selectionDisponibiliteId(Long id);
	public void suprimerDisponibilite(Long id);
}

package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import com.GestionRdv.Entity.Ville;

public interface IserviceVille {
	public void ajouterModifierVille(Ville v);
	public List<Ville> selectTousVille();
	public Optional<Ville> selectionVilleId(Long id);
	public void suprimerVille(Long id);
	public Ville findByLabel(String label);
}

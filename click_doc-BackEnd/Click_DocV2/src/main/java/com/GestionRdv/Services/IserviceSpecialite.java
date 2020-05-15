package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.GestionRdv.Entity.Specialite;

public interface IserviceSpecialite {
	public void ajouterModifierSpecialite(Specialite s);
	public List<Specialite> selectTousSpecialite();
	public Optional<Specialite> selectionSpecialiteId(Long id);
	public void suprimerSpecialite(Long id);
//	public List<Specialite> findByLabel(String label, Pageable pageable);
	public Specialite findByLabel(String label);
}

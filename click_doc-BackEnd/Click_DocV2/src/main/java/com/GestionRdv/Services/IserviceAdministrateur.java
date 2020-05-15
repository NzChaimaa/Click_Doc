package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import com.GestionRdv.Entity.Administrateur;

public interface IserviceAdministrateur {
	public void jouterModifierAdmin(Administrateur a);
	public List<Administrateur> selectTousAdin();
	public Optional<Administrateur> selectAdminId(Long id);
	public void suprimierAdmin(Long id);
}

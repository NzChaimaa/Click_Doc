package com.GestionRdv.Services;

import java.util.List;
import java.util.Optional;

import com.GestionRdv.Entity.Role;

public interface IserviceRole {
	public void ajouteModifierRole(Role r);
	public List<Role> selectTousRole();
	public Optional<Role> selectionRoleId(Long id);
	public void suprimerRole(Long id) ;
}

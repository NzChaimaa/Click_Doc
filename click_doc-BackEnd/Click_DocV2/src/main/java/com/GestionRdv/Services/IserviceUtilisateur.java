package com.GestionRdv.Services;

import java.util.Optional;

import com.GestionRdv.Entity.Utilisateur;

public interface IserviceUtilisateur {
	public Utilisateur findByUsername(String nom);
}

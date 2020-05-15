package com.GestionRdv.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionRdv.Dao.IutilisateurDao;
import com.GestionRdv.Entity.Utilisateur;

@Service
public class ServiceUtlisateur implements IserviceUtilisateur{
@Autowired
private IutilisateurDao serviceUtilisateur;
public Utilisateur findByUsername(String nom) {
	return serviceUtilisateur.findByUsername(nom);
}

}

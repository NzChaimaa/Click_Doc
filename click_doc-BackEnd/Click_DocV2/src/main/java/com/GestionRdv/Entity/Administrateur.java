package com.GestionRdv.Entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Administrateur extends Utilisateur{

	public Administrateur() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Administrateur(Long id, String nom, String prenom, String username, Role role, String email, String password,
			Date createdAt, Date updatedAt) {
		super(id, nom, prenom, username, role, email, password, createdAt, updatedAt);
		// TODO Auto-generated constructor stub
	}

	
}

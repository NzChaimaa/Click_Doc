package com.GestionRdv.Dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.GestionRdv.Entity.Utilisateur;

public interface IutilisateurDao extends JpaRepository<Utilisateur, Long>{
public Utilisateur findByUsername(String nom);
}

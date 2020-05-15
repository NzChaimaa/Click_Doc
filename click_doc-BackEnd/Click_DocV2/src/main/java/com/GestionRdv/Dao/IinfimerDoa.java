package com.GestionRdv.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GestionRdv.Entity.Infirmier;

public interface IinfimerDoa extends JpaRepository<Infirmier, Long>{
public Infirmier findByUsername(String nom);
}

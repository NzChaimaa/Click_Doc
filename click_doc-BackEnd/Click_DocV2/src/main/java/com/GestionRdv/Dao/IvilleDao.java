package com.GestionRdv.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GestionRdv.Entity.Ville;

public interface IvilleDao extends JpaRepository<Ville, Long>{
	public Ville findByLabel(String label);
}

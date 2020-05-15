package com.GestionRdv.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GestionRdv.Entity.Patient;

public interface IpatientDao extends JpaRepository<Patient, Long>{
	public Patient findByUsername(String name);
}

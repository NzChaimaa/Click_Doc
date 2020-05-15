package com.GestionRdv.Dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

import com.GestionRdv.Entity.Medcin;


public interface ImedcinDao extends JpaRepository<Medcin, Long>{
	public Medcin findByUsername(String nom);

}

package com.GestionRdv.Dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


import com.GestionRdv.Entity.Specialite;
//@RepositoryRestResource
public interface IspecialiteDao extends JpaRepository<Specialite, Long>{
//public List<Specialite> findByLabel(String label, Pageable pageable);
	public Specialite findByLabel(String label);
}

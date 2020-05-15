package com.GestionRdv.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Specialite {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	   private String label;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public Specialite() {
		super();
	}
	public Specialite(Long id, String label) {
		super();
		this.id = id;
		this.label = label;
	}
	@Override
	public String toString() {
		return "Specialite [id=" + id + ", label=" + label + "]";
	}
	   
}

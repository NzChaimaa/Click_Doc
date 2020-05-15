package com.GestionRdv.Entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Patient extends Utilisateur{
    private String numero_de_telephone;
    @OneToMany(mappedBy="patient",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<Reservation> resrvation;
	//
	public String getNumero_de_telephone() {
		return numero_de_telephone;
	}
	public void setNumero_de_telephone(String numero_de_telephone) {
		this.numero_de_telephone = numero_de_telephone;
	}
	public List<Reservation> getResrvation() {
		return resrvation;
	}
	public void setResrvation(List<Reservation> resrvation) {
		this.resrvation = resrvation;
	}
	public Patient() {
		super();
	}
	public Patient(String numero_de_telephone, List<Reservation> resrvation) {
		super();
		this.numero_de_telephone = numero_de_telephone;
		this.resrvation = resrvation;
	}
	@Override
	public String toString() {
		return "Patient [numero_de_telephone=" + numero_de_telephone + ", resrvation=" + resrvation + "]";
	}
    

}

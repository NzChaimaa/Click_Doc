package com.GestionRdv.Entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Medcin extends Utilisateur{
    private String adresse;
    private String numero_inp;
    @ManyToOne
    @JoinColumn(name="ville_id", nullable=false)
    private Ville ville;
    private String numero_de_telephone;
    private Date duree_de_consultation;
    private String description;
    private String specialition;
    @ManyToOne
    @JoinColumn(name="specialite_id", nullable=false)
    private Specialite specialite;
    
    @OneToMany(mappedBy="medcin",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<Reservation> resrvation;
    
    
    @OneToMany(mappedBy="medcin",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<Disponibilite> disponibilites;
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public String getNumero_inp() {
		return numero_inp;
	}
	public void setNumero_inp(String numero_inp) {
		this.numero_inp = numero_inp;
	}

	public Ville getVille() {
		return ville;
	}
	public void setVille(Ville ville) {
		this.ville = ville;
	}
	public String getNumero_de_telephone() {
		return numero_de_telephone;
	}
	public void setNumero_de_telephone(String numero_de_telephone) {
		this.numero_de_telephone = numero_de_telephone;
	}
	public Date getDuree_de_consultation() {
		return duree_de_consultation;
	}
	public void setDuree_de_consultation(Date duree_de_consultation) {
		this.duree_de_consultation = duree_de_consultation;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getSpecialition() {
		return specialition;
	}
	public void setSpecialition(String specialition) {
		this.specialition = specialition;
	}
	public Specialite getSpecialite() {
		return specialite;
	}
	public void setSpecialite(Specialite specialite) {
		this.specialite = specialite;
	}
	public List<Reservation> getResrvation() {
		return resrvation;
	}
	public void setResrvation(List<Reservation> resrvation) {
		this.resrvation = resrvation;
	}
	
	public List<Disponibilite> getDisponibilite() {
		return disponibilites;
	}
	public void setDisponibilite(List<Disponibilite> disponibilites) {
		this.disponibilites = disponibilites;
	}
	public Medcin() {
		super();
	}
	public Medcin(String adresse, String numero_inp, Ville ville, String numero_de_telephone,
			Date duree_de_consultation, String description, String specialition, Specialite specialite,
			List<Reservation> resrvation , List<Disponibilite> disponibilites) {
		super();
		this.adresse = adresse;
		this.numero_inp = numero_inp;
		this.ville = ville;
		this.numero_de_telephone = numero_de_telephone;
		this.duree_de_consultation = duree_de_consultation;
		this.description = description;
		this.specialition = specialition;
		this.specialite = specialite;
		this.resrvation = resrvation;
	}
	@Override
	public String toString() {
		return "Medcin [adresse=" + adresse + ", numero_inp=" + numero_inp + ", ville=" + ville
				+ ", numero_de_telephone=" + numero_de_telephone + ", duree_de_consultation=" + duree_de_consultation
				+ ", description=" + description + ", specialition=" + specialition + ", specialite=" + specialite
				+ ", resrvation=" + resrvation + ", disponibilites=" + disponibilites + "]";
	}


    
}

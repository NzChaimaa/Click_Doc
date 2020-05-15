package com.GestionRdv.Entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Disponibilite {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    @Temporal(TemporalType.DATE)
	    @DateTimeFormat(pattern = "yyyy-MM-dd")
	    private Date jour_de_debut;
	    
	    @Temporal(TemporalType.DATE)
	    @DateTimeFormat(pattern = "yyyy-MM-dd")
	    private Date jour_de_fin;
	    
	    @Temporal(TemporalType.TIMESTAMP)
	    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	    private Date heure_de_debut;
	    
	    @Temporal(TemporalType.TIMESTAMP)
	    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	    private Date heure_de_fin;
	    @ManyToOne
	    @JoinColumn(name="medcin_id", nullable=false)
	    @JsonIgnore
	    private Medcin medcin;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public Date getJour_de_debut() {
			return jour_de_debut;
		}
		public void setJour_de_debut(Date jour_de_debut) {
			this.jour_de_debut = jour_de_debut;
		}
		public Date getJour_de_fin() {
			return jour_de_fin;
		}
		public void setJour_de_fin(Date jour_de_fin) {
			this.jour_de_fin = jour_de_fin;
		}
		public Date getHeure_de_debut() {
			return heure_de_debut;
		}
		public void setHeure_de_debut(Date heure_de_debut) {
			this.heure_de_debut = heure_de_debut;
		}
		public Date getHeure_de_fin() {
			return heure_de_fin;
		}
		public void setHeure_de_fin(Date heure_de_fin) {
			this.heure_de_fin = heure_de_fin;
		}
		public Medcin getMedcin() {
			return medcin;
		}
		public void setMedcin(Medcin medcin) {
			this.medcin = medcin;
		}
		public Disponibilite(Long id, Date jour_de_debut, Date jour_de_fin, Date heure_de_debut, Date heure_de_fin,
				Medcin medcin) {
			super();
			this.id = id;
			this.jour_de_debut = jour_de_debut;
			this.jour_de_fin = jour_de_fin;
			this.heure_de_debut = heure_de_debut;
			this.heure_de_fin = heure_de_fin;
			this.medcin = medcin;
		}
		public Disponibilite() {
			super();
		}
		@Override
		public String toString() {
			return "Disponibilite [id=" + id + ", jour_de_debut=" + jour_de_debut + ", jour_de_fin=" + jour_de_fin
					+ ", heure_de_debut=" + heure_de_debut + ", heure_de_fin=" + heure_de_fin + ", medcin=" + medcin
					+ "]";
		}

	    //getter and seeter
	    
	    
}

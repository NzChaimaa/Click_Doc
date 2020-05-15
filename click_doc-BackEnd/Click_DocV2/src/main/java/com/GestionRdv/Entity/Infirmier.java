package com.GestionRdv.Entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Infirmier extends Utilisateur{
	    private String adresse;
	    private String numero_de_telephone;
	    private Date duree_de_consultation;
	    private String description;
	    @ManyToOne
	    @JoinColumn(name="specialite_id", nullable=false)
	    private Specialite specialite;
		public String getAdresse() {
			return adresse;
		}
		public void setAdresse(String adresse) {
			this.adresse = adresse;
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
		public Specialite getSpecialite() {
			return specialite;
		}
		public void setSpecialite(Specialite specialite) {
			this.specialite = specialite;
		}
		public Infirmier() {
			super();
		}
		public Infirmier(String adresse, String numero_de_telephone, Date duree_de_consultation,
				String description, Specialite specialite) {
			super();
			this.adresse = adresse;
			this.numero_de_telephone = numero_de_telephone;
			this.duree_de_consultation = duree_de_consultation;
			this.description = description;
			this.specialite = specialite;
		}
		@Override
		public String toString() {
			return "Infirmier [adresse=" + adresse + ", numero_de_telephone=" + numero_de_telephone
					+ ", duree_de_consultation=" + duree_de_consultation + ", description=" + description
					+ ", specialite=" + specialite + "]";
		}
		

}

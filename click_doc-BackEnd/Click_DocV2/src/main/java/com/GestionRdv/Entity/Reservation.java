package com.GestionRdv.Entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@EntityListeners(AuditingEntityListener.class)
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private String motif;
    //
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private Date date_de_reservation;
    @ManyToOne
 
    @JoinColumn(name="medcin_id", nullable=false)
    private Medcin medcin;
    @ManyToOne
   
    @JoinColumn(name="patient_id", nullable=false)
    private Patient patient;

	@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Date CreatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = false)
    @LastModifiedDate
    private Date updatedAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getDate_de_reservation() {
		return date_de_reservation;
	}

	public void setDate_de_reservation(Date date_de_reservation) {
		this.date_de_reservation = date_de_reservation;
	}

	public Medcin getMedcin() {
		return medcin;
	}

	public void setMedcin(Medcin medcin) {
		this.medcin = medcin;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Date getCreatedAt() {
		return CreatedAt;
	}

	public void setCreatedAt(Date createdAt) {
		CreatedAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getMotif() {
		return motif;
	}

	public void setMotif(String motif) {
		this.motif = motif;
	}

	public Reservation() {
		super();
	}

	public Reservation(Long id, String status, String motif, Date date_de_reservation, Medcin medcin, Patient patient,
			Date createdAt, Date updatedAt) {
		super();
		this.id = id;
		this.status = status;
		this.motif = motif;
		this.date_de_reservation = date_de_reservation;
		this.medcin = medcin;
		this.patient = patient;
		CreatedAt = createdAt;
		this.updatedAt = updatedAt;
	}

	@Override
	public String toString() {
		return "Reservation [id=" + id + ", status=" + status + ", motif=" + motif + ", date_de_reservation="
				+ date_de_reservation + ", medcin=" + medcin + ", patient=" + patient + ", CreatedAt=" + CreatedAt
				+ ", updatedAt=" + updatedAt + "]";
	}


	
}

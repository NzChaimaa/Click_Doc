package com.GestionRdv.Dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.GestionRdv.Entity.Medcin;
import com.GestionRdv.Entity.Reservation;


public interface IreservationDao extends JpaRepository<Reservation, Long>{
	
	@Query("select a  from Reservation a where a.medcin = :medcin and a.date_de_reservation = :date_de_reservation")
    List<Reservation> findAllByReservationDate(@Param("medcin")Medcin medcin ,@Param("date_de_reservation") Date date_de_reservation);
	
	@Query("select a  from Reservation a where a.medcin = :medcin and a.status = :status")
    List<Reservation> findAllByReservationStatus(@Param("medcin")Medcin medcin ,@Param("status") String status);

}

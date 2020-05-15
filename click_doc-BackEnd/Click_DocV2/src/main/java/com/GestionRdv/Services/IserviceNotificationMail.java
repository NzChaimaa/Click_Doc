package com.GestionRdv.Services;

public interface IserviceNotificationMail {
	public void sendEmail(String email , String subject, String html);
}

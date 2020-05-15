package com.GestionRdv.Services;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
@Service
public class NotificationMail implements IserviceNotificationMail{
	@Autowired
	JavaMailSender emailSender;
	//send email
	public void sendEmail(String email , String subject, String html) {
		
	    MimeMessage msg = emailSender.createMimeMessage();
//	    MimeMessageHelper helper = null;
	    try {
	    	MimeMessageHelper  helper = new MimeMessageHelper(msg, true);
	        helper.setTo(email);
	        helper.setSubject(subject);
	        helper.setText(html, true);
	    } catch (MessagingException e1) {
	        e1.printStackTrace();
	    }
//	    try {
//	        helper.setTo(email);
//	    } catch (MessagingException e1) {
//	        e1.printStackTrace();
//	    }
//	    try {
//	        helper.setSubject(subject);
//	    } catch (MessagingException e) {
//	        e.printStackTrace();
//	    }
//	    try {
//	        helper.setText(html, true);
//	    } catch (MessagingException e) {
//	        e.printStackTrace();
//	    }
	    //helper.addAttachment("my_photo.png", new ClassPathResource("angular.png"));
	    emailSender.send(msg);

	}
	//
	public void sendmail(int id) {
//	    SimpleMailMessage message = new SimpleMailMessage(); 
//	    Client c = dao_c.getOne(id);
//	    String mail = c.getEmail();
//	    message.setTo(mail); 
//	    String html = "<button type='submite'><a hhref="redirect:/ " >cliquer pour confirmer</a></button>";
//	    String subject = "just a test";
	//
//	    dao_c.sendEmailWithAttachment(mail, subject, html);
//	    message.setSubject("STAK SHOP"); 
//	    message.setText("<br><h1>Demande de reservation est valide</h1>");
//	    emailSender.send(message , mail );
	}
}

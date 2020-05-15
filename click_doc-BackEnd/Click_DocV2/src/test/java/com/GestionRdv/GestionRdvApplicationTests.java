package com.GestionRdv;

import java.net.URI;
import java.net.URISyntaxException;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import com.GestionRdv.Entity.Administrateur;
import com.GestionRdv.Entity.Role;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.web.client.TestRestTemplate;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

import org.springframework.web.client.HttpClientErrorException;
//@RunWith(SpringRunner.class)
//@SpringBootTest
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
class GestionRdvApplicationTests {
	   @Autowired
	     private TestRestTemplate restTemplate;
	  @LocalServerPort
	    int randomServerPort;
	   private String getRootUrl() {
	         return "http://localhost:" + randomServerPort;
	     }

	@Test
	void contextLoads() {
	}
//	@Test
    public void testGetAdminListSuccess() throws URISyntaxException 
    {
        RestTemplate restTemplate = new RestTemplate();
        
        final String baseUrl = "http://localhost/api/administrateurs";
        URI uri = new URI(baseUrl);

        ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
        
        //Verify request succeed
        Assert.assertEquals(200, result.getStatusCodeValue());
        Assert.assertEquals(true, result.getBody().contains("adminList"));
    }
	   @Test
	     public void testGetAllAdmins() {
	     HttpHeaders headers = new HttpHeaders();
	        HttpEntity<String> entity = new HttpEntity<String>(null, headers);
	        ResponseEntity<String> response = restTemplate.exchange(getRootUrl() + "/administrateurs",
	        HttpMethod.GET, entity, String.class);  
	        assertNotNull(response.getBody());
	    }

	    @Test
	    public void testGetAdminById() {
	        Administrateur admin = restTemplate.getForObject(getRootUrl() + "/administrateurs/1", Administrateur.class);
	        System.out.println(admin.getNom());
	        assertNotNull(admin);
	    }
	    @Test
	    public void testCreateAdmin() {
	    	Administrateur admin = new Administrateur();
	    	admin.setEmail("admin@gmail.com");
	    	admin.setUsername("admin");
	    	admin.setPrenom("admin");
	    	admin.setNom("ayahaja");
//	    	Role role = new Role();
//	    	role.setId(1L);
//	    	admin.setRole(role);
	        ResponseEntity<Administrateur> postResponse = restTemplate.postForEntity(getRootUrl() + "/login/admin", admin,Administrateur.class);
	        assertNotNull(postResponse);
	        assertNotNull(postResponse.getBody());
	    }
	   @Test
	    public void testAddAdminSuccess() throws URISyntaxException 
	    {
	        RestTemplate restTemplate = new RestTemplate();
	        final String baseUrl = "http://localhost:"+randomServerPort+ "/login/admin";
	        URI uri = new URI(baseUrl);
	    	Role role = new Role();
	    	role.setId(1L);
	        Administrateur admin = new Administrateur(null, "aua", "nn","tets", role,"kaa.ck.co", "pass", null , null);
//	    	admin.setEmail("admin@gmail.com");
//	    	admin.setUsername("admin");
//	    	admin.setPrenom("admin");
//	    	admin.setNom("ayahaja");
	        
	        HttpHeaders headers = new HttpHeaders();
	        headers.set("X-COM-PERSIST", "true");      

	        HttpEntity<Administrateur> request = new HttpEntity<>(admin, headers);
	        
	        ResponseEntity<String> result = restTemplate.postForEntity(uri, request, String.class);
	        
	        //Verify request succeed
	        Assert.assertEquals(201, result.getStatusCodeValue());
	    }
	    
	    @Test
	    public void testUpdateAdmin() {
	        int id = 1;
	        Administrateur admin = restTemplate.getForObject(getRootUrl() + "/administrateurs/" + id, Administrateur.class);
	       	Administrateur admin2 = new Administrateur();
	    	admin2.setUsername("admin1");
	    	admin2.setPrenom("admin2");
	        restTemplate.put(getRootUrl() + "/employees/" + id, admin);
	        Administrateur updatedAdmin = restTemplate.getForObject(getRootUrl() + "/Administrateurs/" + id, Administrateur.class);
	        assertNotNull(updatedAdmin);
	    }

	    @Test
	    public void testDeleteAdmin() {
	         int id = 2;
	         Administrateur admin = restTemplate.getForObject(getRootUrl() + "/Administrateurs/" + id, Administrateur.class);
	         assertNotNull(admin);
	         restTemplate.delete(getRootUrl() + "/Administrateurs/" + id);
	         try {
	              admin = restTemplate.getForObject(getRootUrl() + "/Administrateurs/" + id, Administrateur.class);
	         } catch (final HttpClientErrorException e) {
	              assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
	         }
	    }
}

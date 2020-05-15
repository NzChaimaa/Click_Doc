package com.GestionRdv.Services;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.GestionRdv.Entity.Infirmier;
import com.GestionRdv.Entity.Medcin;
import com.GestionRdv.Entity.Role;
import com.GestionRdv.Entity.Utilisateur;





@Service
public class JwtUserDetailsService implements UserDetailsService{
	@Autowired 
	private IserviceUtilisateur gestionuser;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Utilisateur GU = gestionuser.findByUsername(username);
		if (GU != null) {
			return new User(GU.getUsername(),GU.getPassword(),getGrantedAuthorities(GU));
		} 

		else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}

	}
	private List<GrantedAuthority> getGrantedAuthorities(Utilisateur user)
	 {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		Role role = user.getRole();
		
			authorities.add(new SimpleGrantedAuthority(role.getLabel()));
		System.out.println(authorities);
		
		return authorities;
	}
}

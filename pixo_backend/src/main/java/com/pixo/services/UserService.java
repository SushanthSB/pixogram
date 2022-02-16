package com.pixo.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pixo.models.Followers;
import com.pixo.models.Roles;
import com.pixo.models.Users;
import com.pixo.repositories.RoleRepository;
import com.pixo.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {
	
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;
    
    @Autowired
    private MediaService mediaService;
	
	public Users findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
	
	public Users findUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
    public void saveUser(Map<String, String> body, MultipartFile file) {
    	String fileUri = null;
    	if(file != null) {
	    	String fileName = mediaService.storeFile(file);
	    	fileUri = ServletUriComponentsBuilder.fromCurrentContextPath()
	    			.path("/api/media/downloadFile/")
	    			.path(fileName)
	    			.toUriString();
    	}
    	
    	Users user = new Users();
    	user.setUsername(body.get("username"));
    	user.setPassword( bCryptPasswordEncoder.encode(body.get("password")) );
    	user.setEmail(body.get("email"));
    	user.setProfilePicture(fileUri);
        user.setEnabled(true);
        
        Roles userRole = roleRepository.findByRole("USER");
        user.setRoles(new HashSet<>(Arrays.asList(userRole)));
        user.setFollowers(new HashSet<>());
        
        userRepository.save(user);
    }
    
    public List<Users> findAllusers() {
        return userRepository.findAll();
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users user = userRepository.findByUsername(username);
        if(user != null) {
            List<GrantedAuthority> authorities = getUserAuthority(user.getRoles());
            return buildUserForAuthentication(user, authorities);
        } else {
            throw new UsernameNotFoundException("username not found");
        }
    }

    private List<GrantedAuthority> getUserAuthority(Set<Roles> userRoles) {
        Set<GrantedAuthority> roles = new HashSet<>();
        userRoles.forEach((role) -> {
            roles.add(new SimpleGrantedAuthority(role.getRole()));
        });

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>(roles);
        return grantedAuthorities;
    }

    private UserDetails buildUserForAuthentication(Users user, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }
    public void updateUser(String username,String followerUsername,String email) {
    	Followers follow=new Followers();
    	follow.setEmail(email);
    	follow.setUsername(followerUsername);
    	Users user=new Users();
    	user.setUsername(username);
    	user.setFollowers(new HashSet<>(Arrays.asList(follow)));
    	 userRepository.save(user);
 
    }

}

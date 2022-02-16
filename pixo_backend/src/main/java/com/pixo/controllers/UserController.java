package com.pixo.controllers;

import static org.springframework.http.ResponseEntity.ok;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pixo.models.Users;
import com.pixo.repositories.UserRepository;
import com.pixo.services.UserService;
import com.pixo.utils.JwtTokenProvider;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
    AuthenticationManager authenticationManager;
	
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    
    @Autowired
    UserRepository users;

    @Autowired
    private UserService userService;
    
    @GetMapping("")
    public String sample() {
    	return "Hello";
    }
    
    @PostMapping("/sample")
    public ResponseEntity<Map<String, String>> test(@RequestBody Map<String, Object> body) {
    	System.out.println(body);
    	Map<String, String> model = new HashMap<String, String>();
    	model.put("status", "Done");
    	return ok(model);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<Object, Object>> login(@RequestBody Map<String, String> body) {

    	String username = body.get("username");
    	String password = body.get("password");
    	System.out.println(username);
    	System.out.println(password);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            Users user = this.users.findByUsername(username);
            String token = jwtTokenProvider.createToken(username, user.getRoles());
            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("token", token);
            model.put("picture", user.getProfilePicture());
            return ok(model);
        } catch (AuthenticationException e) {
        	System.out.println(e);
            throw new BadCredentialsException("Invalid email/password supplied");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<Object, Object>> register(
    		@RequestParam Map<String, String> body, 
    		@RequestParam("picture") MultipartFile picture) {
    	System.out.println("*** Register ***");
    	System.out.println(picture);
    	String username = body.get("username");
        Users userExists = userService.findUserByUsername(username);
        if (userExists != null) {
            throw new BadCredentialsException("User with username: " + username + " already exists");
        }
        userService.saveUser(body, picture);
        Map<Object, Object> model = new HashMap<>();
        model.put("message", "User registered successfully");
        return ok(model);
    }
    
    @PutMapping("/followUser")
    public void followUser() {  	
//    	add followers
    }
    
}

package com.pixo.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Followers {
	private String username;
	private String email;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}

package com.pixo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pixo.models.Users;

public interface UserRepository extends MongoRepository<Users, String> {
	Users findByEmail(String email);
	Users findByUsername(String username);
}

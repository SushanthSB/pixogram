package com.pixo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pixo.models.Roles;

public interface RoleRepository extends MongoRepository<Roles, String> {
	Roles findByRole(String role);
}

package com.pixo.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pixo.models.Uploads;

public interface MediaRepository extends MongoRepository<Uploads, String> {
	List<Uploads> findAllByUsername(String username);
}

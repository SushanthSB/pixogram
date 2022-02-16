package com.pixo.utils;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "file")
public class FileBean {
	
	private String uploadDir;

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
    	System.out.println(uploadDir);
        this.uploadDir = uploadDir;
    }
    
}

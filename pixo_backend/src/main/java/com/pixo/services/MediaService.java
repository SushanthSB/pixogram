package com.pixo.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pixo.models.Uploads;
import com.pixo.models.Users;
import com.pixo.repositories.MediaRepository;
import com.pixo.repositories.UserRepository;
import com.pixo.utils.CustomFileNotFoundException;
import com.pixo.utils.FileBean;
import com.pixo.utils.FileException;

@Service
public class MediaService {
	
	@Autowired
    private  MediaRepository mediaRepo;
    @Autowired
    private  UserRepository userRepo;
    
    private final Path fileStorageLocation;
    
    public MediaService(FileBean fileBean) {
        this.fileStorageLocation = Paths.get(fileBean.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }
    
    public Uploads saveMedia(Map<String, String> body, MultipartFile file) {
    	String description = body.get("desc");
    	String title = body.get("title");
    	String tags = body.get("tags");
    	String username = body.get("username");
    	String createdDate = body.get("createddate");
    	String createdTime = body.get("createdtime");
    	
    	String fileName = this.storeFile(file);
    	String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/media/downloadFile/")	
                .path(fileName)
                .toUriString();
    	Users user = userRepo.findByUsername(username);
    	Uploads fileDetails = new Uploads(user, description, 
    			title, tags, fileName, fileDownloadUri, file.getContentType(), file.getSize(), 
    			createdDate, createdTime);
    	mediaRepo.save(fileDetails);
    	return fileDetails;
    }
    
    public void saveFileDetails(Uploads filedetails)
    {
          mediaRepo.save(filedetails);
    }
//    save profile picture should be moved to user service
    public List<Uploads> findAllFiles() {
        return mediaRepo.findAll();
        
    }
//    find all profile pictures is not needed and should be moved to user service

    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new CustomFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new CustomFileNotFoundException("File not found " + fileName, ex);
        }
    }

}

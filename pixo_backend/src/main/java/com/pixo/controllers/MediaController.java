package com.pixo.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pixo.models.Uploads;
import com.pixo.services.MediaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/media")
public class MediaController {
	
	@Autowired
    private MediaService mediaService;
	
	 @GetMapping("/findallfiles")
    public List<Uploads> findAllfiles() {
    
    	List<Uploads> allfilesList = new ArrayList<Uploads>();
    	mediaService.findAllFiles().forEach(allfilesList::add);
    	return allfilesList;
    }
    	
    @PostMapping("/uploadFile")
    public Uploads uploadFile(
    		@RequestParam Map<String, String> body, 
    		@RequestParam("mediafile") MultipartFile file) {
    	return mediaService.saveMedia(body, file);
//    	String fileName = mediaService.storeFile(file);
//        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/api/media/downloadFile/")	
//                .path(fileName)
//                .toUriString();
//        Uploads uploadfileresponse = new Uploads(
//        		fileName, 
//        		fileDownloadUri,
//                file.getContentType(), 
//                file.getSize(), 
//                description, 
//                title, 
//                tags, 
//                createdDate, 
//                createdTime
//          );
//        
//        mediaService.saveFileDetails(uploadfileresponse);
//        return  uploadfileresponse;
    }

//    @PostMapping("/uploadMultipleFiles")
//    public List<Uploads> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files,@RequestParam("desc") String description,@RequestParam("title") String title,@RequestParam("tags") String tags,@RequestParam("username") String username,@RequestParam("createddate") String createdDate,@RequestParam("createdtime") String createdTime 	) {
//        return Arrays.asList(files)
//                .stream()
//                .map(file -> uploadFile(file,description,title,tags,username,createdDate,createdTime))
//                .collect(Collectors.toList());
//    }
    
    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = mediaService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            //logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    
    }
}

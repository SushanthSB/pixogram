package com.pixo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.pixo.utils.FileBean;

@SpringBootApplication
@EnableConfigurationProperties({
	FileBean.class
})
public class PixoGramApplication {

	public static void main(String[] args) {
		SpringApplication.run(PixoGramApplication.class, args);
	}

}

package com.project;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/application-context.xml")
class CourseApplicationTests {

	@Test
	void contextLoads() {
	}

}

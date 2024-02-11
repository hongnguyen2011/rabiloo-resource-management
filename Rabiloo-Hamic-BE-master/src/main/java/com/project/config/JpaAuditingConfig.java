package com.project.config;

import com.project.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaAuditingConfig{
    @Bean
    public AuditorAware<Long> auditorProvider(){
        return new AuditorAwareImpl();
    }

    public static class AuditorAwareImpl implements AuditorAware<Long>{

        @Autowired
        private UserAuth userAuth;

        @Override
        public Optional<Long> getCurrentAuditor() {
            UserEntity user = userAuth.getCurrent();
            if(user == null) {
                return Optional.empty();
            }
            return Optional.ofNullable(user.getId());
        }

    }
}

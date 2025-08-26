package com.hexaware.cricket.repository;

import com.hexaware.cricket.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;




public interface IPlayerRepo extends JpaRepository<Player, Long> {
	boolean existsByJerseyNumber(Integer jerseyNumber);
	
	Optional<Player> findByJerseyNumber(Integer jerseyNumber);

	
	
}

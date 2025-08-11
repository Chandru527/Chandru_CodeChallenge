package com.hexaware.cricket.repository;

import com.hexaware.cricket.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;



public interface IPlayerRepo extends JpaRepository<Player, Long> {
	boolean existsByJerseyNumber(Integer jerseyNumber);

}

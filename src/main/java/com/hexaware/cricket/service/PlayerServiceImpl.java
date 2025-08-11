package com.hexaware.cricket.service;

import com.hexaware.cricket.dto.PlayerDto;
import com.hexaware.cricket.entity.Player;
import com.hexaware.cricket.exception.DuplicateResourceException;
import com.hexaware.cricket.exception.InvalidRequestException;
import com.hexaware.cricket.exception.ResourceNotFoundException;
import com.hexaware.cricket.repository.IPlayerRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerServiceImpl implements IPlayerService {

    private final IPlayerRepo repo;

    public PlayerServiceImpl(IPlayerRepo repo) {
        this.repo = repo;
    }

    private PlayerDto mapToDto(Player p) {
        return new PlayerDto(
                p.getId(),
                p.getPlayerName(),
                p.getJerseyNumber(),
                p.getRole(),
                p.getTotalMatches(),
                p.getTeamName(),
                p.getCountry(),
                p.getDescription()
        );
    }

    private Player mapToEntity(PlayerDto dto) {
        Player p = new Player();
        p.setPlayerName(dto.getPlayerName());
        p.setJerseyNumber(dto.getJerseyNumber());
        p.setRole(dto.getRole());
        p.setTotalMatches(dto.getTotalMatches());
        p.setTeamName(dto.getTeamName());
        p.setCountry(dto.getCountry());
        p.setDescription(dto.getDescription());
        return p;
    }

    @Override
    public PlayerDto createPlayer(PlayerDto dto) {
        
        if (dto.getJerseyNumber() == null) {
            throw new InvalidRequestException("Jersey number is required");
        }
        if (repo.existsByJerseyNumber(dto.getJerseyNumber())) {
            throw new DuplicateResourceException("Jersey number already in use");
        }

        Player p = mapToEntity(dto);
        Player saved = repo.save(p);
        return mapToDto(saved);
    }

    @Override
    public PlayerDto getPlayerById(Long id) {
        Player p = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Player not found with id " + id));
        return mapToDto(p);
    }

    @Override
    public List<PlayerDto> getAllPlayers() {
        List<Player> list = repo.findAll();
        List<PlayerDto> dtos = new ArrayList<>();
        for (Player p : list) {
            dtos.add(mapToDto(p));
        }
        return dtos;
    }

    @Override
    public PlayerDto updatePlayer(Long id, PlayerDto dto) {
        Player existing = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Player not found with id " + id));

        if (dto.getJerseyNumber() == null) {
            throw new InvalidRequestException("Jersey number is required");
        }
      
        if (!existing.getJerseyNumber().equals(dto.getJerseyNumber()) &&
                repo.existsByJerseyNumber(dto.getJerseyNumber())) {
            throw new DuplicateResourceException("Jersey number already in use by another player");
        }

        existing.setPlayerName(dto.getPlayerName());
        existing.setJerseyNumber(dto.getJerseyNumber());
        existing.setRole(dto.getRole());
        existing.setTotalMatches(dto.getTotalMatches());
        existing.setTeamName(dto.getTeamName());
        existing.setCountry(dto.getCountry());
        existing.setDescription(dto.getDescription());

        Player updated = repo.save(existing);
        return mapToDto(updated);
    }

    @Override
    public void deletePlayer(Long id) {
        Player p = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Player not found with id " + id));
        repo.delete(p);
    }

    
}

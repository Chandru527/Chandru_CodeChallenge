package com.hexaware.cricket.service;

import com.hexaware.cricket.dto.PlayerDto;

import java.util.List;

public interface IPlayerService {
    PlayerDto createPlayer(PlayerDto dto);
    PlayerDto getPlayerById(Long id);
    List<PlayerDto> getAllPlayers();
    PlayerDto updatePlayer(Long id, PlayerDto dto);
    void deletePlayer(Long id);

  
}

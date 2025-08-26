package com.hexaware.cricket.controller;

import com.hexaware.cricket.dto.PlayerDto;
import com.hexaware.cricket.service.IPlayerService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final IPlayerService service;

    public PlayerController(IPlayerService service) {
        this.service = service;
    }

    @GetMapping("/getall")
    public List<PlayerDto> getAllPlayers() {
        return service.getAllPlayers();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public PlayerDto createPlayer(@Valid @RequestBody PlayerDto dto) {
        return service.createPlayer(dto);
    }

    @GetMapping("/getplayerbyid/{playerId}")
    public PlayerDto getPlayerById(@PathVariable Long playerId) {
        return service.getPlayerById(playerId);
    }

    @PutMapping("/update/{playerId}")
    public PlayerDto updatePlayer(@PathVariable Long playerId, @Valid  @RequestBody PlayerDto dto) {
        return service.updatePlayer(playerId, dto);
    }

    @DeleteMapping("/delete/{playerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePlayer(@PathVariable Long playerId) {
        service.deletePlayer(playerId);
       
    }
    
    @GetMapping("/getplayerbyjersey/{jerseyNumber}")
    public PlayerDto getPlayerByJerseyNumber(@PathVariable Integer jerseyNumber) {
        return service.getPlayerByJerseyNumber(jerseyNumber);
    }

    

    
}

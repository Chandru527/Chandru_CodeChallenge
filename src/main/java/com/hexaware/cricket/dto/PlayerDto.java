package com.hexaware.cricket.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PlayerDto {

    private Long id;

    @NotBlank(message = "Player name is required")
    private String playerName;

    @NotNull(message = "Jersey number is required")
    @Min(value = 1, message = "Jersey number must be >= 1")
    private Integer jerseyNumber;

    @NotBlank(message = "Role is required")
    @Pattern(regexp = "^(Batsman|Bowler|Wicketkeeper|All Rounder)$",message = "Role must be Batsman, Bowler, Wicketkeeper, or All Rounder")
    private String role;

   

    @NotNull(message = "Total matches is required")
    @Min(value = 0, message = "Total matches cannot be negative")
    private Integer totalMatches;

    @NotBlank(message = "Team name is required")
    private String teamName;

    @NotBlank(message = "Country is required")
    private String country;

    @Size(max = 1000, message = "Description must be <= 1000 characters")
    private String description;
}

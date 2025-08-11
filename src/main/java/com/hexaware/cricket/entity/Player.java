package com.hexaware.cricket.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "players")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            
    @Column(nullable = false)
    private String playerName;

    @Column(nullable = false, unique = true)
    private Integer jerseyNumber;

    @Column(nullable = false)
    private String role;               

    @Column(nullable = false)
    private Integer totalMatches;

    @Column(nullable = false)
    private String teamName;

    @Column(nullable = false)
    private String country;

    @Column(length = 1000)
    private String description;
}

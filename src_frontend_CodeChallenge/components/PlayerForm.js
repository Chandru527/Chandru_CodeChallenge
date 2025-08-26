import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPlayer, getPlayerById, updatePlayer } from '../services/playerService';

const PlayerForm = () => {
    const [player, setPlayer] = useState({
        playerName: '',
        jerseyNumber: '',
        role: '',
        totalMatches: '',
        teamName: '',
        country: '',
        description: '',
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadPlayer(id);
        }
    }, [id]);

    const loadPlayer = async (playerId) => {
        try {
            const res = await getPlayerById(playerId);
            setPlayer(res.data);
        } catch (error) {
            alert('Failed to load player details');
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            if (id) {
                await updatePlayer(id, player);
                alert('Player updated successfully!');
            } else {
                await createPlayer(player);
                alert('Player added successfully!');
            }
            navigate('/players');
        } catch (error) {
            alert('Error saving player. Please check your inputs.');
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? 'Edit Player' : 'Add Player'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Player Name *</label>
                    <input
                        type="text"
                        name="playerName"
                        className="form-control"
                        value={player.playerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Jersey Number *</label>
                    <input
                        type="number"
                        min="1"
                        name="jerseyNumber"
                        className="form-control"
                        value={player.jerseyNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Role *</label>
                    <select
                        name="role"
                        className="form-select"
                        value={player.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select role</option>
                        <option value="Batsman">Batsman</option>
                        <option value="Bowler">Bowler</option>
                        <option value="Wicketkeeper">Wicketkeeper</option>
                        <option value="All Rounder">All Rounder</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Total Matches *</label>
                    <input
                        type="number"
                        min="0"
                        name="totalMatches"
                        className="form-control"
                        value={player.totalMatches}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Team Name *</label>
                    <input
                        type="text"
                        name="teamName"
                        className="form-control"
                        value={player.teamName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Country *</label>
                    <input
                        type="text"
                        name="country"
                        className="form-control"
                        value={player.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={player.description}
                        onChange={handleChange}
                        rows="3"
                        maxLength="1000"
                    />
                </div>
                <button type="submit" className="btn btn-success">{id ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default PlayerForm;

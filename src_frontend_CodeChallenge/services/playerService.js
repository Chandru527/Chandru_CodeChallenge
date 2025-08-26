import axios from 'axios';

const API_URL = 'http://localhost:8080/api/players';

export const getAllPlayers = () => axios.get(`${API_URL}/getall`);
export const getPlayerById = (id) => axios.get(`${API_URL}/getplayerbyid/${id}`);
export const getPlayerByJerseyNumber = (jerseyNumber) => axios.get(`${API_URL}/getplayerbyjersey/${jerseyNumber}`);
export const createPlayer = (player) => axios.post(`${API_URL}/create`, player);
export const updatePlayer = (id, player) => axios.put(`${API_URL}/update/${id}`, player);

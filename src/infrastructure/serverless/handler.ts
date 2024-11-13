import express from 'express';
import serverless from 'serverless-http';
import { SwapiRepository } from '../repositories/swapi_repository';
import { DynamoDBRepository } from '../repositories/dynamodb_repository';
import { CharacterService } from '@/application/services/character_service';
import { StarshipService } from '@/application/services/startship_service';


const app = express();
app.use(express.json());

// Repositories
const swapiRepository = new SwapiRepository();
const dynamoDBRepository = new DynamoDBRepository();

// Services
const characterService = new CharacterService(swapiRepository);
const starshipService = new StarshipService(dynamoDBRepository);

/**
 * @swagger
 * /character/{id}:
 *   get:
 *     summary: Gets a Star Wars character by ID and returns data in Spanish
 */
app.get('/character/:id', async (req, res) => {
  try {
    const character = await characterService.getById(req.params.id);
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching character' });
  }
});

/**
 * @swagger
 * /starship:
 *   post:
 *     summary: Creates a new starship
 */
app.post('/starship', async (req, res) => {
  try {
    const starship = await starshipService.create(req.body);
    res.status(201).json(starship);
  } catch (error) {
    res.status(500).json({ message: 'Error creating starship' });
  }
});

/**
 * @swagger
 * /starships:
 *   get:
 *     summary: Gets all stored starships
 */
app.get('/starships', async (req, res) => {
  try {
    const starships = await starshipService.getAll();
    res.json(starships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching starships' });
  }
});

export const handler = serverless(app);
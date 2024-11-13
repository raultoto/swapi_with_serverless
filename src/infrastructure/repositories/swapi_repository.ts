import { Character } from '@/domain/entities/character';
import { CharacterRepository } from '@/domain/repositories/character_repository';
import axios from 'axios';
import { transformCharacterToSpanish } from '../mappers/character_mapper';

export class SwapiRepository implements CharacterRepository {
  private readonly baseUrl = 'https://swapi.py4e.com/api';

  async getById(id: string): Promise<Character> {
    const response = await axios.get(`${this.baseUrl}/people/${id}/`);
    return transformCharacterToSpanish(response.data);
  }
}

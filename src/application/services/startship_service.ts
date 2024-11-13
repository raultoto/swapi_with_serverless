import { Starship } from '@/domain/entities/ship';
import { StarshipRepository } from '@/domain/repositories/startship_repository';
import { v4 as uuidv4 } from 'uuid';

export class StarshipService {
  constructor(private readonly starshipRepository: StarshipRepository) {}

  async create(data: Omit<Starship, 'id' | 'type' | 'created_at'>): Promise<Starship> {
    const starship: Starship = {
      ...data,
      id: uuidv4(),
      type: 'starship',
      created_at: new Date().toISOString()
    };
    return this.starshipRepository.create(starship);
  }

  async getAll(): Promise<Starship[]> {
    return this.starshipRepository.getAll();
  }
}
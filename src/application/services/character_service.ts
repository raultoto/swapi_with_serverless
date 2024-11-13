import { Character } from "@/domain/entities/character";
import { CharacterRepository } from "@/domain/repositories/character_repository";

export class CharacterService {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async getById(id: string): Promise<Character> {
    return this.characterRepository.getById(id);
  }
}

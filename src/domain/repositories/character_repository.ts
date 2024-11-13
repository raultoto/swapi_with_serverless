import { Character } from "../entities/character";

export interface CharacterRepository {
    getById(id: string): Promise<Character>;
  }
  
import { Starship } from "../entities/ship";

export interface StarshipRepository {
    create(starship: Starship): Promise<Starship>;
    getAll(): Promise<Starship[]>;
  }
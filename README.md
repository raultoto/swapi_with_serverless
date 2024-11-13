# Star Wars API - Technical Challenge

## Overview
Implementation of a serverless REST API integrating SWAPI (Star Wars API) with attribute translation (EN -> ES) and DynamoDB storage using Clean Architecture principles.

## Technical Requirements Checklist

### Core Requirements 
- Node.js with Serverless Framework
- SWAPI integration with translation layer
- REST endpoints (GET & POST)
- DynamoDB integration
- Clean architecture
- Development best practices


## Project Structure
```
.
├── application/          # Application layer
│   └── services/
│       ├── character_service.ts
│       └── startship_service.ts
├── domain/              # Domain layer
│   ├── entities/
│   │   ├── character.ts
│   │   └── ship.ts
│   └── repositories/
│       ├── character_repository.ts
│       └── startship_repository.ts
└── infrastructure/      # Infrastructure layer
    ├── mappers/
    │   └── character_mapper.ts
    ├── repositories/
    │   ├── dynamodb_repository.ts
    │   └── swapi_repository.ts
    └── serverless/
        └── handler.ts
```

## Technical Implementation

### Domain Layer

#### Entities
```typescript
// domain/entities/character.ts
interface Character {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

// domain/entities/ship.ts
interface Ship {
  id: string;
  type: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  created_at: string;
}
```

### Application Layer

#### Services
```typescript
// application/services/character_service.ts
interface CharacterService {
  getById(id: string): Promise<Character>;
}

// application/services/startship_service.ts
interface StartshipService {
  create(ship: Ship): Promise<Ship>;
  getAll(): Promise<Ship[]>;
}
```

### Infrastructure Layer

#### Repositories
```typescript
// infrastructure/repositories/swapi_repository.ts
class SwapiRepository implements CharacterRepository {
  private readonly baseUrl = 'https://swapi.py4e.com/api';

  async getById(id: string): Promise<Character> {
    const response = await axios.get(`${this.baseUrl}/people/${id}/`);
    return response.data;
  }
}

// infrastructure/repositories/dynamodb_repository.ts
class DynamoDBRepository implements StartshipRepository {
  private readonly tableName = process.env.DYNAMODB_TABLE;

  async create(ship: Ship): Promise<Ship>;
  async getAll(): Promise<Ship[]>;
}
```

#### Mappers
```typescript
// infrastructure/mappers/character_mapper.ts
interface TranslatedCharacter {
  nombre: string;
  altura: string;
  peso: string;
  colorCabello: string;
  colorPiel: string;
  colorOjos: string;
  añoNacimiento: string;
  genero: string;
  // ... other translated fields
}

class CharacterMapper {
  static toSpanish(character: Character): TranslatedCharacter;
}
```

## API Endpoints

### Character Endpoint
```typescript
// GET /character/{id}
// Returns translated character data
interface GetCharacterResponse {
  nombre: string;
  altura: string;
  // ... translated fields
}
```

### Starship Endpoints
```typescript
// POST /starship
interface CreateShipRequest {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
}

// GET /starships
// Returns array of ships
```




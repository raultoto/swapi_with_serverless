import { Character } from "@/domain/entities/character";

export const transformCharacterToSpanish = (data: any): Character => ({
    id: data.url.split('/').filter(Boolean).pop(),
    nombre: data.name,
    altura: data.height,
    peso: data.mass,
    colorCabello: data.hair_color,
    colorPiel: data.skin_color,
    colorOjos: data.eye_color,
    añoNacimiento: data.birth_year,
    genero: data.gender,
    mundoNatal: data.homeworld,
    peliculas: data.films,
    especies: data.species,
    vehiculos: data.vehicles,
    navesEstelares: data.starships,
    creado: data.created,
    editado: data.edited,
    url: data.url
  });
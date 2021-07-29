import * as fr from './locale.fr';


export interface Locale {
  id: string,
  dateFormat: string,
  translations: {'id':string, 'html':string}[]
}

export interface Language {
  id: string,
  name: string,
  locale: Locale
}

export const AVAILABLE_LANGUAGES: Language[] = [
  {id: 'en', name: 'English', locale: { id: 'en',  dateFormat: 'en-US',  translations: []}},
  {id: 'fr', name: 'Français', locale: fr.locale}
];

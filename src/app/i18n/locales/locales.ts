import * as fr from './locale.fr';


export interface Locale {
  id: string,
  dateFormat: string,
  translations: {'id':string, 'html':string}[]
}


const enLocale: Locale = {
  id: 'en',
  dateFormat: 'en-US',
  translations: []
}

export const AVAILABLE_LOCALES: {'id': string, 'name': string, 'locale'?: Locale}[] = [
  {id: 'en', name: 'English', locale: enLocale},
  {id: 'fr', name: 'Français', locale: fr.locale}
];

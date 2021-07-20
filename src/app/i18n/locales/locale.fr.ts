import { Locale } from "./locales";
import * as t from '@angular/common/locales/fr';

export const locale: Locale = {
  id: 'fr',
  dateFormat: '',
  translations: [
    // home page
    {id: 'home-title', html: `Certificat Numérique COVID UE`},
    {id: 'home-tagline', html: `Importez et stockez facilement vos certificats COVID sur votre smartphone.`},
    {id: 'home-action-list', html: `Voir vos certificats`},
    {id: 'home-what-title', html: `Qu'est-ce que c'est ?`},
    {id: 'home-what-application', html: `The site internet est une application web qui vous permet de stocker et montrer vos Certificats Numériques COVID (DCC), en utilisant votre caméra pour les importer.`},
    {id: 'home-what-offline', html: `Vous pouvez même installer cette application sur votre écran d'accueil, et l'utiliser même en étant hors-ligne.`},
    {id: 'home-what-local', html: `Vos certificats sont stockées localement sur votre appareil. Aucun service en ligne n'est utilisé pendant le fonctionnemet de l'application.`},
    {id: 'home-dcc-title', html: `Qu'est-ce qu'un DCC ?`},
    {id: 'home-dcc-list-types', html: `Un DCC (pour Digital Covid Certificate) est une preuve numérique attestant qu’une personne :`},
    {id: 'home-dcc-type-vaccine', html: `été vaccinée contre la COVID-19`},
    {id: 'home-dcc-type-test', html: `a réçu un résultat de test négatif`},
    {id: 'home-dcc-type-recovery', html: `s'est rétablie de la COVID-19`},
    {id: 'home-dcc-list-feature', html: `Principales caractéristiques du certificat :`},
    {id: 'home-dcc-feat-digital', html: `Format numérique et/ou papier`},
    {id: 'home-dcc-feat-qrcode', html: `Comporte un code QR`},
    {id: 'home-dcc-feat-free', html: `Gratuit`},
    {id: 'home-dcc-feat-lang', html: `Dans les langues nationales et en anglais`},
    {id: 'home-dcc-feat-safe', html: `Sûr et sécurisé`},
    {id: 'home-dcc-feat-valid', html: `Valable dans tous les pays de l’UE`},
    {id: 'home-dcc-more-info', html: `Plus d'informations sont disponibles sur le <a href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_fr">site de la Commission Européenne</a>.`},
    {id: 'home-why-title', html: `Pourquoi utiliser ce site ?`},
    {id: 'home-why-bloated-apps', html: `Dans certains pays, l'application recommandée pour stocker les certificats nuémriques est pleine de fonctionnalités inutiles, voire incompatibles avec certains téléphones.`},
    {id: 'home-why-increased-usage', html: `Dans le même temps, le nombre de personnes infectées par la Covid 19 obligent les entités officielles à se reposer de plus en plus sur ce certificat pour permettre tout de même à la population de vivre une vie (à peu près) normale.`},
    {id: 'home-help-title', html: `Puis-je aider ?`},
    {id: 'home-help-opensource', html: `Bien sûr! Cette application est <strong>Open Source</strong>, et sous la licence MIT. Vous pouvez télécharger le code source, et même y contribuer.`},
    {id: 'home-help-github', html: `Le code source est disponible sur ce <a href="https://github.com/bchanudet/covid-certificate-pwa">dépot Github</a>.`},
    {id: 'home-help-appreciated', html: `Même si vous ne savez pas coder, toute contribution sera appréciée. J'accepte notamment volontiers l'aide sur la traduction vers d'autres languages.`},
    {id: 'home-authors-title', html:`Qui sont derrière ce site ?`},
    {id: 'home-authors-me', html: `Pour l'instant, il n'y a que moi, <a href="https://benjaminchanudet.com">Benjamin Chanudet</a>. Je suis un développeur français, et pas réellement emballée à l'idée d'utiliser Tous Anti Covid, qui nécessite des permissions particulières de Bluetooth, de gestion de la batterie, juste pour stocker un QR Code...`},
    {id: 'home-authors-icons', html: `Les icônes de l'application proviennent du projet <a href="https://tabler-icons.io/">Tabler</a>. Le logo de l'application est sous licence <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr">CC-BY-NC-SA.</a>`},
    {id: 'home-authors-translations', html: `Les traductions proviennent de :`},
    {id: 'home-authors-french', html: `Français: Benjamin Chanudet`},
    {id: 'home-disclaimers-title', html: `Avertissement`},
    {id: 'home-disclaimers-not-endorsed', html: `Cette  application n'a été ni supportée ni approuvée par une quelconque autorité officielle.`},
    {id: 'home-disclaimers-be-wary', html: `Même si le QR Code stocké par l'application devrait suffire et est validé par l'application "Tous Anti Covid Verif", il n'est pas impossible que l'application soit refusée par la personne . De même, n'oubliez pas que vous devez toujours présenter une pièce d'identité lors de la vérification.`},

    // cert
    {id: 'cert-identity-title', html: `Identité`},
    {id: 'cert-identity-forenames', html:`Prénom(s)`},
    {id: 'cert-identity-lastnames', html: `Nom(s)`},
    {id: 'cert-identity-birthday', html: `Date de naissance`},
    {id: 'cert-type-vaccine', html:`Certificat de vaccination`},
    {id: 'cert-type-test', html: `Certificat de test`},
    {id: 'cert-type-recovery', html: `Certificat de rétablissment`},
    {id: 'cert-disease', html: `Maladie ou agent infectieux ciblé`},

    // Update available
    {id: 'app-update-available', html: `Une nouvelle version est disponible. Cliquez sur le bouton pour l'activer.`},
    {id: 'app-update-reload', html: `Recharger`}
  ]
};

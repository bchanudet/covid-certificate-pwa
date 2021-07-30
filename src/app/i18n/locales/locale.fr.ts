import { Locale } from "./locales";
import ngLocale from '@angular/common/locales/fr';
import { registerLocaleData } from "@angular/common";

// Register the locale in Angular to use date formats
registerLocaleData(ngLocale);

export const locale: Locale = {
  id: 'fr',
  dateFormat: 'fr-FR',
  translations: [
    // home page
    {id: 'home-title', html: `Certificat Numérique COVID UE`},
    {id: 'home-tagline', html: `Importez et stockez facilement vos certificats COVID sur votre smartphone.`},
    // actions
    {id: 'home-action-list', html: `Voir vos certificats`},
    {id: 'home-action-import', html: `Importez votre premier certificat`},
    // text
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

    // List page
    {id: 'list-title', html: `Vos certificats`},
    {id: 'list-instructions', html: `Vous n'avez importé aucun certificat. Cliquez sur le bouton pour scanner un QR Code.`},
    {id: 'list-action-import', html: `Importer un nouveau certificat`},
    {id: 'list-install-text', html: `Vous pouvez aussi ajouter l'application à votre écran d'accueil. Vous pourrez ainsi l'utiliser même sans connexion internet.`},
    {id: 'list-action-install', html: `Ajouter sur l'écran d'accueil`},

    // View page
    {id: 'view-title', html: `Certificat numérique`},
    {id: 'view-action-remove', html: `Supprimer le certificat`},
    {id: 'view-action-remove-confirm', html: `Cliquez à nouveau pour confirmer`},

    // Scan page
    {id: 'scan-title', html: `Importer un certificat`},
    {id: 'scan-instructions', html: `Utilisez la visualisation ci-dessous pour scanner le QR Code de votre certificat numérique.`},
    {id: 'scan-instructions', html: `Utilisez la visualisation ci-dessous pour scanner le QR Code de votre certificat numérique.`},
    {id: 'scan-camera-permission', html: `Veuillez autoriser l'application à utiliser votre appareil photo.`},
    {id: 'scan-camera-denied', html: `L'application n'est pas autorisée à accéder à l'appareil photo.`},
    {id: 'scan-camera-loading', html: `Lancement de l'appareil photo...`},
    {id: 'scan-action-switch', html: `Basculer`},
    {id: 'scan-action-torch', html: `Flash`},
    {id: 'scan-result-invalid', html: `Le QR Code scanné ne correspond pas à un Certificat Numérique. Veuillez ressayer avec un autre`},

    // Check page
    {id: 'check-title', html: `Vérifier les données`},
    {id: 'check-duplicate', html: `Ce certificat fait déjà partie de votre liste. Veuillez réssayer avec un autre.`},
    {id: 'check-instructions', html: `Veuillez vérifier attentivement les données du certificat scanné en les comparant à celle présentes sur votre document source. Si tout est correct, cliquez sur "Importer" en bas de la page.`},
    {id: 'check-localstorage-unavailable', html: `Votre appareil ne supporte pas le stockage local de documents. Vous ne pouvez pas importer ce certificat mais vous pouvez tout de même en vérifier les données.`},
    {id: 'check-action-back', html: `Retour`},
    {id: 'check-action-import', html: `Importer`},
    {id: 'check-action-retry', html: `Essayer à nouveau`},
    {id: 'check-data-corrupted', html: `Le QR Code que vous avez scanné semble corrompu. Impossible d'en extraire les données.`},
    // about signatures
    {id: 'check-signatures-title', html: `À propos des signatures numériques`},
    {id: 'check-signatures-explain', html: `Les certificats numériques COVID sont signés numériquement. Le QR Code contient des données qui permettent de prouver qu'il a été délivré par une autorité compétente et autorisée.`},
    {id: 'check-signatures-no-verify', html: `Cette application ne vérifie pas la signature numérique. `},
    {id: 'check-signatures-only-valid', html: `Elle ne peut être utilisée pour vérifier la validité d'un certificat et ne peut pas se substituer à l'application "TousAntiCovid Verif". Prenez soin à n'importer que des certificats venant d'une source officielle.`},
    {id: 'check-signatures-how', html: `Pour être capable d'afficher un QR Code valide lorsque demandé, cette application stocke les données du QR Code "tel quel", avec la signature numérique déjà intégrée.`},

    // Settings page
    {id: 'settings-title', html: `Préférences`},
    {id: 'settings-scheme-title', html: `Thème`},
    {id: 'settings-scheme-default', html: `Système`},
    {id: 'settings-scheme-light', html: `Clair`},
    {id: 'settings-scheme-dark', html: `Foncé`},
    {id: 'settings-scheme-instructions', html: `L'option "Système" demande à l'application de suivre les préférences du système de votre appareil. Par exemple, si vous avez appliqué le thème foncé sur votre Android, l'application sera en thème foncé. Les deux autres options permettent de surcharger cette valeur par défaut.`},
    {id: 'settings-language-title', html: `Langue`},
    {id: 'settings-language-auto', html: `Détection automatique`},
    {id: 'settings-language-instructions', html: `Par défaut l'application va inspecter la langue du navigateur et, si une traduction pour celle-ci existe, va l'appliquer. Sinon la langue sera l'anglais. Vous pouvez choisir de désactiver ce comportement en sélectionnant une langue spécifique dans le champ ci-dessus.`},


    // Certificate details
    {id: 'cert-identity-title', html: `Identité`},
    {id: 'cert-identity-forenames', html:`Prénom(s)`},
    {id: 'cert-identity-lastnames', html: `Nom(s)`},
    {id: 'cert-identity-birthday', html: `Date de naissance`},
    // actions
    {id: 'cert-action-hide', html:`Cacher les détails`},
    {id: 'cert-action-show', html:`Afficher les détails`},
    // certs types
    {id: 'cert-type-vaccine', html:`Certificat de vaccination`},
    {id: 'cert-type-test', html: `Certificat de test`},
    {id: 'cert-type-recovery', html: `Certificat de rétablissment`},
    // global to all certs
    {id: 'cert-disease', html: `Maladie ou agent ciblé`},
    // vaccine cert
    {id: 'cert-vaccine', html: `Vaccin/prophylaxie`},
    {id: 'cert-vaccine-product', html: `Médicament vaccinal`},
    {id: 'cert-vaccine-manufacturer', html: `Fabricant ou titulaire de l'autorisation de mise sur le marché du vaccin`},
    {id: 'cert-vaccine-numbers', html: `Nombre dans une série de vaccins/doses`},
    {id: 'cert-vaccine-date', html: `Date de la vaccination`},
    {id: 'cert-vaccine-country', html: `État membre de vaccination`},
    {id: 'cert-vaccine-issuer', html: `Émetteur du certificat`},
    // test cert
    {id: 'cert-test-type', html: `Type de test`},
    {id: 'cert-test-naa-name', html: `Nom du test PCR`},
    {id: 'cert-test-rat-name', html: `Nom du test antigénique et fabricant`},
    {id: 'cert-test-result', html: `Résultat du test`},
    {id: 'cert-test-datetime', html: `Date et heure de prélèvement`},
    {id: 'cert-test-center', html: `Centre de test`},
    {id: 'cert-test-country', html: `État membre de test`},
    {id: 'cert-test-issuer', html: `Émetteur du certificat`},
    // recovery cert
    {id: 'cert-recovery-date-test', html: `Date du premier test PCR positif`},
    {id: 'cert-recovery-valid-from', html: `Certificat valide à partir du`},
    {id: 'cert-recovery-valid-until', html: `Certificat valide jusqu'au`},
    {id: 'cert-recovery-country', html: `État membre de test`},

    // Update available
    {id: 'app-update-available', html: `Une nouvelle version est disponible. Cliquez sur le bouton pour l'activer.`},
    {id: 'app-update-reload', html: `Recharger`},


  ]
};

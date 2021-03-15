
const verifyCode = errorCode => {
    switch (errorCode){
        case 'auth/app-deleted':
                return 'La base de données est introuvable.';
            case 'auth/expired-action-code':
                return "Le code d'action ou le lien a expiré.";
            case 'auth/invalid-action-code':
                return "Le code d'action n'est pas valide. Cela peut se produire si le code est mal formé ou a déjà été utilisé.";
            case 'auth/user-disabled':
                return "L'utilisateur correspondant à l'identifiant fourni a été désactivé.";
            case 'auth/user-not-found':
                return "Il n'y a pas d'enregistrement d'utilisateur correspondant à cet identifiant. L'utilisateur a peut-être été supprimé";
            case 'auth/weak-password':
                return 'Le mot de passe est très faible (min 6 caractères).';
            case 'auth/email-already-in-use':
                return "Un compte existe déjà avec l'adresse e-mail que vous avez fournie.";
            case 'auth/invalid-email':
                return "L'adresse e-mail n'est pas valide.";
            case 'auth/operation-not-allowed':
                return "Le type de compte correspondant à cet identifiant n'est pas encore activé.";
            case 'auth/account-exists-with-different-credential':
                return "E-mail déjà associé à un autre compte.";
            case 'auth/auth-domain-config-required':
                return "La configuration pour l'authentification n'a pas été fournie.";
            case 'auth/credential-already-in-use':
                return "Un compte existe déjà pour cet identifiant.";
            case 'auth/operation-not-supported-in-this-environment':
                return "Cette opération n'est pas prise en charge dans l'environnement en cours d'exécution. Assurez-vous qu'il doit être http ou https.";
            case 'auth/timeout':
                return "Temps de réponse dépassé. Le domaine n'est peut-être pas autorisé à effectuer des opérations.";
            case 'auth/missing-android-pkg-name':
                return "Un nom de package doit être fourni pour installer l'application Android.";
            case 'auth/missing-continue-uri':
                return "L'URL suivante doit être fournie dans la demande.";
            case 'auth/missing-ios-bundle-id':
                return "Un nom de package doit être fourni pour installer l'application iOS.";
            case 'auth/invalid-continue-uri':
                return "L'URL suivante fournie dans la demande n'est pas valide.";
            case 'auth/unauthorized-continue-uri':
                return "Le domaine de l'URL suivante ne figure pas sur la liste blanche.";
            case 'auth/invalid-dynamic-link-domain':
                return "Le domaine de lien dynamique fourni n'est pas autorisé ou configuré dans le projet en cours.";
            case 'auth/argument-error':
                return "Vérifiez la configuration du lien pour l'application.";
            case 'auth/invalid-persistence-type':
                return "Le type spécifié pour la persistance des données n'est pas valide.";
            case 'auth/unsupported-persistence-type':
                return "L'environnement actuel ne prend pas en charge le type spécifié pour la persistance des données.";
            case 'auth/invalid-credential':
                return "Les informations d'identification ont expiré ou sont mal formées.";
            case 'auth/wrong-password':
                return "Mot de passe incorrect.";
            case 'auth/invalid-verification-code':
                return "Le code de vérification des informations d'identification n'est pas valide.";
            case 'auth/invalid-verification-id':
                return "L'ID de vérification des informations d'identification n'est pas valide.";
            case 'auth/custom-token-mismatch':
                return "Le jeton est différent de la norme demandée.";
            case 'auth/invalid-custom-token':
                return "Le jeton fourni n'est pas valide.";
            case 'auth/captcha-check-failed':
                return "Le jeton de réponse CAPTCHA n'est pas valide, a expiré ou le domaine n'est pas autorisé.";
            case 'auth/invalid-phone-number':
                return "Le numéro de téléphone est dans un format non valide (norme E.164).";
            case 'auth/missing-phone-number':
                return "Le numéro de téléphone est obligatoire.";
            case 'auth/quota-exceeded':
                return 'Le quota SMS a été dépassé.';
            case 'auth/cancelled-popup-request':
                return "Une seule demande de fenêtre contextuelle est autorisée à la fois.";
            case 'auth/popup-blocked':
                return "La fenêtre contextuelle a été bloquée par le navigateur.";
            case 'auth/popup-closed-by-user':
                return "La fenêtre contextuelle a été fermée par l'utilisateur sans avoir terminé la connexion au fournisseur.";
            case 'auth/unauthorized-domain':
                return "Le domaine d'application n'est pas autorisé à effectuer des opérations.";
            case 'auth/invalid-user-token':
                return "L'utilisateur actuel n'a pas été identifié.";
            case 'auth/user-token-expired':
                return "Le jeton de l'utilisateur actuel a expiré.";
            case 'auth/null-user':
                return "L'utilisateur actuel est nul.";
            case 'auth/app-not-authorized':
                return "Application non autorisée pour s'authentifier avec la clé informée.";
            case 'auth/invalid-api-key':
                return "La clé API fournie n'est pas valide.";
            case 'auth/network-request-failed':
                return "La connexion au réseau a échoué.";
            case 'auth/requires-recent-login':
                return "La dernière heure d'accès de l'utilisateur ne respecte pas la limite de sécurité.";
            case 'auth/too-many-requests':
                return "Les demandes ont été bloquées en raison d'une activité inhabituelle. Réessayez après un certain temps.";
            case 'auth/web-storage-unsupported':
                return "Le navigateur ne prend pas en charge le stockage ou si l'utilisateur a désactivé cette fonctionnalité.";
            case 'auth/invalid-claims':
                return "Les attributs d'inscription personnalisés ne sont pas valides.";
            case 'auth/claims-too-large':
                return "La taille de la demande dépasse la taille maximale autorisée de 1 mégaoctet.";
            case 'auth/id-token-expired':
                return "Le jeton signalé a expiré.";
            case 'auth/id-token-revoked':
                return "Le jeton informé a expiré.";
            case 'auth/invalid-argument':
                return "Un argument non valide a été donné à une méthode.";
            case 'auth/invalid-creation-time':
                return "L'heure de création doit être une date UTC valide.";
            case 'auth/invalid-disabled-field':
                return "La propriété de l'utilisateur désactivé n'est pas valide.";
            case 'auth/invalid-display-name':
                return "Le nom d'utilisateur n'est pas valide.";
            case 'auth/invalid-email-verified':
                return "L'e-mail n'est pas valide.";
            case 'auth/invalid-hash-algorithm':
                return "L'algorithme HASH n'est pas un cryptage pris en charge.";
            case 'auth/invalid-hash-block-size':
                return "La taille du bloc HASH n'est pas valide.";
            case 'auth/invalid-hash-derived-key-length':
                return "La taille de clé dérivée de HASH n'est pas valide.";
            case 'auth/invalid-hash-key':
                return "A chave de HASH precisa ter um buffer de byte válido.";
            case 'auth/invalid-hash-memory-cost':
                return "Le coût de la mémoire HASH n'est pas valide.";
            case 'auth/invalid-hash-parallelization':
                return "Le chargement parallèle de HASH n'est pas valide.";
            case 'auth/invalid-hash-rounds':
                return "L'arrondi HASH n'est pas valide.";
            case 'auth/invalid-hash-salt-separator':
                return "Le champ séparateur JUMP de l'algorithme de génération HASH doit être un tampon d'octets valide.";
            case 'auth/invalid-id-token':
                return "Le code de jeton entré n'est pas valide.";
            case 'auth/invalid-last-sign-in-time':
                return "La dernière heure de connexion doit être une date UTC valide.";
            case 'auth/invalid-page-token':
                return "L'URL suivante fournie dans la demande n'est pas valide.";
            case 'auth/invalid-password':
                return "Le mot de passe n'est pas valide, il doit comporter au moins 6 caractères.";
            case 'auth/invalid-password-hash':
                return "Le mot de passe HASH n'est pas valide.";
            case 'auth/invalid-password-salt':
                return "Le mot de passe SALT n'est pas valide.";
            case 'auth/invalid-photo-url':
                return "L'URL de la photo de l'utilisateur n'est pas valide.";
            case 'auth/invalid-provider-id':
                return "L'identifiant du fournisseur n'est pas pris en charge.";
            case 'auth/invalid-session-cookie-duration':
                return "La durée de la session COOKIE doit être un nombre valide en millisecondes, entre 5 minutes et 2 semaines.";
            case 'auth/invalid-uid':
                return "L'identifiant fourni doit comporter au maximum 128 caractères.";
            case 'auth/invalid-user-import':
                return "L'enregistrement utilisateur à importer n'est pas valide.";
            case 'auth/invalid-provider-data':
                return "Le fournisseur de données n'est pas valide.";
            case 'auth/maximum-user-count-exceeded':
                return "Le nombre maximum d'utilisateurs autorisés à être importés a été dépassé.";
            case 'auth/missing-hash-algorithm':
                return "Il est nécessaire de fournir l'algorithme de génération HASH et ses paramètres pour importer les utilisateurs.";
            case 'auth/missing-uid':
                return "Un identifiant est requis pour l'opération en cours.";
            case 'auth/reserved-claims':
                return "Une ou plusieurs propriétés personnalisées fournies utilisaient des mots réservés.";
            case 'auth/session-cookie-revoked':
                return "La session COOKIE a expiré.";
            case 'auth/uid-alread-exists':
                return "L'identifiant fourni est déjà utilisé.";
            case 'auth/email-already-exists':
                return "L'e-mail fourni est déjà utilisé.";
            case 'auth/phone-number-already-exists':
                return "Le téléphone fourni est déjà utilisé.";
            case 'auth/project-not-found':
                return "Aucun projet n'a été trouvé.";
            case 'auth/insufficient-permission':
                return "Les informations d'identification utilisées ne sont pas autorisées à accéder à la ressource demandée.";
            case 'auth/internal-error':
                return "Le serveur d'authentification a rencontré une erreur inattendue lors de la tentative de traitement de la demande.";
            default:
                return null;
    }
}


export { verifyCode };
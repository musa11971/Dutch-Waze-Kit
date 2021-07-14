// Create DWK helper object
let dwk = {
    version: '1.2',
    logHistory: [],

    features: [
        {
            name: 'Instellingen',
            description: null,
            feature: dwkPreferences,
            hidden: true,
            canBeDisabled: false
        },
        {
            name: 'Kaart openen in BAG',
            description: 'Klik met de rechter muisknop op de kaart, kies "Dutch Waze Kit" -> "Openen in BAG".',
            feature: openInBAG,
            hidden: false,
            canBeDisabled: false
        },
        {
            name: 'Kaart openen in Melvin',
            description: 'Klik met de rechter muisknop op de kaart, kies "Dutch Waze Kit" -> "Openen in Melvin".',
            feature: openInMelvin,
            hidden: false,
            canBeDisabled: false
        },
        {
            name: 'Kaart openen in Ruimtelijke Plannen',
            description: 'Klik met de rechter muisknop op de kaart, kies "Dutch Waze Kit" -> "Openen in Ruimtelijke Plannen".',
            feature: openInRuimtelijkePlannen,
            hidden: false,
            canBeDisabled: false
        },
        {
            name: 'Kaart openen in Satelliet Data Portaal',
            description: 'Klik met de rechter muisknop op de kaart, kies "Dutch Waze Kit" -> "Openen in Satelliet Data Portaal".',
            feature: openInSatellietDataPortaal,
            hidden: false,
            canBeDisabled: false
        },
        {
            name: 'Kaart openen in Google Maps',
            description: 'Klik met de rechter muisknop op de kaart, kies "Dutch Waze Kit" -> "Openen in Google Maps".',
            feature: openInGoogleMaps,
            hidden: false,
            canBeDisabled: false
        },
        {
            name: 'Kaart openen in Mapillary',
            description: 'Klik met de rechter muisknop op de kaart, kies "Dutch Waze Kit" -> "Openen in Mapillary".',
            feature: openInMapillary,
            hidden: false,
            canBeDisabled: false
        },
        {
            name: 'Kaart openen in Wegstatus',
            description: 'Klik met de rechter muisknop op de kaart, kies "Dutch Waze Kit" -> "Openen in Wegstatus".',
            feature: openInWegstatus,
            hidden: false,
            canBeDisabled: false
        },
        {
            name: 'Closure openen in Melvin',
            description: 'Klik op de 3 puntjes bij een closure in de closures tab, kies "Openen in Melvin". Dit werkt alleen als een Melvin ID in de closure titel staat.',
            feature: openClosureInMelvin,
            hidden: false,
            canBeDisabled: false
        },
        {
            name: 'Website en telefoonnummer corrigeren',
            description: 'Klik op de emoji bij het website/telefoonnummer veld van een place. Het formaat van de invoer zal gecorrigeerd worden.',
            feature: moreInfoAddons,
            hidden: false,
            canBeDisabled: false
        },
        {
            name: 'Vaderland logo',
            description: 'Nederlands Waze logo thema (links bovenin).',
            feature: wazeLogoNL,
            hidden: false,
            canBeDisabled: false
        },
        {
            name: 'Adres opzoeken',
            description: 'Klik bij een adres (van een place, segment) op de Google/Maps knop om dit adres snel op te zoeken.',
            feature: lookUpAddress,
            hidden: false,
            canBeDisabled: false
        }
    ],

    // Initialize DWK
    init() {
        dwk.log('DWK v' + this.version + ' started for User-Agent: ' + navigator.userAgent);

        // Register EPSG:28992 (Amersfoort / RD New)
        proj4.defs('EPSG:28992', "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs");
        dwk.log('EPSG:28992 (Amersfoort / RD New) registered.');

        // Initialize every feature
        this.initFeatures();

        this.toast('success', 'Dutch Waze Kit is ingeladen.');
    },

    // Initialize all DWK features
    initFeatures(attempt = 1) {
        // Wait for DOM elements
        if(
            document.getElementById('left-app-head') == null ||
            document.getElementById('map') == null ||
            document.getElementById('sidepanel-prefs') == null
        ) {
            dwk.log('Init features failed for attempt ' + attempt + '. Trying again.');

            setTimeout(() => {
                this.initFeatures(attempt + 1);
            }, 1000);

            return;
        }

        // Initialize all features
        dwk.log('Initializing features at attempt ' + attempt + '!');

        let featureNumber = 1;

        this.features.forEach((feature) => {
            dwk.log('Initializing feature ' + feature.name);
            feature.feature.init();
            dwk.log('Initialized feature ' + feature.name + '!');

            featureNumber++;
        });

        dwk.log('All features initialized.');
    },

    // Returns the current map coordinates in EPSG:4326
    getCurrentMapCoordinates() {
        let permalink = document.getElementsByClassName('permalink')[0].href;

        return {
            y: parseFloat(permalink.match(/lat=([0-9]+\.[0-9]+)/)[1]),
            x: parseFloat(permalink.match(/lon=([0-9]+\.[0-9]+)/)[1])
        };
    },

    // Returns the current Waze map zoom level
    getCurrentMapZoomLevel() {
        let permalink = document.getElementsByClassName('permalink')[0].href;

        return parseInt(permalink.match(/zoom=([0-9])/)[1]);
    },

    // Shows a toast
    toast(type, text) {
        VanillaToasts.create({
            title: 'Dutch Waze Kit',
            text: text,
            timeout: 2500,
            type: type,
            icon: this.getFileURL('img/flag-nl.png')
        });
    },

    // Returns the URL of a file in the extension
    getFileURL(file) {
        if(typeof browser.extension.getURL === 'function')
            return browser.extension.getURL(file);
        else
            return chrome.runtime.getURL(file);
    },

    // Logs a message
    log(message) {
        let now = new Date();
        let timeString = '[' + now.getDay() + '/' + now.getMonth() + '/' + now.getFullYear() + ' @ ' + now.getHours() + ':' + now.getMinutes() + ']';
        this.logHistory.push(timeString + ' ' + message);
    },

    // Copies the given text to clipboard
    copyToClipboard(text) {
        let textArea = document.createElement("textarea");

        // Place in the top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of the white box if rendered for any reason.
        textArea.style.background = 'transparent';

        textArea.value = text;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
    }
};

dwk.init();

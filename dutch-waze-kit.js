// Create DWK helper object
let dwk = {
    // Constants
    version: '1.4',

    zoomLevels: {
        /**
         * min: the minimum zoom level (most zoomed out)
         * max: the maximum zoom level (most zoomed in)
         * amplify: how many levels to boost the result with when this zoom level is converted to
         */
        waze: { min: 12, max: 22, amplify: 0 },
        bag: { min: 0, max: 7, amplify: 2 },
        satellietDataPortaal: { min: 8, max: 18, amplify: 4 },
        googleMaps: { min: 0, max: 20, amplify: 6 },
        mapillary: { min: 0, max: 20, amplify: 6 },
    },

    ////////////
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

        return parseInt(permalink.match(/zoomLevel=([0-9]+)/)[1]);
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
        let textArea = document.createElement('textarea');

        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        textArea.style.width = '2em';
        textArea.style.height = '2em';

        textArea.style.padding = 0;

        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        textArea.style.background = 'transparent';

        textArea.value = text;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            let successful = document.execCommand('copy');
            let msg = successful ? 'successful' : 'unsuccessful';
            console.log('Dutch Waze Kit: Copying text command was ' + msg);
        } catch (err) {
            console.log('Dutch Waze Kit: Oops, unable to copy');
        }

        document.body.removeChild(textArea);
    },

    // Converts a zoom level from one service to another
    convertZoomLevel(level, fromZoomLevel, toZoomLevel) {
        let result = (level - fromZoomLevel.min) * (toZoomLevel.max - toZoomLevel.min) / (fromZoomLevel.max - fromZoomLevel.min) + toZoomLevel.min;

        // Amplify zoom result
        result += toZoomLevel.amplify;

        // Restrict zoom level to the maximum
        if(result > toZoomLevel.max)
            result = toZoomLevel.max;

        dwk.log('Zoomlevel ' + level + ' omgezet van stelsel (' + fromZoomLevel.min + '-' + fromZoomLevel.max + ') naar stelsel (' + toZoomLevel.min + '-' + toZoomLevel.max + ') = ' + result);

        return result;
    }
};

dwk.init();

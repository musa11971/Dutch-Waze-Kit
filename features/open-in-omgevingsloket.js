let openInOmgevingsloket = {
    enabled: true,

    init() {
        browser.runtime.onMessage.addListener((msg) => {
            if (msg.text === 'open-in-omgevingsloket')
                this.openOmgevingsloket();
        });
    },

    openOmgevingsloket() {
        // Transform coordinates
        let transformedCoordinates = proj4('EPSG:4326', 'EPSG:28992', dwk.getCurrentMapCoordinates());

        // Create and open URL
        let url = `https://omgevingswet.overheid.nl/regels-op-de-kaart/viewer/documenten?locatie-stelsel=RD&locatie-x=${transformedCoordinates.x}&locatie-y=${transformedCoordinates.y}`;
        window.open(url, '_blank');
    }
};

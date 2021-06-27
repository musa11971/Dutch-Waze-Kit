let openInGoogleMaps = {
    enabled: true,

    init() {
        browser.runtime.onMessage.addListener((msg) => {
            if (msg.text === 'open-in-google-maps')
                this.openGoogleMaps();
        });
    },

    openGoogleMaps() {
        // Get coordinates
        let coordinates = dwk.getCurrentMapCoordinates();

        // Create and open URL
        let url = 'https://www.google.com/maps/dir/' + coordinates.y + ',' + coordinates.x + '//@'+ coordinates.y + ',' + coordinates.x +',18z/data=!4m5!4m4!1m1!4e2!1m0!3e0!5m1!1e1';
        window.open(url, '_blank');
    }
};

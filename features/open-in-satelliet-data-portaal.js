let openInSatellietDataPortaal = {
    enabled: true,

    init() {
        browser.runtime.onMessage.addListener((msg) => {
            if (msg.text === 'open-in-satelliet-data-portaal')
                this.openSatellietDataPortaal();
        });
    },

    openSatellietDataPortaal() {
        // Get coordinates
        let coordinates = dwk.getCurrentMapCoordinates();

        // Create and open URL
        let url = 'https://www.satellietdataportaal.nl/?base=brtachtergrondkaart&loc=' + coordinates.y + '%2C' + coordinates.x + '%2C18z&overlay=mos-0';
        window.open(url, '_blank');
    }
};

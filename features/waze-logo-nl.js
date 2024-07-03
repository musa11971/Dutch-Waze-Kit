let wazeLogoNL = {
    enabled: true,

    init() {
        let logo = document.querySelector('#waze-logo');

        if(logo === null)
            setTimeout(this.init, 500);

        logo.style.backgroundImage = 'url(' + dwk.getFileURL('img/waze-nl.png') + ')';
    }
};

let moreInfoAddons = {
    enabled: true,

    init() {
        document.addEventListener('click',(e) => {
            if(e.target && e.target.getAttribute('href') === '#venue-edit-more-info') {
                this.addMoreInfoAddons();
            }
        });
    },

    addMoreInfoAddons() {
        let tab = document.getElementById('venue-edit-more-info');

        // The addons are already added
        if(tab.querySelectorAll('.dwk-fix-input-value').length > 0) return;

        // Get the URL input
        let urlInput = tab.querySelector('input[name=url]');
        urlInput.parentElement.style.position = 'relative';

        urlInput.addEventListener('focusout', () => {
            this.reviveAddons();
        });

        // Create the URL input value fix button
        let fixURLButton = document.createElement('button');
        fixURLButton.innerText = (this.isGoodURL(urlInput.value)) ? '😇️️' : '🔧';
        fixURLButton.title = (this.isGoodURL(urlInput.value)) ? 'URL is ok!️' : 'URL corrigeren';
        fixURLButton.className = 'waze-btn waze-btn-smaller waze-btn-white dwk-fix-input-value';
        fixURLButton.addEventListener('click', () => {
            urlInput.value = this.fixURLValue(urlInput.value);
            urlInput.focus();
            urlInput.blur();

            dwk.toast('success', 'URL is gecorrigeerd!');
        });

        urlInput.parentElement.appendChild(fixURLButton);

        // Get the phone input
        let phoneInput = tab.querySelector('input[name=phone]');
        phoneInput.parentElement.style.position = 'relative';

        phoneInput.addEventListener('focusout', () => {
            this.reviveAddons();
        });

        // Create the phone input value fix button
        let fixPhoneButton = document.createElement('button');
        fixPhoneButton.innerText = (this.isGoodPhone(phoneInput.value)) ? '😇️' : '🔧';
        fixPhoneButton.title = (this.isGoodPhone(phoneInput.value)) ? 'Tel. nr. is ok!' : 'Tel. nr. corrigeren';
        fixPhoneButton.className = 'waze-btn waze-btn-smaller waze-btn-white dwk-fix-input-value';
        fixPhoneButton.addEventListener('click', () => {
            phoneInput.value = this.fixPhoneValue(phoneInput.value);
            phoneInput.focus();
            phoneInput.blur();

            dwk.toast('success', 'Tel. nr. is gecorrigeerd!');
        });

        phoneInput.parentElement.appendChild(fixPhoneButton);
    },

    reviveAddons() {
        setTimeout(() => {
            this.addMoreInfoAddons();
        }, 200);
    },

    // Fixes a URL according to https://wazeopedia.waze.com/wiki/Netherlands/Places/nl
    fixURLValue(value) {
        if(value.length === 0)
            return value;

        // Remove trailing slash
        value = value.replace(/\/$/, '');

        // Remove protocol (https://)
        value = value.replace(/(^\w+:|^)\/\//, '');

        // Add www.
        if(!value.startsWith('www.'))
            value = 'www.' + value;

        return value;
    },

    // Checks whether the given value is a good URL
    isGoodURL(value) {
        return value === this.fixURLValue(value);
    },

    // Fixes a phone number according to https://wazeopedia.waze.com/wiki/Netherlands/Places/nl
    fixPhoneValue(value) {
        if(value.length === 0)
            return value;

        // Remove spaces
        value = value.replace(/\s/g, '');

        // Remove brackets
        value = value.replace('(', '');
        value = value.replace(')', '');

        // Remove dashes
        value = value.replace('-', '');

        // 0900 and 0800 numbers cannot be dialled internationally
        if(value.startsWith('0900') || value.startsWith('0800'))
            return value;

        // Remove start 0
        if(value.startsWith('0'))
            value = value.substring(1);

        // Add country code
        if(!value.startsWith('+31'))
            value = '+31' + value;

        return value;
    },

    // Checks whether the given value is a good phone number
    isGoodPhone(value) {
        return value === this.fixPhoneValue(value);
    }
};

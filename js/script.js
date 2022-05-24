const QR = document.getElementById('qr-code');
const SPINNER = document.getElementById('spinner');
let form = document.getElementById('generate-form');
let bannerImg = document.getElementById('qr-img');
const onGenerateQR = (e) => {
    e.preventDefault();

    clearUI();

    const url = form.elements.url.value;
    const size = form.elements.size.value;

    console.log(url, size);

    // validate url
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    bannerImg.style.display = 'none';
    showSpinner();
    setTimeout(() => {
        hideSpinner();

        generateQRCode(url, size);
        setTimeout(() => {
            const saveUrl = QR.querySelector('img').src;
            createSaveBtn(saveUrl);
        }, 50);
    }, 900);
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode(QR, {
        text: url,
        width: size,
        height: size,
        // colorDark: '#839f79',
        // colorLight: '#f6f6f6',
    });
};

const showSpinner = () => {
    SPINNER.style.display = 'block';
};

const hideSpinner = () => {
    SPINNER.style.display = 'none';
};

const clearUI = () => {
    QR.innerHTML = '';
    bannerImg.style.display = 'block';
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.remove();
    }
};

const createSaveBtn = (saveUrl) => {
    const btn = document.createElement('a');
    btn.href = saveUrl;
    btn.download = 'qr-code';
    btn.id = 'save-btn';
    btn.innerHTML = 'Save QR Code';
    btn.classList =
        'bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 rounded w-2/3 m-auto my-5';
    document.getElementById('generated').appendChild(btn);
};
form.addEventListener('submit', onGenerateQR);

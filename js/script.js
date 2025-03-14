window.generateRpt = (element, text) => element.href = text;

function OpenPage(url) {
    window.open(url, '_blank').focus();
}

function DownloadPdf(filename, byteBase64) {
    var link = document.createElement('a');
    link.download = filename;
    link.href = "data:application/octet-stream;base64," + byteBase64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function ViewPdf(iframeId, byteBase64) {
    document.getElementById(iframeId).innerHTML = "";
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute("src", "data:application/pdf;base64," + byteBase64);
    ifrm.style.width = "100%";
    ifrm.style.height = "680px";
    document.getElementById(iframeId).appendChild(ifrm);
}

function DownloadPhoto(filename, contentType, byteBase64) {
    var link = document.createElement('a');
    link.download = filename;
    link.href = "data:" + contentType + ";base64," + byteBase64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function ViewPhoto(iframeId, contentType, byteBase64) {
    document.getElementById(iframeId).innerHTML = "";
    var ifrm = document.createElement('iframe');
    const blob = new Blob([byteArray], { type: contentType });
    const url = URL.createObjectURL(blob);
    ifrm.setAttribute("src", url);
    ifrm.style.width = "100%";
    ifrm.style.height = "680px";
    document.getElementById(iframeId).appendChild(ifrm);
}

function DownloadExcelFile(filename, byteBase64) {
    var link = document.createElement('a');
    link.download = filename;
    link.href = "data:application/vnd.openxmlformats-pfficedocument.spreadsheetml.sheet;base64," + byteBase64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function DownloadTxtFile(fileName, byteArray) {
    // Convert the byte array to a Blob object
    var blob = new Blob([byteArray], { type: "text/plain" });

    // Create a temporary anchor element to trigger the download
    var anchor = document.createElement("a");
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = fileName;

    // Trigger the download and remove the anchor element
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
}

function DownloadZipFile(filename, data) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;base64,' + data);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


//window.printPdf = function (pdfBytes) {
//    const uint8Array = new Uint8Array(pdfBytes);
//    const blob = new Blob([uint8Array], { type: 'application/pdf' });
//    const url = URL.createObjectURL(blob);

//    // Create an invisible iframe to print the PDF
//    const iframe = document.createElement('iframe');
//    iframe.style.display = 'none';
//    iframe.src = url;
//    document.body.appendChild(iframe);

//    iframe.onload = function () {
//        iframe.contentWindow.print();
//    };
//};

function printPdfFromByteArray(iframeId) {
    document.getElementById(iframeId).contentWindow.print();
}

function PrintInvoice (pdfBytes) {
    const uint8Array = new Uint8Array(pdfBytes);
    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Create an invisible iframe to print the PDF
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = function () {
        iframe.contentWindow.print();
    };
};

function PrintPdf(iframeId, byteBase64) {
    document.getElementById(iframeId).innerHTML = "";
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute("src", "data:application/pdf;base64," + byteBase64);
    ifrm.style.width = "100%";
    ifrm.style.height = "680px";
    document.getElementById(iframeId).appendChild(ifrm);
}

function startVideo(src) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            let video = document.getElementById(src);
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function (e) {
                video.play();
            };
            //mirror image
            video.style.webkitTransform = "scaleX(-1)";
            video.style.transform = "scaleX(-1)";
        });
    }
}

function getFrame(src, dest, dotNetHelper) {
    let video = document.getElementById(src);
    let canvas = document.getElementById(dest);
    canvas.getContext('2d').drawImage(video, 0, 0, 320, 240);

    let dataUrl = canvas.toDataURL("image/jpeg");
    dotNetHelper.invokeMethodAsync('ProcessImage', dataUrl);
}
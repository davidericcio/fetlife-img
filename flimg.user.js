// ==UserScript==

// @name          Replace Fetlife fake img spans into real imgs
// @namespace     https://github.com/davidericcio/fetlife-img
// @description   Make it easy to do Google image searches on Fetlife images
// @include       https://fetlife.com/*/pictures/*

// ==/UserScript==


window.onload = function(event) {
    // The element is contained in a <span class="fake_img">
    var spans = document.getElementsByClassName("fake_img");
    var span = spans[0];
    // The span has the CSS background-image property set
    // in a <style> block.
    var bgStyle = getComputedStyle(span).backgroundImage;
    // CSS background-image is formatted like:
    // "url(http://actual-url-to-image-source/)
    var url = bgStyle.slice(4, -1);

    // Now we replace the span with an img
    var img = document.createElement("img");
    // Copy all attributes because we are lazy
    // Note that .fake_img also defines width & height
    for (var i = 0; i < span.attributes.length; i++) {
        img.setAttribute(span.attributes[i].name,
                         span.attributes[i].value)
    }
    img.src = url;
    // Override styles coming from .fake_img and img
    img.style.backgroundImage = "none";
    img.style.padding = "0";
    img.style.margin = "0";
    // BAM, replace it.
    span.parentNode.replaceChild(img, span);
}

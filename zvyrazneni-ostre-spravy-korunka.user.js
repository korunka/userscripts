// ==UserScript==
// @name     Zvýraznění ostré správy Loterie Korunka
// @version  1.1
// @author   Ondra Hlaváč <ondrej.hlavac@korunka.eu>
// @grant    none
// @include  https://sprava.korunka.eu/*
// ==/UserScript==


// pomocná funkce na přidávání css stylů do hlavičky stránky
function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	if (!head) {
		return;
	}
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}



// základní nastavení borderu
addCss('div#header-wrapper{border-top: 10px solid rgba(99,29,118,1); border-bottom: 10px solid rgba(99,29,118,1)}');



// příprava červené animace
addCss('@keyframes redblink { 50% { border-color:#e70000; } }');



// přiřazení animace k hlavičce zobrazované stránky
addCss('div#header-wrapper{ animation: redblink .5s step-end infinite alternate; }');
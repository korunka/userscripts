// ==UserScript==
// @name     Vkládání odkazu na commit ve Flyspray
// @version  1
// @author   Ondra Hlaváč <ondrej.hlavac@korunka.eu>
// @grant    none
// @include  https://flyspray.dev2.korunka.eu/*
// ==/UserScript==


document.addEventListener('paste', (e) => {
  // Get the clipboard data
  let paste = (e.clipboardData || window.clipboardData).getData('text');

  // Zkontrolujeme zda chceme reagovat
  var commitExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&;\//=]*)h=([a-z0-9]+)/;
  var commitRegex = new RegExp(commitExpression);
  var commitMatch = paste.match(commitRegex);
  var urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&;\//=]*)/g;
  var urlRegex = new RegExp(urlExpression);
  var urlMatch = paste.match(urlRegex);

  // Pokračujeme pouze pokud máme nález a jsme na textarea
  if ((!commitMatch && !urlMatch) || e.target.type != 'textarea') {
    return;
  }

  // Prevent the default pasting event and stop bubbling
  e.preventDefault();
  e.stopPropagation();

  if (commitMatch) {
    let hash = commitMatch[3];
    let odkaz = commitMatch[0];
    paste = paste.replace(commitExpression, '\n**Commit:** [[' + odkaz + '|' + hash + ']]\n');
  } else if (urlMatch) {
    urlMatch.forEach((match) => {
      paste = paste.replace(match, '[[' + match + ']]');
    });
  }

  let start = 0, end = 0;
  if (e.target.selectionStart || e.target.selectionStart == '0') {
		start = e.target.selectionStart;
    end = e.target.selectionEnd;
	}

  let preSelection = e.target.value.slice(0, start);
  let postSelection = e.target.value.slice(end);

  e.target.value = preSelection + paste + postSelection;
});
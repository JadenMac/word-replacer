
chrome.storage.sync.get({
    phrasesArray: [] 
  }, function(items) {
    replaceAllPhrases(items.phrasesArray);
  });

  function replaceAllPhrases(phrasesArray) {
    phrasesArray.forEach(replacePhrase);

  }

  function replacePhrase(phraseObj) {
    let possibleElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, a, span, title, blockquote');
    for (let i = 0; i < possibleElements.length; i++) {
        if (possibleElements[i].innerText && (possibleElements[i].innerText.toLowerCase().includes(phraseObj.targetPhrase.toLowerCase()))) {
            if (phraseObj.actionToTake === 'blur') {
                if (phraseObj.entirePara) {
                    possibleElements[i].style.color = 'transparent';
                    possibleElements[i].style.textShadow = '0 0 8px #000';
                }
                else {
                let regExpression = new RegExp('(?![^<]+>)' + phraseObj.targetPhrase, 'gi');
                possibleElements[i].innerHTML = possibleElements[i].innerHTML.replace(regExpression, ' <span class="blur-text">' + phraseObj.targetPhrase + '</span> ');
                }
            }
            else if (phraseObj.actionToTake === 'replace') {
                let regExpression = new RegExp('(?![^<]+>)' + phraseObj.targetPhrase, 'gi');
                if (phraseObj.entirePara) {
                regExpression = new RegExp(possibleElements[i].innerHTML);
                }
                possibleElements[i].innerHTML = possibleElements[i].innerHTML.replace(regExpression, phraseObj.replaceWith);
            }
        }
    }
  }




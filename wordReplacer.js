
chrome.storage.sync.get({
    phrasesArray: [] 
  }, function(items) {
    replaceAllPhrases(items.phrasesArray);
  });

  function replaceAllPhrases(phrasesArray) {
    phrasesArray.forEach(replacePhrase);

  }

  function replacePhrase(phraseObj) {
    console.log('replacePhrase');
    let possibleElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, article, a, div, span, title, blockquote');
    for (let i = 0; i < possibleElements.length; i++) {
        if (possibleElements[i].innerText.toLowerCase().includes(phraseObj.targetPhrase.toLowerCase())) {
            console.log('includes target phrase');
            if (phraseObj.actionToTake === 'blur') {
                console.log('blur');
                let regExpression = new RegExp('(?![^<]+>)' + phraseObj.targetPhrase, 'gi');
                if (phraseObj.entirePara) {
                regExpression = new RegExp(possibleElements[i].innerHTML);
                }
                possibleElements[i].innerHTML = possibleElements[i].innerHTML.replace(regExpression, ' <span class="blur-span">' + phraseObj.targetPhrase + '</span> ');
            }
            else if (phraseObj.actionToTake === 'replace') {
                console.log('replace');
                let regExpression = new RegExp('(?![^<]+>)' + phraseObj.targetPhrase, 'gi');
                if (phraseObj.entirePara) {
                regExpression = new RegExp(possibleElements[i].innerHTML);
                }
                possibleElements[i].innerHTML = possibleElements[i].innerHTML.replace(regExpression, phraseObj.replaceWith);
            }
        }
    }
  }




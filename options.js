const phrasesContainer = document.getElementById('phrases-container');



// Saves options to chrome.storage
function save_options() {

    
    let phraseDivs = document.querySelectorAll('.phrase-item');
    let phraseDivsIds = [];
    let phraseObjArray = [];

    //sets ids for each phrase div
    for (let i=0; i<phraseDivs.length; i++) {
        let id = Date.now() + i;
        phraseDivs[i].setAttribute('id', id);
        phraseDivsIds.push(id);
    }
    
    for (let i=0; i<phraseDivsIds.length; i++) {
        phraseObjArray.push(createPhraseObject(phraseDivsIds[i]));
    }

    //creates and retrurns an object storing the options for the phrase with the given id
    function createPhraseObject(phraseDivId) {
        const phraseDiv = document.getElementById(phraseDivId);
        let targetPhrase = phraseDiv.querySelector('.target-phrase').value;
        let entirePara = phraseDiv.querySelector('.entire-paragraph').checked;
        let replaceWith = phraseDiv.querySelector('.replace-with').value;
        let actionToTake = phraseDiv.querySelector('.actions').value;
        let phraseObj = {targetPhrase : targetPhrase, 
                      entirePara: entirePara,
                      replaceWith: replaceWith,
                      actionToTake: actionToTake,
                        phraseDivId: phraseDivId,}
        return phraseObj;
    }
    

  chrome.storage.sync.set({
    
    phrasesArray: phraseObjArray,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  console.log('saved');
}

// Restores the options state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = []
  chrome.storage.sync.get({
    phrasesArray: [] 
  }, function(items) {
    displayOpt(items.phrasesArray);
  });
}

//sets up the options display with the correct phrase divs
function displayOpt(items) {
    if (items.length > 0) {
    //setting up the first div that is already present from the html
    const firstDiv = document.querySelector('.phrase-item');
    let item = items[0];
    firstDiv.setAttribute('id', item.phraseDivId)
    firstDiv.querySelector('.target-phrase').value = item.targetPhrase;
    firstDiv.querySelector('.entire-paragraph').checked = item.entirePara;
    firstDiv.querySelector('.replace-with').value = item.replaceWith;
    firstDiv.querySelector('.actions').value = item.actionToTake;


    //creating and setting up the rest of the divs
    for (let i = 1; i < items.length; i++) {
        let newDiv = addNewPhraseItem();
        item = items[i];
        newDiv.setAttribute('id', item.phraseDivId)
        newDiv.querySelector('.target-phrase').value = item.targetPhrase;
        newDiv.querySelector('.entire-paragraph').checked = item.entirePara;
        newDiv.querySelector('.replace-with').value = item.replaceWith;
        newDiv.querySelector('.actions').value = item.actionToTake;
    }
}
}

//adds and returns a new row of options for a target phrase in the container
function addNewPhraseItem() {
    const newRow = document.querySelector('.phrase-item').cloneNode(true);
    phrasesContainer.appendChild(newRow);
    return newRow;
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('add-phrase').addEventListener('click', addNewPhraseItem)
    
Word Replacer

This project is a Chrome extension for either replacing or blurring text content based on user inputted words and phrases.

Phrases can be added and saved via the options page. Users can enter a word or phrase in the input box and then select whether they would like the phrase to be blurred or replaced with whatever they input in the second text box. Once these options are saved, the extension will blur or replace any instances of the saved phrases being displayed on a webpage. There is also another option on the drop down menu for removing the phrase from the saved options. If the user clicks the checkbox, the entire paragraph or whatever the phrase is contained in, rather than just the phrase itself, will be blurred or replaced with the specified phrase. 

One area that turned out to be a bit less obvious than anticipated was figuring out how to use the string replace method to replace html text content particularly when blurring a phrase. Using replace with the target string and the string to replace it with was not sufficient for the intended use. Using a regular expression pattern allowed the use of global and cases insensitive flags. It was also very useful for making sure that the text being replaced was not a part of the html that should not be replaced, like links. Blurring phrases was done by replacing the phrase with a span containing the phrase and then applying a new class to that span which blurs the text using the text-shadow CSS property.
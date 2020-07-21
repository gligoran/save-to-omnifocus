ZIP_FILE = saveToOmniFocus.zip
EXTENSION_FILES = background.js browser-action.png icon128.png icon16.png manifest.json tabInfo.js

$(ZIP_FILE): $(EXTENSION_FILES)
	rm -f $(ZIP_FILE)
	zip $(ZIP_FILE) $(EXTENSION_FILES)

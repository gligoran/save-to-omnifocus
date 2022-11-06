# Save to OmniFocus

Chrome extension that add a toolbar button and a context menu action to save a link to the current tab to OmniFocus.

## "A website wants to open this application" popup

When using the extension you might get this popup:

![Open OmniFocus Popup](open-omnifocus-popup.png)

[That's a known issue.](https://superuser.com/questions/1492714/chrome-prompting-for-custom-protocol-handlers-every-time-after-update) There used to be a checkbox on that popup that allowed Chrome to remember your choice, but it was removed with Chrome 77.

A way to make that popup go away is by adding the `omnifocus://` protocol to the [`URLAllowlist`](https://chromeenterprise.google/policies/#URLAllowlist) via this command:

```
defaults write com.google.Chrome URLAllowlist -array-add 'omnifocus://*'
```

Once added it will show up in `chrome://policy/`.

For Brave browser, use this command:

```
defaults write com.brave.Browser URLAllowlist -array-add 'omnifocus://*'
```
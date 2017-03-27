# Tweetdeck Desktop

> Unofficial tweetdeck Desktop app

*Linux are supported.*

## Install

### Linux

[**Download**](https://github.com/mikebell/tweetdeck-desktop/releases/latest) and unzip to some location.

To add a shortcut to the app, create a file in `~/.local/share/applications` called `tweetdeck.desktop` with the following contents:

```
[Desktop Entry]
Name=tweetdeck
Exec=/full/path/to/folder/Tweetdeck/Tweetdeck
Terminal=false
Type=Application
Icon=/full/path/to/folder/Tweetdeck/resources/app/static/Icon.png
```

## Dev

Built with [Electron](http://electron.atom.io).

###### Commands

- Init: `$ npm install`
- Run: `$ npm start`
- Build Linux: `$ npm run build:linux`
- Build Windows: `$ npm run build:windows`

## License

Icon from https://www.iconfinder.com/icons/173887/tweetdeck_icon CC BY-NC-ND 3.0

MIT © [Daniel Chatfield](http://danielchatfield.com)

# Tweetdeck Desktop

> Unofficial tweetdeck Desktop app

*OS X 10.8+, Windows 7+ & Linux are supported.*

## Install

### OS X

[**Download**](https://github.com/mikebell/tweetdeck-desktop/releases/latest), unzip, and move `tweetdeck.app` to the `/Applications` directory.

### Linux

[**Download**](https://github.com/mikebell/tweetdeck-desktop/releases/latest) and unzip to some location.

To add a shortcut to the app, create a file in `~/.local/share/applications` called `tweetdeck.desktop` with the following contents:

```
[Desktop Entry]
Name=tweetdeck
Exec=/full/path/to/folder/tweetdeck
Terminal=false
Type=Application
Icon=/full/path/to/folder/tweetdeck/resources/app/static/Icon.png
```

### Windows

[**Download**](https://github.com/mikebell/tweetdeck-desktop/releases/latest) and unzip to some location.


## Dev

Built with [Electron](http://electron.atom.io).

###### Commands

- Init: `$ npm install`
- Run: `$ npm start`
- Build OS X: `$ npm run build:macos`
- Build Linux: `$ npm run build:linux`
- Build Windows: `$ npm run build:windows`
- Build all: `$ brew install wine` and `$ npm run build` *(OS X only)*

## License

MIT © [Mike Bell](http://mikebell.io)

[![Licence](https://img.shields.io/github/license/lochbrunner/vscode-generic-binary-preview.svg)](https://github.com/lochbrunner/vscode-generic-binary-preview)
[![VS Code Marketplace](https://vsmarketplacebadge.apphb.com/version-short/lochbrunner.vscode-generic-binary-preview.svg)
![Rating](https://vsmarketplacebadge.apphb.com/rating-short/lochbrunner.vscode-generic-binary-preview.svg)
![Downloads](https://vsmarketplacebadge.apphb.com/downloads-short/lochbrunner.vscode-generic-binary-preview.svg) 
![Installs](https://vsmarketplacebadge.apphb.com/installs-short/lochbrunner.vscode-generic-binary-preview.svg)](https://marketplace.visualstudio.com/items?itemName=lochbrunner.vscode-generic-binary-preview)

# Generic Binary Preview

With this extension you can create a binary web preview for vscode with ease in any programing language.

![Demo](https://github.com/lochbrunner/vscode-generic-binary-preview/raw/master/assets/demo.gif)

Open binary files and displays information generated from an external executable.

## Configuration

Before you can use this extension you have to provide an executable which can generate a html representation of specific files.
This executable will be called with the filename of the file the user want to see the preview.

It is expected that this executable prints html code on stdout.
If the filetype is not supported it should exit with a non zero exit code.
See [abc-preview.py](https://github.com/lochbrunner/vscode-generic-binary-preview/blob/master/example/abc-preview.py) as an example.

This extension is highly inspired by [Linux Binary Preview](https://github.com/betwo/vscode-linux-binary-preview). 
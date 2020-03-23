# Generic Binary Preview

Open binary files and displays information generated from an external executable.

## Configuration

Before you can use this extension you have to provide an executable which can generate a html representation of specific files.
This executable will be called with the filename of the file the user want to see the preview.
It is expected that this executable prints html code on stdout.
If the filetype is not supported it should exit with a non 0 exit code.

This extension is highly inspired by [Linux Binary Preview](https://github.com/betwo/vscode-linux-binary-preview). 
import * as child_process from 'child_process';
import * as vscode from 'vscode';

function template(content) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generic Binary Viewer</title>
    </head>
    <body>
    ${content}
    <script>
        openResource = function (vscode, uri) {
            vscode.postMessage({
                command: 'showBinary',
                text: uri 
            });
        };
        (function() {
            const vscode = acquireVsCodeApi();
            const links = document.getElementsByTagName('a');
            for (let i = 0; i < links.length; i++) {
                const link = links[i];
                link.onclick = function() { openResource(vscode, link.href); };
            }
        }())
        </script>
    </body>
  </html>`;
}

export default async function getHtml(uri: vscode.Uri):
    Promise<string|undefined> {
  let config =
      vscode.workspace.getConfiguration('vscode-generic-binary-preview');


  const command = config['command'];

  let options: child_process.ExecOptionsWithStringEncoding = {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 1024
  };

  return new Promise(
      (resolve, reject) => {child_process.exec(
          `${command} ${uri.fsPath.toString()}`, options,
          (err, std_out, std_err) => {
            if (err) {
              reject(err);
              return;
            }

            resolve(template(std_out));
          })});
}
import * as fs from 'fs';
import * as vscode from 'vscode';

import getHtml from './content_provider';

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

export async function openTextDocument(
    document: vscode.TextDocument, context: vscode.ExtensionContext) {
  if (document === undefined) {
    if (vscode.window.activeTextEditor !== undefined) {
      document = vscode.window.activeTextEditor.document;
    }
  }
  if (document === undefined) {
    vscode.window.showWarningMessage(
        'Cannot show binary information, no document is opened.');
    return;
  }
  openBinaryFilePreview(document.uri, context);
}

export async function openDialog(
    uri: vscode.Uri, context: vscode.ExtensionContext) {
  let panel = vscode.window.createWebviewPanel(
      'binary viewer', uri.fsPath.toString(), vscode.ViewColumn.Active,
      {enableScripts: true, enableFindWidget: true});

  panel.webview.onDidReceiveMessage(message => {
    switch (message.command) {
      case 'showBinary':
        openBinaryFilePreview(vscode.Uri.parse(message.text), context);
        return;
    }
  }, undefined, context.subscriptions);
}

export async function openBinaryFilePreview(
    uri: vscode.Uri, context: vscode.ExtensionContext) {
  try {
    const html = await getHtml(uri);
    let panel = vscode.window.createWebviewPanel(
        'binary viewer', uri.fsPath.toString(), vscode.ViewColumn.Active,
        {enableScripts: true, enableFindWidget: true});

    panel.webview.onDidReceiveMessage(message => {
      switch (message.command) {
        case 'showBinary':
          openBinaryFilePreview(vscode.Uri.parse(message.text), context);
          return;
      }
    }, undefined, context.subscriptions);
    panel.webview.html = html;
  } catch (err) {
  }
}

export function activate(context: vscode.ExtensionContext) {
  const openCommand = vscode.commands.registerCommand(
      'generic-binary-preview.openCurrentFile',
      (thisArg: any, ...args: any[]) => {
        openTextDocument(args[0], context);
      });

  const openEvent = vscode.workspace.onDidOpenTextDocument(
      (document: vscode.TextDocument) => {
        openTextDocument(document, context);
      });

  for (let document of vscode.workspace.textDocuments) {
    openTextDocument(document, context);
  }

  context.subscriptions.push(openCommand, openEvent);
}

export function deactivate() {}

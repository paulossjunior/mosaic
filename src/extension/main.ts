import * as vscode from 'vscode';
import * as path from 'node:path';
import {
    LanguageClient, LanguageClientOptions, ServerOptions, TransportKind
} from 'vscode-languageclient/node.js';


import { generateAction } from '../cli/main.js';
let client: LanguageClient;

function registerGeneratorCommand(context: vscode.ExtensionContext): void {
   
    const callback = ()=>{
        //Pega o nome do arquivo aberto no vscode
        const filepath = vscode.window.activeTextEditor?.document.fileName
   
        if(filepath) {
            //Aplicar o gerador sobre o arquivo
            generateAction(filepath,{}).catch((reason) => vscode.window.showErrorMessage(reason.message))
            vscode.window.showInformationMessage("Code generated successfully!")
        }
    }

    context.subscriptions.push(vscode.commands.registerCommand("mosaic.generate",callback));
        
}

// This function is called when the extension is activated.
export function activate(context: vscode.ExtensionContext): void {
    registerGeneratorCommand(context);
    client = startLanguageClient(context);
}


// This function is called when the extension is deactivated.
export function deactivate(): Thenable<void> | undefined {
    if (client) {
        return client.stop();
    }
    return undefined;
}

function startLanguageClient(context: vscode.ExtensionContext): LanguageClient {
    const serverModule = context.asAbsolutePath(path.join('out', 'language', 'main.cjs'));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging.
    // By setting `process.env.DEBUG_BREAK` to a truthy value, the language server will wait until a debugger is attached.
    const debugOptions = { execArgv: ['--nolazy', `--inspect${process.env.DEBUG_BREAK ? '-brk' : ''}=${process.env.DEBUG_SOCKET || '6009'}`] };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
    };

    const fileSystemWatcher = vscode.workspace.createFileSystemWatcher('**/*.mosaic');
    context.subscriptions.push(fileSystemWatcher);

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'mosaic' }],
        synchronize: {
            // Notify the server about file changes to files contained in the workspace
            fileEvents: fileSystemWatcher
        }
    };

    // Create the language client and start the client.
    const client = new LanguageClient(
        'mosaic',
        'Mosaic',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
    return client;
}

import { EditorProps } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

export interface CodeEditorProps extends Omit<EditorProps, 'onChange'> {
    runCodeFn?: (
        editor: monacoEditor.editor.IStandaloneCodeEditor | undefined
    ) => void;
    searchCodeFn?: (
        editor: monacoEditor.editor.IStandaloneCodeEditor | undefined
    ) => void;
    copyFn?: () => Promise<void>;
    resolvedFn?: () => Promise<void>;
    title?: string | JSX.Element;
    hiddenBar?: boolean;
    onChange?: (
        value?: string,
        editor?: monacoEditor.editor.IStandaloneCodeEditor
    ) => void;
    isResolved?: boolean;
    isRunning?: boolean;
}

export interface LangMappingProps {
    [lang: string]: {
        language: string;
        idhLang?: {
            id: string;
            tokensProvider: monacoEditor.languages.IMonarchLanguage;
            configuration: monacoEditor.languages.LanguageConfiguration;
        };
        theme?: {
            id: string;
            config: monaco.editor.IStandaloneThemeData;
        };
    };
}

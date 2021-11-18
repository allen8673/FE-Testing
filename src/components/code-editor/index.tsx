import {
    CopyOutlined,
    SearchOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MonacoEditorReact, {
    BeforeMount,
    Monaco,
    OnMount,
} from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { useState } from 'react';
import { useEffect } from 'react';

import IconButton from '../icon-button';

import langMapping from './lang-mapping';
import './code-editor.scss';
import { CodeEditorProps } from './type';

const CodeEditor = ({
    runCodeFn,
    searchCodeFn,
    copyFn,
    resolvedFn,
    title,
    language = '',
    hiddenBar,
    onChange,
    isResolved = false,
    options,
    isRunning,
    ...props
}: CodeEditorProps): JSX.Element => {
    const idh_lang = langMapping[language];
    const [resolvedLoading, setResolvedLoading] = useState<boolean>(false);
    const [copyLoading, setCopyLoading] = useState<boolean>(false);

    const [
        editor,
        setEditor,
    ] = useState<monacoEditor.editor.IStandaloneCodeEditor>();

    const handleEditorOnMount: OnMount = (
        editor: monacoEditor.editor.IStandaloneCodeEditor,
        monaco: Monaco
    ): void => {
        setEditor(editor);
    };

    const handleBeforeMount: BeforeMount = (monaco: Monaco): void => {
        if (!!idh_lang?.theme) {
            monaco.editor.defineTheme(idh_lang.theme.id, idh_lang.theme.config);
        }

        if (!!idh_lang?.idhLang) {
            monaco.languages.register({ id: idh_lang.idhLang.id });
            monaco.languages.setMonarchTokensProvider(
                idh_lang.idhLang.id,
                idh_lang.idhLang.tokensProvider
            );
            monaco.languages.setLanguageConfiguration(
                idh_lang.idhLang.id,
                idh_lang.idhLang.configuration
            );
        }
    };

    useEffect(() => {
        editor?.updateOptions({ readOnly: options?.readOnly });
    }, [options?.readOnly]);

    return (
        <div id="code-editor">
            {!hiddenBar && (
                <div id="fn-bar">
                    <span className="title">{title}</span>
                    {runCodeFn && (
                        <IconButton
                            onClick={(): void => runCodeFn(editor)}
                            style={{ width: 'auto', padding: '0 7px' }}
                            isDark
                            disabled={!!isRunning}
                            icon={(): JSX.Element => (
                                <>
                                    {!!isRunning ? (
                                        <LoadingOutlined
                                            style={{
                                                color: 'rgb(64, 169, 255)',
                                            }}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faPlay}
                                            style={{
                                                fontSize: '11px',
                                                color: '#00bf9a',
                                            }}
                                        />
                                    )}
                                    <span
                                        style={{
                                            marginLeft: '7px',
                                            marginBottom: '1px',
                                        }}
                                    >
                                        Run Section
                                    </span>
                                </>
                            )}
                            title={'Run Section'}
                        />
                    )}
                    {copyFn && (
                        <>
                            {!!copyLoading ? (
                                <IconButton
                                    title="loading..."
                                    isDark
                                    icon={LoadingOutlined}
                                    iconProps={{
                                        style: { color: 'rgb(64, 169, 255)' },
                                    }}
                                />
                            ) : (
                                <IconButton
                                    isDark
                                    title="Copy Section"
                                    icon={CopyOutlined}
                                    onClick={async (): Promise<void> => {
                                        setCopyLoading(true);
                                        await copyFn();
                                        setCopyLoading(false);
                                    }}
                                />
                            )}
                        </>
                    )}
                    {searchCodeFn && (
                        <IconButton
                            isDark
                            title="Search Section"
                            icon={SearchOutlined}
                            onClick={(): void => searchCodeFn(editor)}
                        />
                    )}
                    {resolvedFn && (
                        <>
                            {!!resolvedLoading ? (
                                <IconButton
                                    title="loading..."
                                    isDark
                                    icon={LoadingOutlined}
                                    iconProps={{
                                        style: { color: 'rgb(64, 169, 255)' },
                                    }}
                                />
                            ) : !!isResolved ? (
                                <div
                                    className="icon-button dark"
                                    style={{
                                        width: 'auto',
                                        padding: '0 7px',
                                        color: 'rgb(64, 169, 255)',
                                    }}
                                    onClick={async (): Promise<void> => {
                                        setResolvedLoading(true);
                                        await resolvedFn();
                                        setResolvedLoading(false);
                                    }}
                                >
                                    <EyeOutlined
                                        style={{ marginRight: '5px' }}
                                    />
                                    <span
                                        className="label"
                                        style={{ marginBottom: '1px' }}
                                    >
                                        Resolved read-only view
                                    </span>
                                </div>
                            ) : (
                                <IconButton
                                    isDark
                                    title="Resolve variables"
                                    icon={EyeInvisibleOutlined}
                                    onClick={async (): Promise<void> => {
                                        setResolvedLoading(true);
                                        await resolvedFn();
                                        setResolvedLoading(false);
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>
            )}
            <div className="editor-content">
                <div className="editor">
                    <MonacoEditorReact
                        options={{
                            automaticLayout: true,
                            minimap: { enabled: true },
                            ...options,
                        }}
                        {...props}
                        beforeMount={(monaco: Monaco): void => {
                            handleBeforeMount(monaco);
                            if (props.beforeMount) props.beforeMount(monaco);
                        }}
                        onMount={(
                            editor: monacoEditor.editor.IStandaloneCodeEditor,
                            monaco: Monaco
                        ): void => {
                            handleEditorOnMount(editor, monaco);
                            if (props.onMount) props.onMount(editor, monaco);
                        }}
                        theme={idh_lang?.theme?.id}
                        language={idh_lang?.language || language}
                        onChange={(val): void => {
                            if (!onChange) return;
                            onChange(val, editor);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;

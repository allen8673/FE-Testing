import './main-window.scss'
import WindowManager from "../../components/window-manager";
import { DEFAULT_WINDOW_MAP } from "../../utils/default-window-map";
import SectionEditor from "../section-editor";
import SectionList from "../section-list";
import TopBar from "../top-bar";
import { Tabs } from 'antd';
import { CodeOutlined, EditOutlined } from '@ant-design/icons'
import MdEditor from '../../components/md-editor/inedx';
import CodeEditor from '../../components/code-editor';
const { TabPane } = Tabs;

const MainWindow = (): JSX.Element => {
    return (
        <div id='main-window'>
            <TopBar />
            <div className='content'>
                <Tabs tabPosition='left'
                    defaultActiveKey="0"
                    type="card"
                    style={{ height: '100%', width: '100%' }}>
                    <TabPane tab={<CodeOutlined />} key="1">
                        <CodeEditor
                            // options={{ readOnly: !activeTab?.onEdit }}
                            language={
                                'sql'
                            }
                            value={'code'}
                            // onMount={(editor: editor.IStandaloneCodeEditor): void => {
                            //     editorRef?.setEditor(editor);
                            // }}
                            // searchCodeFn={searchCodeFn}
                            // copyFn={copySection}
                            // runCodeFn={runSection}
                            // resolvedFn={resolvedSection}
                            // isResolved={isResolved}
                            // isRunning={!!activeTab?.socketState.isRunning}
                            // title={
                            //     <span className="branch-btn">
                            //         <BranchSelectorContainer
                            //             activeBranch={'master'}
                            //             branches={activeScript?.branches}
                            //         />
                            //     </span>
                            // }
                            // onChange={_.debounce(editorOnChange, 300)}
                        />
                    </TabPane>
                    <TabPane tab={<EditOutlined />} key="2">
                        <MdEditor />
                    </TabPane>
                </Tabs>
                {/* <WindowManager
                    windows={DEFAULT_WINDOW_MAP}
                    elements={{
                        menu: <SectionList />,
                        main: <SectionEditor />,
                    }}
                /> */}
            </div>
        </div>
    );
};

export default MainWindow
import { Button } from 'antd';
import React, { useState } from 'react'
import WindowManager from '../../components/window-manager';
import _ from 'lodash'
import { MosaicNode } from 'react-mosaic-component';
import { useAppDispatch } from '../../redux/store';
import ExplorerWindow from '../explorer-window';
import { DEFAULT_WINDOW_MAP } from '../../utils/default-window-map';
import MainWindow from '../main-window';



const AppWindow = (): JSX.Element => {
    // const [windowLayout, setWindowLayout] = useState<MosaicNode<string>>(DEFAULT_WINDOW_MAP);
    // const onWindowChange = (newNode: MosaicNode<any>): void => {
    //     if (!!newNode) setWindowLayout(newNode);
    // };

    return <WindowManager
        windows={DEFAULT_WINDOW_MAP}
        elements={{
            menu: <ExplorerWindow />,
            main: <MainWindow />,
        }}
        // onWindowChange={_.debounce(onWindowChange, 500)}
    />
}

export default AppWindow;
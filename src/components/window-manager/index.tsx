import { useState, useCallback } from 'react';
import { Mosaic, MosaicNode } from 'react-mosaic-component';

import './window-manager.scss';

export interface WindowManagerProps {
    windows: MosaicNode<string>;
    elements: { [viewId: string]: JSX.Element };
    onWindowChange?: (newNode: MosaicNode<any> | null) => any;
}

const WindowManager: React.FC<WindowManagerProps> = (
    props: WindowManagerProps
): JSX.Element => {
    const resize = { minimumPaneSizePercentage: 1 };
    const { elements, windows, onWindowChange } = props;
    const [isChanging, setIsChanging] = useState(false);

    const onChange = useCallback(
        (newNode: MosaicNode<any> | null): void => {
            if (!!onWindowChange) onWindowChange(newNode);
            setIsChanging(true);
        },
        [onWindowChange]
    );

    const onRelease = useCallback(() => {
        setIsChanging(false);
    }, []);

    const renderTile = useCallback(
        (id: string): JSX.Element => {
            return elements[id];
        },
        [elements]
    );

    return (
        <div id="window-manager" className={`${isChanging ? `changing` : ''}`}>
            <Mosaic
                className={'mosaic-custom-theme'}
                renderTile={renderTile}
                initialValue={windows}
                onChange={onChange}
                onRelease={onRelease}
                resize={resize}
            />
        </div>
    );
};

export default WindowManager;

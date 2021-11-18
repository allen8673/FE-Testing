import { DroppableProvided, DropResult } from 'react-beautiful-dnd';

export interface RbDndContextProps<T> {
    items?: T[];
    onSelectItem?: any;
    className?: string;
    onUnmount?: any;
    onDragEnd?: (result: DropResult, resultItems: T[]) => void;
    style?: CSSProperties;
    children: (_items: T[]) => JSX.Element | JSX.Element[];
}

export interface RbDndDroppableProps<T> {
    items?: T[];
    onSelectItem?: any;
    onUnmount?: any;
    children: (
        _items: T[],
        provided: DroppableProvided
    ) => JSX.Element | JSX.Element[];
}

export interface RbDndItemProps<T> {
    item: T;
    index: number;
    renderContent: (item: T) => JSX.Element;
    isDragDisabled?: boolean;
    onClickItem?: (item: T) => void;
    itemStyle?: any;
    idPath?: string | string[];
}

export interface RbDndListProps<T> {
    items?: T[];
    renderContent: (props: T, idx: number) => JSX.Element;
    onSelectItem?: any;
    className?: string;
    onUnmount?: any;
    isDragDisabled?: boolean;
    onClickItem?: (item: T) => void;
    itemStyle?: any;
    idPath?: string | string[];
    onDragEnd?: (result: DropResult, resultItems: T[]) => void;
    style?: CSSProperties;
}

import _ from 'lodash';
import React, { CSSProperties, useEffect, useState } from 'react';
import {
    DragDropContext,
    Draggable,
    Droppable,
    DroppableProvided,
    DropResult,
    ResponderProvided,
} from 'react-beautiful-dnd';
import { Element } from 'react-scroll';
import { v4 as uuidv4 } from 'uuid';

import {
    RbDndContextProps,
    RbDndDroppableProps,
    RbDndItemProps,
    RbDndListProps,
} from './rb-dnd-list';

import './rb-dnd-list.scss';

const RbDndContext = <T extends { [key: string]: any }>({
    items = [],
    className,
    onDragEnd,
    style,
    children,
}: RbDndContextProps<T>): JSX.Element => {
    const dndOnDragEnd = (
        result: DropResult,
        provided: ResponderProvided
    ): void => {
        if (!result.source || !result.destination) return;
        if (onDragEnd) {
            const resultItems = _.cloneDeep(items);
            resultItems.splice(
                result.destination.index,
                0,
                resultItems.splice(result.source.index, 1)[0]
            );
            onDragEnd(result, resultItems);
            return;
        }
        items.splice(
            result.destination.index,
            0,
            items.splice(result.source.index, 1)[0]
        );
    };
    return (
        <div id="rb-dnd-context" className={className} style={style}>
            <DragDropContext onDragEnd={dndOnDragEnd}>
                {children(items)}
            </DragDropContext>
        </div>
    );
};

const RbDndDroppable = <T extends { [key: string]: any }>({
    items = [],
    children,
}: RbDndDroppableProps<T>): JSX.Element => {
    return (
        <Droppable droppableId={uuidv4()} type={uuidv4()}>
            {(provided: DroppableProvided): JSX.Element => (
                <div ref={provided.innerRef}>
                    {children(items, provided)}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

const RbDndItem = <T extends { [key: string]: any }>({
    item,
    index,
    renderContent,
    isDragDisabled,
    onClickItem,
    idPath = 'id',
}: RbDndItemProps<T>): JSX.Element => {
    const id = _.get(item, idPath) || `dnd-id-${index}`;
    return (
        <Element
            key={index}
            name={item?.id || ''}
            onClick={(): void => {
                if (onClickItem) {
                    onClickItem(item);
                }
            }}
        >
            <Draggable
                key={id}
                draggableId={id}
                index={index}
                isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot): JSX.Element => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps} // sets the whole element as drag handle
                    >
                        {renderContent(item)}
                    </div>
                )}
            </Draggable>
        </Element>
    );
};

const RbDndList = <T extends { [key: string]: any }>({
    renderContent,
    items = [],
    className,
    isDragDisabled,
    onClickItem,
    itemStyle,
    idPath,
    onDragEnd,
    style,
}: RbDndListProps<T>): JSX.Element => {
    return (
        <RbDndContext {...{ className, style, onDragEnd, items }}>
            {(_items): JSX.Element => (
                <RbDndDroppable items={_items}>
                    {(_items): JSX.Element[] =>
                        _.map(_items, (item, index: number) => {
                            return (
                                <RbDndItem
                                    item={item}
                                    index={index}
                                    renderContent={(item): JSX.Element =>
                                        renderContent(item, index)
                                    }
                                    isDragDisabled={isDragDisabled}
                                    onClickItem={(item): void => {
                                        if (onClickItem) {
                                            onClickItem(item);
                                        }
                                    }}
                                    itemStyle={itemStyle}
                                    idPath={idPath}
                                />
                            );
                        })
                    }
                </RbDndDroppable>
            )}
        </RbDndContext>
    );
};

export default RbDndList;
export { RbDndContext, RbDndDroppable, RbDndItem };

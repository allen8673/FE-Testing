import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import RbDndList from "../../components/rb-dnd-list";
import { Notion } from "../../types/notion";
import './explorer-window.scss';

const ExplorerWindow = (): JSX.Element => {

    const [notions, setNotions] = useState<Notion[]>([
        {
            id: '1',
            title: 'sql 1',
            sections: []
        },
        {
            id: '2',
            title: 'sql 2',
            sections: []
        }]);
    const [activeNotion, setActiveNotion] = useState<Notion>();


    const renderContent = (notion: Notion): JSX.Element => {
        return (
            <div
                className={`notion-item  ${notion.id === activeNotion?.id ? 'active' : ''
                    }`}
                onClick={(): void => {
                    setActiveNotion(notion)
                }}
            >
                {/* <Checkbox
                    checked={item.isChecked}
                    onChange={(e): void => {
                        upsertSectionById(item.id, {
                            isChecked: !!e.target.checked,
                        });
                    }}
                ></Checkbox> */}
                <div className="item-title">{notion.title}</div>
                {/* <DropDownMenu
                    item={item}
                    onEdit={!!activeTab?.onEdit}
                    {...scriptHook}
                >
                    <MoreOutlined id="more-menu-trigger" />
                </DropDownMenu> */}
            </div>
        );
    };

    return (
        <div id="explorer-window">
            <RbDndList
                items={notions}
                renderContent={renderContent}
                isDragDisabled={true}
                onDragEnd={(result, resultItems): void => {
                    // updateActiveScript({
                    //     sections: _.map(resultItems, (i, idx) => ({
                    //         ...i,
                    //         order: idx,
                    //     })),
                    // });
                }}
            />
            <Button type="dashed" icon={<PlusOutlined />}>Add</Button>
        </div>
    );
};

export default ExplorerWindow
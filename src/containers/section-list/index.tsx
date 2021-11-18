import { useState } from 'react';
import RbDndList from '../../components/rb-dnd-list'
import { Section } from '../../types/notion';
import './section-list.scss'

const SectionList = (): JSX.Element =>{

    const [sections, setSections] = useState<Section[]>([
        {
            id: '1',
            title: '1',
        },
        {
            id: '2',
            title: '2',
        }]);
    const [activeSection, setActiveSection] = useState<Section>();

    const renderContent = (notion: Section): JSX.Element => {
        return (
            <div
                className={`section-item  ${notion.id === activeSection?.id ? 'active' : ''
                    }`}
                onClick={(): void => {
                    setActiveSection(notion)
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

    return <div id='section-list'>
         <RbDndList
                items={sections}
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
    </div>
}

export default SectionList
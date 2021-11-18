export interface Notion{
    id: string;
    title?: string;
    sections: Section[];
}

export interface Section{
    id?: string;
    title?: string;
    content?: string
}
export interface LinkContext {
    link_url: string;
    link_title: string;
    link_summary: string;
    link_image_url: string;
}

export interface Link {
    text: string;
    link_context: LinkContext;
    client_context: string;
    mutation_token: string;
}

export interface Message {
    path: string;
    op: string;
    thread_id: string;
    item_id: string;
    user_id: number;
    timestamp: number;
    item_type: string;
    link: Link;
    client_context: string;
    show_forward_attribution: boolean;
    is_shh_mode: boolean;
}

 export default interface LinkTypeEvent {
    event: string;
    message_type: number;
    seq_id: number;
    mutation_token: string;
    realtime: boolean;
    message: Message;
}
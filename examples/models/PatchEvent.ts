export interface FriendshipStatus {
    following: boolean;
    outgoing_request: boolean;
    is_bestie: boolean;
    is_restricted: boolean;
}
export interface User {
    pk: number;
    username: string;
    full_name: string;
    is_private: boolean;
    profile_pic_url: string;
    profile_pic_id: string;
    friendship_status: FriendshipStatus;
    has_anonymous_profile_picture: boolean;
    is_unpublished: boolean;
    is_favorite: boolean;
    latest_reel_media: number;
    account_badges: any[];
}

export interface FriendshipStatus2 {
    following: boolean;
    outgoing_request: boolean;
    is_bestie: boolean;
    is_restricted: boolean;
}

export interface MediaShare {
    taken_at: number;
    pk: number;
    id: string;
    device_timestamp: number;
    media_type: number;
    code: string;
    client_cache_key: string;
    filter_type: number;
    user: User;
    can_viewer_reshare: boolean;
    caption_is_edited: boolean;
    like_and_view_counts_disabled: boolean;
    is_paid_partnership: boolean;
    comment_likes_enabled: boolean;
    comment_threading_enabled: boolean;
    has_more_comments: boolean;
    max_num_visible_preview_comments: number;
    can_view_more_preview_comic_id: string;
    friendship_status: FriendshipStatus2;
    has_anonymous_profile_picture: boolean;
    is_unpublished: boolean;
    is_favorite: boolean;
    latest_reel_media: number;
    account_badges: any[];
}

export interface Message {
    path: string;
    op: string;
    thread_id: string;
    item_id: string;
    user_id: number;
    timestamp: number;
    item_type: string;
    media_share: MediaShare;
    is_covered: boolean;
    media_id: number;
    private_reply_status: number;
}

export interface SharingFrictionInfo {
    should_have_sharing_friction: boolean;
    bloks_app_url?: any;
}

export default interface PatchEvent {
    event: string;
    message_type: number;
    seq_id: number;
    mutation_token: string;
    realtime: boolean;
    message: Message;
    can_viewer_save: boolean;
    organic_tracking_token: string;
    sharing_friction_info: SharingFrictionInfo;
    is_in_profile_grid: boolean;
    profile_grid_control_enabled: boolean;
    deleted_reason: number;
    integrity_review_decision: string;
}

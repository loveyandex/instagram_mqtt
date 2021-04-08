

    export interface Merchant {
        pk: number;
        username: string;
        profile_pic_url: string;
    }

    export interface Candidate {
        url: string;
        width: number;
        height: number;
    }

    export interface ImageVersions2 {
        candidates: Candidate[];
    }

    export interface MainImage {
        image_versions2: ImageVersions2;
        preview: string;
    }

    export interface Candidate2 {
        url: string;
        width: number;
        height: number;
    }

    export interface ImageVersions22 {
        candidates: Candidate2[];
    }

    export interface ThumbnailImage {
        image_versions2: ImageVersions22;
        preview: string;
    }

    export interface Product {
        name: string;
        price: string;
        current_price: string;
        full_price: string;
        product_id: number;
        merchant: Merchant;
        compound_product_id: string;
        description: string;
        has_viewer_saved: boolean;
        main_image: MainImage;
        thumbnail_image: ThumbnailImage;
        review_status: string;
        external_url: string;
        checkout_style: string;
        can_share_to_story: boolean;
        full_price_stripped: string;
        current_price_stripped: string;
        ig_is_product_editable_on_mobile: boolean;
    }

    export interface ProductShare {
        text: string;
        product: Product;
    }

    export interface Message {
        path: string;
        op: string;
        thread_id: string;
        item_id: string;
        user_id: number;
        timestamp: number;
        item_type: string;
        product_share: ProductShare;
        client_context: string;
        show_forward_attribution: boolean;
        is_shh_mode: boolean;
    }

    export interface ProductShareEvent {
        event: string;
        message_type: number;
        seq_id: number;
        mutation_token: string;
        realtime: boolean;
        message: Message;
    }




class ShareModel {
    name: string;
    location: string;
    category: string;
    description: string;
    images: File;

    constructor(
        BroadcastName: string,
        BroadcastLocation: string,
        BroadcastCategory: string,
        BroadcastDescription: string,
        BroadcastImages: File
    ) {
        this.name = BroadcastName;
        this.location = BroadcastLocation;
        this.category = BroadcastCategory;
        this.description = BroadcastDescription;
        this.images = BroadcastImages;
    }
}

export default ShareModel;
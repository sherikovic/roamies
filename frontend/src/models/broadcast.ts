class BroadcastModel {
    name: string;
    location: string;
    category: string;
    date: Date;
    time: Date;
    description: string;
    images?: File;

    constructor(
        BroadcastName: string,
        BroadcastLocation: string,
        BroadcastCategory: string,
        BroadcastDate: Date,
        BroadcastTime: Date,
        BroadcastDescription: string,
        BroadcastImages: File
    ) {
        this.name = BroadcastName;
        this.location = BroadcastLocation;
        this.category = BroadcastCategory;
        this.date = BroadcastDate;
        this.time = BroadcastTime;
        this.description = BroadcastDescription;
        this.images = BroadcastImages;
    }
}

export default BroadcastModel;
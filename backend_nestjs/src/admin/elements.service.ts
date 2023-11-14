import { Injectable, Logger } from '@nestjs/common'
interface ElementsModel {
    name: string;
    value: string;
    description: string;
}

@Injectable()
export class ElementsService {
    public Elements_DUMMY: ElementsModel[] = [
        { name: "Google_API", value: "HBXYSKA", description: "Use this for Google maps" },
        { name: "MapBox_API", value: "AUVDKANA_BKAJ", description: "Use this for MapBox maps" },
    ];
}

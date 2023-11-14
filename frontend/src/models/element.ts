class ElementModel {
    name: string;
    value: string;
    description: string;
    _id: string;

    constructor(elementName: string, elementValue: string, elementDescription: string, elementId: string) {
        this.name = elementName;
        this.value = elementValue;
        this.description = elementDescription;
        this._id = elementId;
    }
};

export default ElementModel;

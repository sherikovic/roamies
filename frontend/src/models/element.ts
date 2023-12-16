class ElementModel {
    name: string;
    value: string;
    description: string;
    fullname: string;
    country: string;
    city: string;
    github: string;
    linkedin: string;
    _id: string;

    constructor(
        elementName: string,
        elementValue: string,
        elementDescription: string,
        elementId: string,
        elementFullname: string,
        elementCountry: string,
        elementCity: string,
        elementGithub: string,
        elementLinkedin: string) {
        this.name = elementName;
        this.value = elementValue;
        this.description = elementDescription;
        this.fullname = elementFullname;
        this.country = elementCountry;
        this.city = elementCity;
        this.github = elementGithub;
        this.linkedin = elementLinkedin;
        this._id = elementId;
    }
};

export default ElementModel;

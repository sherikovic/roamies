class LocationModel {
    name: string;
    latitude: string;
    longitude: string;
    description: string;
    country: string;
    city: string;
    _id: string;

    constructor(
        locationName: string,
        locationLatitude: string,
        locationLongitude: string,
        locationDescription: string,
        locationId: string,
        locationCountry: string,
        locationCity: string
    ) {
        this.name = locationName;
        this.latitude = locationLatitude;
        this.longitude = locationLongitude;
        this.description = locationDescription;
        this.country = locationCountry;
        this.city = locationCity;
        this._id = locationId;
    }
};

export default LocationModel;

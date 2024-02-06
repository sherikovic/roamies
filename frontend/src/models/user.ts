class UserModel {
    username: string;
    email: string;
    password: string;
    age: number;
    fullname: string;
    country: string;
    bio: string;
    social: [string];

    constructor(
        UserUsername: string,
        UserEmail: string,
        UserPassword: string,
        UserAge: number,
        UserFullname: string,
        UserCountry: string,
        UserBio: string,
        UserSocial: [string]
    ) {
        this.username = UserUsername;
        this.email = UserEmail;
        this.password = UserPassword;
        this.age = UserAge;
        this.fullname = UserFullname;
        this.country = UserCountry;
        this.bio = UserBio;
        this.social = UserSocial;
    }

}

export default UserModel;
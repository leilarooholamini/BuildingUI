export interface CreateUserDto {
    UserId: String;
    Password: String;
    RePassword: String;
    UserName: String;
    Lock: boolean
    PersonalName
    PersonalLastName: String;
    PersonalCode: String;
    Father: String;
    FileId: String;
    BirthDate: any;
    UnitId: String;
    UnitName: String;
    EmailAddress: String;
    PostIds: String[];

}

export interface UserDto {
    UserId: String;
    UserName: String;
    Lock: boolean;
    Mobile: String;
    FullName: String;
    Phone: String;
    EmailAddress: String;
    IsActive: string;
    UserRoleNames: string;
    ImagePath: string;

}

export interface ChengePasswordDto {
    UserId: String;
    Password: String;
    RePassword: String;
}
export interface CreateUserRoleDto {
    UnitName: string;
    UserRoleId: String;
    UserId: String;
    RoleId: String;

    UnitId: String;
}

export interface UserRoleDto {
    UserRoleId: String;
    UserName: String;

    RoleName: String;

    UnitName: String;
}


export interface EditUserProFile {
    PersonalName :String;
    PersonalLastName: String;
    Father: String; 
    Password: String;
    RePassword: String; 
    PersonalCode: String; 
    FileId: String;
    BirthDate: any; 
    E_ThemId: String;
    E_LanguageId: String;
 

}
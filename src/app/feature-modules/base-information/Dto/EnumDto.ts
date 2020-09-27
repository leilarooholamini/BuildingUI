export interface EnumDto {
    EnumId: String;
    EnumTypeTitel: String;
    EnumName: String;
    EnumCode: String; 
    ParentName:String
}

export interface CreateEnumDto {
    EnumId: String;
    EnumTypeCode: String;
    EnumName: String;
    EnumCode: String;
    ParentName:String;
    ParentId:String;

}
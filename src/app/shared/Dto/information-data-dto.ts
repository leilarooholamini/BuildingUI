export interface CreateInformationDataDto {
    InformationDataId: String;
    ExternalId: String;
    FormType: String;
    E_ModelIds: String[];
    E_YMIds: String[];
    E_EngineIds: String[];
    E_GearBoxIds: String[];
    E_FunktionGroupIds: String[];
    FunktionGroupName:string;
}

export interface InformationDataDto {
    InformationDataId: String;
    ExternalId: String;
    FormType: String;
    E_ModelIds: String;
    E_YMIds: String;
    E_EngineIds: String;
    E_GearBoxIds: String;
    E_FunktionGroupIds: String;
  
}

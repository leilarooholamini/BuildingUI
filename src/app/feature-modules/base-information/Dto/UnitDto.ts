

export interface TreeDTO {
    UnitId: string,
    expanded: boolean
    ParentId: string
    UnitName: string 
}

export interface  TreeViewDTO{
    level: number;
    UnitId: number,
    expanded: boolean
    ParentId: string
    UnitName: string
}

export interface UnitDTO {
    UnitId: string
    UnitName: string
    UnitCode: string
    ParentTitle: string
    UnitTypeTitle: string
    Phone: string
    Address: string
    Logo: string
    NationalCode: string
    IsActive: boolean

}


export interface CreateUnitDTO {
    UnitId: string
    UnitName: string
    UnitCode: string 
    Phone: string
    Address: string
    Logo: string
    NationalCode: string
    IsActive: boolean
    ParentId:string
    UnitTypeId:string
    ParentUnitName:string
    EconomicIdentifier:string
}
export interface RoleDto {
    RoleId: string;
    RoleName: string;
    RoleCode: string;

}

export interface CreateRoleDto {
    RoleId: string;
    RoleName: string;
    RoleCode: string;
    PermissionIds:Array<string>

}

export interface PermissionDto
{
     PermissionId  : string;
      MenuId  : string;
      PermissionTitel  : string;
      PermissionName  : string;
      Checked:boolean;
    }

    export interface MenuPermissionDTO
{  
    MenuId : string;
    MenuTitel : string;
  Pemissionlist: Array<PermissionDto>
 
}
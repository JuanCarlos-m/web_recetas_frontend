export interface User{
    id?:string;
    username?:string;
    password?:string;
    token?:string;

    name?:string;
    lastname?:string;

    fecha_nac?:Date;
    
    roles?:Role[];
}

export interface Role{
    id?:number;
    name?:ERole;
}

enum ERole{
    ROLE_USER,
    ROLE_ADMIN
}

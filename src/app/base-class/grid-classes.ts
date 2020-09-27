export class GridColumn {
    constructor(
      public title: string,
      public propertyName: string,
      public isSortable: boolean,
      public type: string,
      public width: Number,
      public Operator: string,
      public isFilterd: boolean,
    ) {
  
    }
  }


  export class GridResult<T> {

    constructor(public Total: number, public Data: T[]) {}
}

export class GridSort {
    /**
     *
     */
    constructor(public Dir:string ,
      public Field:string ) {
  
        
    }
      
  }
  

  export class GridFilter{

    Operator:string ; 
        Logic :string ;
        Value  :string;
        Field   :string;
       Filters :Array<GridFilter>;
     
}



export class GridRequest {
    Page: number;
    PageSize: number;
    Sort: Array<GridSort>;
    Filters:GridFilter;
}

export class FilterGridRequest {
    gridRequest:GridRequest;
    isRefreshGird:boolean;
}


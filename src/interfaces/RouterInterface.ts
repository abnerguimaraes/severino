export interface RouterInterface {
  table_name: string;
  table_type: string;
}

export interface QueryParamInterface {
  key: string;
  value: string;
}

export interface QueryBuilderInterface extends QueryParamInterface {
  has_sub: boolean;
}

export interface QueryBuilderSubInterface {
  id_query_builder: number;
  alias_name: string;
  value: string;
}

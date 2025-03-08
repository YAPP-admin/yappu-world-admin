export interface Nav {
  title: string;
  path: string;
}

export interface NavList {
  title: string;
  path: string;
  childs?: Nav[];
}

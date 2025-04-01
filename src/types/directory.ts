import { AddressType, Coordinate, HoursType } from "@yext/pages-components";

export interface DirectoryParent {
  name: string;
  slug: string;
  meta: string;
  c_addressRegionAbbreviation: string;
  id: string;
}
export interface DirectoryChild {
  name: string;
  address: AddressType;
  mainPhone: string;
  slug: string;
  c_addressRegionAbbreviation?: string;
  dm_childEntityIds?: string[];
  id: string;
  dm_directoryChildren?: DirectoryChild[];
  yextDisplayCoordinate: Coordinate;
  timezone: string;
  hours: HoursType;
  meta: any;
}

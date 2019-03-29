/**
 * Represents a parsed xml.
 */
export interface IBaseXml {
  Library: {
    Artist: BaseArtist;
  };
}

export type BaseArtist = [IAttributes | BaseSong];
export type BaseSong = IAttributes[];

export interface IAttributes {
  attributes: {
    name: string;
    id?: string;
    duration?: string;
  };
}

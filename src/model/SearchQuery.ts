import { IFilter } from "./Filter";
import { IScientificPaper } from "./ScientificPaper";

export interface ISearchParams {
  fulltext: string;
  documentType: string[];
  mentor: string[];
  year: string[];
  publisher: string[];
  scientificField: string[];
  from: number;
  size: number;
  [key: string]: string[] | string | number;
}

export interface ISearchResult {
  filters: IFilter[];
  scientificPapers: IScientificPaper[];
  totalCount: number;
}

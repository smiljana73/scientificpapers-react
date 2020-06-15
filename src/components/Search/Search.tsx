import React, { useState, useEffect } from "react";
import "./Search.css";
import Filters from "./Filters/Filters";
import Results from "./Results/Results";
import { IFilter } from "../../model/Filter";
import { ISearchParams, ISearchResult } from "../../model/SearchQuery";
import SEARCH_QUERY from "../../services/queries/search";
import { useQuery } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import Result from "./Result/Result";
import Header from "../Header/Header";

const Search: React.FC = () => {
  const resultsPerPage = 5;
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    fulltext: "",
    documentType: [],
    mentor: [],
    year: [],
    publisher: [],
    scientificField: [],
    from: 0,
    size: resultsPerPage
  });

  const setPageNumber = (page: number) => {
    setSearchParams({ ...searchParams, from: (page - 1) * resultsPerPage });
  };

  const setSearchTerm = (newSearchTerm: string) => {
    setSearchParams({ ...searchParams, from: 0, fulltext: newSearchTerm });
  };

  const addFilterValue = (filterKey: string, newValue: string) => {
    const list: string[] = searchParams[filterKey] as string[];
    list.push(newValue);
    setSearchParams({ ...searchParams, from: 0, [filterKey]: list });
  };

  const removeFilterValue = (filterKey: string, toRemove: string) => {
    const list: string[] = searchParams[filterKey] as string[];
    setSearchParams({
      ...searchParams,
      from: 0,
      [filterKey]: list.filter(item => item !== toRemove)
    });
  };

  const changeType = (newType: string) => {
    setSearchParams({ ...searchParams, from: 0, documentType: [newType] });
  };

  const removeType = () => {
    setSearchParams({ ...searchParams, from: 0, documentType: [] });
  };

  const { loading, error, data, refetch } = useQuery(SEARCH_QUERY, {
    variables: { ...searchParams }
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  let match = useRouteMatch();

  let filters: any;
  let scientificPapers: any;
  let totalCount: any;
  if (data) {
    filters = data.queryScientificPaper.filters;
    scientificPapers = data.queryScientificPaper.scientificPapers;
    totalCount = data.queryScientificPaper.totalCount;
  }

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="container-content">
          <Switch>
            <Route path={`${match.path}/:paperId`}>
              <Result />
            </Route>
            <Route path="/">
              <Filters
                filters={
                  !(loading || error) ? (filters as IFilter[]).filter(f => f.key !== "documentType") : []
                }
                searchParams={searchParams}
                handleFilterCheched={addFilterValue}
                handleFilterUnchecked={removeFilterValue}
              />
              <Results
                scientificPapers={!(loading || error) ? scientificPapers : []}
                resultsPerPage={resultsPerPage}
                totalCount={!(loading || error) ? totalCount : 0}
                handlePageChange={setPageNumber}
                handleSearchTermChange={setSearchTerm}
                handleTypeChanged={changeType}
                handleTypeRemoved={removeType}
                searchParams={searchParams}
                typeFilter={
                  !(loading || error) ? (filters as IFilter[]).find(f => f.key === "documentType") : undefined
                }
              />
            </Route>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Search;

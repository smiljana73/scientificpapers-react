import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./Results.css";
import { IScientificPaper } from "../../../model/ScientificPaper";
import { ISearchParams } from "../../../model/SearchQuery";
import { IFilter } from "../../../model/Filter";
import Tabs from "../Tabs/Tabs";
import { Link, useRouteMatch } from "react-router-dom";

interface IProps {
  scientificPapers: IScientificPaper[];
  resultsPerPage: number;
  totalCount: number;
  handlePageChange: (page: number) => void;
  handleSearchTermChange: (newSearchTerm: string) => void;
  handleTypeChanged: (newType: string) => void;
  handleTypeRemoved: () => void;
  searchParams: ISearchParams;
  typeFilter: IFilter | undefined;
}

const Results: React.FC<IProps> = props => {
  const {
    scientificPapers,
    resultsPerPage,
    totalCount,
    handlePageChange,
    handleSearchTermChange,
    handleTypeChanged,
    handleTypeRemoved,
    searchParams,
    typeFilter
  } = props;

  const [selectedPage, setSelectedPage] = useState(1);
  const totalPages = Math.ceil(totalCount / resultsPerPage);
  const shownPages = totalPages > 5 ? 5 : totalPages;
  const firstPageNumber =
    totalPages > 5
      ? selectedPage > 2
        ? totalPages - selectedPage > 1
          ? selectedPage - 2
          : totalPages - 4
        : 1
      : 1;

  useEffect(() => {
    setSelectedPage(searchParams.from / resultsPerPage + 1);
  }, [searchParams]);

  const changePage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, newPage: number) => {
    e.preventDefault();
    handlePageChange(newPage);
    setSelectedPage(newPage);
  };

  return (
    <div className="container-right">
      <div className="content">
        <Tabs
          typeFilter={typeFilter}
          handleTypeChanged={handleTypeChanged}
          handleTypeRemoved={handleTypeRemoved}
          searchParams={searchParams}
        />
        <SearchBar handleSearchTermChange={handleSearchTermChange} />
        {scientificPapers.map((scientificPaper, index) => (
          <div className="result-item" key={index}>
            <Link to={`search/${scientificPaper.identificationNumber}`}>
              <div className="results-title">{scientificPaper.title}</div>
            </Link>
            <div className="results-description">{scientificPaper.description}</div>
            <div className="results-info">
              {scientificPaper.year}, {scientificPaper.publisher}
            </div>
          </div>
        ))}
        <div className="bottom">
          <div className="pagination">
            {selectedPage > 1 && (
              <a href="" onClick={event => changePage(event, selectedPage - 1)} className="page page--text">
                Prev
              </a>
            )}
            {Array.from({ length: shownPages }, (_, index) => (
              <a
                key={index}
                href=""
                onClick={event => changePage(event, firstPageNumber + index)}
                className={firstPageNumber + index === selectedPage ? "page page--selected" : "page"}
              >
                {firstPageNumber + index}
              </a>
            ))}
            {selectedPage < totalPages && (
              <a href="" onClick={event => changePage(event, selectedPage + 1)} className="page page--text">
                Next
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

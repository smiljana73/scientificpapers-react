import React, { useState } from "react";
import "./Filters.css";
import { IFilter } from "../../../model/Filter";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { ISearchParams } from "../../../model/SearchQuery";

interface IProps {
  filters: IFilter[];
  searchParams: ISearchParams;
  handleFilterCheched: (filterKey: string, newValue: string) => void;
  handleFilterUnchecked: (filterKey: string, toRemove: string) => void;
}

const Filters: React.FC<IProps> = props => {
  const { filters, searchParams, handleFilterCheched, handleFilterUnchecked } = props;
  const [hiddenFilters, setHiddenFilters] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, filterKey: string, filterValue: string) => {
    if (e.currentTarget.checked) handleFilterCheched(filterKey, filterValue);
    else handleFilterUnchecked(filterKey, filterValue);
  };
  const toggleVisibility = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, filterKey: string) => {
    e.preventDefault();
    if (hiddenFilters.indexOf(filterKey) == -1) setHiddenFilters([...hiddenFilters, filterKey]);
    else setHiddenFilters(hiddenFilters.filter(f => f !== filterKey));
  };

  return (
    <div className="container-left">
      <div className="content">
        {filters.map((filter, index) => (
          <div className="filter" key={index}>
            <div className="filter-header">
              <a className="toggle-button" href="#" onClick={event => toggleVisibility(event, filter.key)}>
                {hiddenFilters.indexOf(filter.key) == -1 ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
              </a>
              {filter.name}
            </div>
            {hiddenFilters.indexOf(filter.key) == -1 && (
              <div className="filter-content">
                {filter.values.map((filterValue, index) => (
                  <div className="filter-item" key={index}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={event => handleChange(event, filter.key, filterValue.value)}
                      checked={(searchParams[filter.key] as string[]).indexOf(filterValue.value) !== -1}
                    />
                    {filterValue.value}&nbsp;({filterValue.count})
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;

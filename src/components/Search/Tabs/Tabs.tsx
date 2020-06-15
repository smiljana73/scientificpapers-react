import React from "react";
import { IFilter } from "../../../model/Filter";
import { ISearchParams } from "../../../model/SearchQuery";
import "./Tabs.css";

interface IProps {
  typeFilter?: IFilter;
  handleTypeChanged: (newType: string) => void;
  handleTypeRemoved: () => void;
  searchParams: ISearchParams;
}

const Tabs: React.FC<IProps> = props => {
  const { typeFilter, handleTypeChanged, handleTypeRemoved, searchParams } = props;
  const handleTypeChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, newSelectedType: string) => {
    e.preventDefault();
    if (newSelectedType === "All") handleTypeRemoved();
    else handleTypeChanged(newSelectedType);
  };

  return (
    <div className="tabs">
      <div className="tabs-content">
        <div className="tab" key={0}>
          <a
            href=""
            className={searchParams.documentType.length === 0 ? " tab-link tab-link--selected" : "tab-link"}
            onClick={event => handleTypeChange(event, "All")}
          >
            All
          </a>
        </div>
        {typeFilter &&
          typeFilter.values.map((type, index) => (
            <div className="tab" key={index}>
              <a
                href=""
                className={
                  type.value === searchParams.documentType[0] ? "tab-link tab-link--selected" : "tab-link"
                }
                onClick={event => handleTypeChange(event, type.value)}
              >
                {type.value}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tabs;

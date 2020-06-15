import React, { useEffect } from "react";
import "./Result.css";
import { useParams } from "react-router-dom";
import SCIENTIFIC_PAPER_QUERY from "../../../services/queries/scientificPaper";
import { useQuery } from "@apollo/react-hooks";
import { fileService } from "../../../services/fileService";
import pdf from "../../../assets/images/icons8-export-pdf-100.png";

const Result: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let { paperId } = useParams();

  const handleDownload = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    fileService
      .downloadPdf(scientificPaper.identificationNumber)
      .then((response: any) => response.blob())
      .then((blob: any) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${scientificPaper.identificationNumber}.pdf`);
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) link.parentNode.removeChild(link);
      });
  };

  const { loading, error, data } = useQuery(SCIENTIFIC_PAPER_QUERY, {
    variables: { identificationNumber: paperId }
  });
  let scientificPaper: any;
  if (data) {
    scientificPaper = data.scientificPaper.length > 0 ? data.scientificPaper[0] : undefined;
  }

  const row = (label: string, value: string) => {
    return (
      <div className="info-row">
        <span className="info-label">{label}</span>
        <span className="info-value">{value}</span>
      </div>
    );
  };

  if (scientificPaper || loading)
    return (
      <React.Fragment>
        <div className="container-left">
          {!(loading || error) ? (
            <div className="content">
              <div className="info-table">
                {row("Identification number:", scientificPaper.identificationNumber)}
                {row("Author:", scientificPaper.author)}
                {row("Mentor:", scientificPaper.mentor)}
                {row("Document type:", scientificPaper.documentType)}
                {row("Record type:", scientificPaper.recordType)}
                {row("Paper type:", scientificPaper.paperType)}
                {row("Language:", scientificPaper.publicationLanguage)}
                {row("Geographical area:", scientificPaper.geographicalArea)}
                {row("Year:", scientificPaper.year)}
                {row("Publisher:", scientificPaper.publisher)}
                {row("Address:", scientificPaper.address)}
                {row("Scientific field:", scientificPaper.scientificField)}
                {row("Scientific discipline:", scientificPaper.scientificDiscipline)}
                {row("Date of acceptance:", scientificPaper.dateOfAcceptance)}
                {row("Defense date:", scientificPaper.defenseDate)}
                {row("Commission-mentor:", scientificPaper.commission.mentor)}
                {row("Commission-member:", scientificPaper.commission.member)}
                {row("Commission-chairman:", scientificPaper.commission.chairman)}
              </div>
            </div>
          ) : (
            <p>loading</p>
          )}
        </div>
        <div className="container-right">
          {!(loading || error) ? (
            <div className="content">
              <p className="result-title">{scientificPaper.title}</p>
              <div className="result-content">
                <p className="result-description">{scientificPaper.description}</p>
              </div>
              <p className="result-excerpt">{scientificPaper.excerpt}</p>
              <a className="result-pdfLink" target="_blank" onClick={event => handleDownload(event)}>
                <img src={pdf} className="result-pdf" />
              </a>
            </div>
          ) : (
            <p>loading</p>
          )}
        </div>
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        <div className="container-left">
          <div className="content content-result"></div>
        </div>
        <div className="container-right">
          <div className="content">No document with the given identifier</div>
        </div>
      </React.Fragment>
    );
};

export default Result;

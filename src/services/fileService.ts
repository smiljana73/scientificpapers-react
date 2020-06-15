import { auth } from "./auth";

const apiURL = "http://localhost:9999";

export const fileService = { pdfUrl, downloadPdf };

function pdfUrl(number: string) {
  return apiURL + "/file/" + number;
}

function downloadPdf(number: string) {
  const config = {
    headers: {
      authorization: `Bearer ${auth.getToken()}`,
      "Content-disposition": "inline"
    }
  };
  return fetch(apiURL + "/file/" + number, config);
}

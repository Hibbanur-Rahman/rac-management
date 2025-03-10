import Request from "@/config/apiConfig";
import apiUrls from "@/config/apiUrls";

const getAllScholar = async () =>
  Request({
    method: "GET",
    url: `${apiUrls.scholar}`,
    secure: true,
  });

const ScholarService = {
  getAllScholar,
};

export default ScholarService;

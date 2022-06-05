import React, { useState, useEffect } from "react";
import { DataT } from "../../types";
import api from "../services/api";

let [jobs, setJobs] = useState([]);

export async function loadAllJobs(): Promise<DataT[]> {
    useEffect(() => {
        api
          .get("/jobs")
          .then((response) => setJobs(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }, []);

    return jobs;
}

export default loadAllJobs;
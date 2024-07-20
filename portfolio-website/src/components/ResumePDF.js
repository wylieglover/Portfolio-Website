import React from "react";
import styles from "./ResumePDF.module.css";
import resume from "../images/resume.pdf";

const ResumePDF = () => {
    return (
        <div className={styles.resumePdf}>
            <object data={resume} type="application/pdf" width="100%" height="100%">
            </object>
        </div>
    );
};

export default ResumePDF;


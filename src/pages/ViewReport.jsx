import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./ViewReport.module.css";
import ReportGraph from "../components/ReportGraph";

const ViewReport = () => {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || "");
    const [report, setReport] = useState(null);

    const fetchReport = async (targetEmail) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/reports/by-email/${targetEmail}`);
            setReport(res.data);
        } catch (error) {
            console.error(error);
            alert("Error fetching report");
        }
    };

    useEffect(() => {
        if (email) fetchReport(email);
    }, [email]);

    const getScoreColor = (score) => {
        if (score >= 750) return styles.green;
        if (score >= 600) return styles.yellow;
        return styles.red;
    };

    const calculateLoanStats = (loans) => {
        let total = 0, paid = 0, unpaid = 0;
        loans.forEach((loan) => {
            total += loan.amount;
            loan.status === "paid" ? (paid += loan.amount) : (unpaid += loan.amount);
        });
        return { total, paid, unpaid };
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>View Credit Report</h2>

                <input
                    type="email"
                    placeholder="Enter User Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
                <button onClick={() => fetchReport(email)} className={styles.button}>
                    Fetch Report
                </button>

                {report && (
                    <div className={styles.reportBox}>
                        <h3 className={styles.reportTitle}>{report.userId.name}'s Report</h3>
                        <p><strong>Email:</strong> {report.userId.email}</p>
                        <p><strong>Phone:</strong> {report.userId.phone}</p>
                        <p>
                            <strong>Score:</strong>{" "}
                            <span className={`${styles.score} ${getScoreColor(report.score)}`}>
                                {report.score}
                            </span>
                        </p>

                        <hr className={styles.separator} />

                        <h4 className={styles.subheading}>Loan Summary</h4>
                        {(() => {
                            const stats = calculateLoanStats(report.loans);
                            return (
                                <div className={styles.summary}>
                                    <p>Total Loans: ${stats.total}</p>
                                    <p>Paid: ${stats.paid}</p>
                                    <p>Unpaid: ${stats.unpaid}</p>
                                </div>
                            );
                        })()}
                        <ReportGraph loans={report.loans} />

                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewReport;

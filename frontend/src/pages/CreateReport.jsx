import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './CreateReport.module.css';

const CreateReport = () => {
    const [email, setEmail] = useState('');
    const [loans, setLoans] = useState([{ amount: '', status: 'paid' }]);
    const navigate = useNavigate();

    const handleLoanChange = (index, field, value) => {
        const updated = [...loans];
        updated[index][field] = value;
        setLoans(updated);
    };

    const addLoan = () => {
        setLoans([...loans, { amount: '', status: 'paid' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userRes = await axios.get(`http://localhost:5000/api/users`);
            const user = userRes.data.find((u) => u.email === email);

            if (!user) {
                alert("User with that email not found.");
                return;
            }

            const cleanedLoans = loans.map((loan) => ({
                amount: Number(loan.amount),
                status: loan.status,
            }));

            await axios.post(`http://localhost:5000/api/reports`, {
                userId: user._id,
                loans: cleanedLoans,
            });

            navigate("/report", { state: { email } });
        } catch (err) {
            console.error(err);
            alert("Failed to submit credit report");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Create Credit Report</h1>

                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>User Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="user@example.com"
                    />

                    <label className={styles.label}>Loans</label>
                    {loans.map((loan, index) => (
                        <div key={index} className={styles.loanRow}>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={loan.amount}
                                onChange={(e) => handleLoanChange(index, 'amount', e.target.value)}
                                className={styles.input}
                                required
                            />
                            <select
                                value={loan.status}
                                onChange={(e) => handleLoanChange(index, 'status', e.target.value)}
                                className={styles.select}
                            >
                                <option value="paid">Paid</option>
                                <option value="unpaid">Unpaid</option>
                            </select>
                        </div>
                    ))}

                    <button type="button" onClick={addLoan} className={styles.addLoanBtn}>
                        + Add another loan
                    </button>

                    <button type="submit" className={styles.submitBtn}>
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateReport;

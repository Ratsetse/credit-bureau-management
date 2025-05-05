import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#16a34a", "#facc15", "#ef4444"];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    color: "#e2e8f0",
                    fontSize: "0.875rem",
                }}
            >
                <p>{payload[0].name}: {payload[0].value}</p>
            </div>
        );
    }

    return null;
};

const ReportGraph = ({ loans }) => {
    const paid = loans.filter((l) => l.status === "paid").length;
    const unpaid = loans.filter((l) => l.status === "unpaid").length;
    const total = loans.length;

    const data = [
        { name: "Paid", value: paid },
        { name: "Unpaid", value: unpaid },
        { name: "Total", value: total },
    ];

    return (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <h3 style={{ color: "#93c5fd", marginBottom: "1rem" }}>Loan Status Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36} iconSize={12} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ReportGraph;

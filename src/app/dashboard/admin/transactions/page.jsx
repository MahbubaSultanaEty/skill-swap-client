import { getPayments } from "@/lib/api/payments";
import { Table, Chip } from "@heroui/react";

export const metadata = {
  title: "Transactions | Admin Dashboard",
};

export const dynamic = "force-dynamic";

export default async function TransactionsPage() {
  const payments = (await getPayments()) || [];

  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
          Transactions
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#64748b" }}>
          Complete history of all processed Stripe payments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 flex flex-col gap-1" style={{ background: "#f1f5f9" }}>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>
            Total Transactions
          </span>
          <span className="text-3xl font-black" style={{ color: "#0f172a" }}>
            {payments.length}
          </span>
        </div>
        <div className="rounded-2xl p-5 flex flex-col gap-1" style={{ background: "#f1f5f9" }}>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>
            Total Revenue
          </span>
          <span className="text-3xl font-black" style={{ color: "#15803d" }}>
            ${totalRevenue}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "#e5e7eb" }}>
        {payments.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm" style={{ color: "#64748b" }}>No transactions yet</p>
          </div>
        ) : (
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Transactions" className="min-w-[700px]">
                <Table.Header>
                  <Table.Column isRowHeader>Client Email</Table.Column>
                  <Table.Column>Freelancer Email</Table.Column>
                  <Table.Column>Payout Size</Table.Column>
                  <Table.Column>Payment Date</Table.Column>
                  <Table.Column>Status</Table.Column>
                </Table.Header>
                <Table.Body>
                  {payments.map((payment) => (
                    <Table.Row key={payment._id}>
                      <Table.Cell>
                        <span className="font-medium" style={{ color: "#0f172a" }}>
                          {payment.clientEmail}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-sm" style={{ color: "#64748b" }}>
                          {payment.freelancerEmail}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="font-bold" style={{ color: "#15803d" }}>
                          ${payment.amount}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-sm" style={{ color: "#64748b" }}>
                          {new Date(payment.paidAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Chip
                          size="sm"
                          style={
                            payment.paymentStatus === "paid"
                              ? { background: "#dcfce7", color: "#15803d" }
                              : { background: "#fef3c7", color: "#92400e" }
                          }
                        >
                          {payment.paymentStatus}
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        )}
      </div>

    </div>
  );
}
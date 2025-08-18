export interface Claim {
    name: string;
    policyId: string;
    claimReason: string;
    claimAmount: number;
    claimId: number;
    status: "Pending" | "Approved";
}
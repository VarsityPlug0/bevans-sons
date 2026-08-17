export interface BankDetails {
  id: string;
  bank: string;
  accountHolder: string;
  accountType: string;
  accountNumber: string;
  branchCode: string;
  payshap?: string;
}

export const BANKS: BankDetails[] = [
  {
    id: "fnb",
    bank: "FNB / RMB",
    accountHolder: "Daisy Gadgets Co.",
    accountType: "Business Cheque Account",
    accountNumber: "63211629332",
    branchCode: "250655",
    payshap: "+27848961782@FNB",
  },
  {
    id: "tymebank",
    bank: "TymeBank / GoTymeBank",
    accountHolder: "Daisy Gadgets Co.",
    accountType: "Business Account",
    accountNumber: "51072673949",
    branchCode: "678910",
  },
];

export function getBankById(id: string): BankDetails {
  return BANKS.find(b => b.id === id) ?? BANKS[0];
}

export function getRotatingBank(orderCount: number): BankDetails {
  return BANKS[orderCount % BANKS.length];
}

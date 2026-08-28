// ── Bevans Sons — Bank Details ───────────────────────────────────────────────
// Bank account credentials are read from environment variables ONLY.
// Never hardcode account numbers in source code.

import { getBankConfig } from "./config";

export interface BankDetails {
  id: string;
  bank: string;
  accountHolder: string;
  accountType: string;
  accountNumber: string;
  branchCode: string;
  payshap?: string;
}

export function getDefaultBank(): BankDetails {
  const cfg = getBankConfig();
  return {
    id: "primary",
    bank: cfg.bank,
    accountHolder: cfg.accountHolder,
    accountType: cfg.accountType,
    accountNumber: cfg.accountNumber,
    branchCode: cfg.branchCode,
  };
}

// Keep same interface as before for compatibility
export function getBankById(_id: string): BankDetails {
  return getDefaultBank();
}

export function getRotatingBank(_orderCount: number): BankDetails {
  return getDefaultBank();
}

// Backward-compat: single bank array
export const BANKS: BankDetails[] = [];
export function getBanks(): BankDetails[] {
  return [getDefaultBank()];
}

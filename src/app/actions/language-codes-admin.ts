"use server";

import { LanguageCodeListAdmin } from "@/lib/types/language-codes";

export async function getLanguageCodesAdmin() {
  const res = await fetch(`${process.env.ADMIN_API_URL}/language_codes`);
  const data: LanguageCodeListAdmin[] = await res.json();
  return data;
}

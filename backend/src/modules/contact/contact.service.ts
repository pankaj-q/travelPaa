import { prisma } from "../../config/database";
import type { ContactInput } from "./contact.validation";

export async function submitContact(input: ContactInput) {
  return prisma.contact.create({ data: input });
}

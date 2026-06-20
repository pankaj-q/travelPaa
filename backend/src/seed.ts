import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const url = "postgresql://postgres:postgres@localhost:5432/visa_consultancy?schema=public";
const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = "admin@travelpaa.com";

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    console.log("Admin user already exists — skipping seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      phone: "+91-98999-21559",
      role: "ADMIN",
    },
  });

  console.log("Admin user created: admin@travelpaa.com / admin123");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

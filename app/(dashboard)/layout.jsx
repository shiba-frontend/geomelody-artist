import { redirect } from "next/navigation";
import DashboardShell from "@/component/DashboardShell";

// Replace this with your real session lookup (e.g. next-auth, Clerk,
// a cookie + DB check, etc). It just needs to return the user or null.
async function getSession() {
  // Example only — swap for your actual auth logic:
  // const cookieStore = cookies();
  // const token = cookieStore.get("session")?.value;
  // if (!token) return null;
  // return await verifySession(token);
  return null;
}

export default async function DashboardLayout({ children }) {
  const user = await getSession();

  // if (!user) {
  //   redirect("/login");
  // }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
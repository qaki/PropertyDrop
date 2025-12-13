// Quick script to delete a user by email
import "dotenv/config";
import { db } from "../src/server/db";

const userEmail = "twoqaki.e.d@gmail.com";

async function deleteUser() {
  try {
    const user = await db.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      console.log(`❌ User not found: ${userEmail}`);
      return;
    }

    await db.user.delete({
      where: { email: userEmail },
    });

    console.log(`✅ Successfully deleted user: ${userEmail}`);
    console.log(`You can now register again with this email!`);
  } catch (error) {
    console.error("❌ Error deleting user:", error);
  } finally {
    await db.$disconnect();
  }
}

deleteUser();


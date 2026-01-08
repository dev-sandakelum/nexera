import { NextRequest, NextResponse } from "next/server";
import {
  fetchUsers,
  fetchUserById,
  updateUserRole,
  toggleUserStatus,
  updateUserBadge,
} from "@/components/firebase/user-management";
import { revalidateUsers } from "@/lib/revalidate";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const user = await fetchUserById(id);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user);
    }

    const users = await fetchUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error in GET /api/user-management:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, action, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    let success = false;

    if (action === "change-role") {
      success = await updateUserRole(id, updates.role);
    } else if (action === "toggle-status") {
      success = await toggleUserStatus(id, updates.status);
    } else if (action === "change-badge") {
      success = await updateUserBadge(id, updates.badgeId);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!success) {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 400 }
      );
    }

    // Fetch and return updated user
    const user = await fetchUserById(id);
    if (!user) {
      return NextResponse.json(
        { error: "User not found after update" },
        { status: 404 }
      );
    }

    // Clear user cache after update
    await revalidateUsers(id);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in PUT /api/user-management:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

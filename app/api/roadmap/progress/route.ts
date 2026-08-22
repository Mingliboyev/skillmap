import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const mutation = z.object({
  attemptId: z.string().uuid(),
  taskId: z.string().regex(/^w([1-9]|1[0-2])-d[1-6]$/),
  completed: z.boolean(),
});

export async function POST(request: Request) {
  const parsed = mutation.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid roadmap progress" }, { status: 400 });
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

  const { attemptId, taskId, completed } = parsed.data;
  if (completed) {
    const { error } = await supabase.from("roadmap_task_progress").upsert(
      { user_id: user.id, attempt_id: attemptId, task_id: taskId, completed_at: new Date().toISOString() },
      { onConflict: "user_id,attempt_id,task_id" },
    );
    return error ? NextResponse.json({ error: "Progress was not saved" }, { status: 403 }) : NextResponse.json({ saved: true });
  }

  const { error } = await supabase.from("roadmap_task_progress").delete().eq("user_id", user.id).eq("attempt_id", attemptId).eq("task_id", taskId);
  return error ? NextResponse.json({ error: "Progress was not saved" }, { status: 403 }) : NextResponse.json({ saved: true });
}

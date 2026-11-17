export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    ok: true,
    service: "zahra-zeinali-child-psychology",
    time: new Date().toISOString(),
  });
}

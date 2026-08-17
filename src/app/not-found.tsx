import { NotFoundView } from "@/features/landing/not-found-view";
import { PageShell } from "@/features/landing/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <NotFoundView />
    </PageShell>
  );
}

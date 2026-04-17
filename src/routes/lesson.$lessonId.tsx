import { createFileRoute, notFound } from "@tanstack/react-router";
import { lessons } from "@/data/lessons";
import { LessonView } from "@/components/LessonView";

export const Route = createFileRoute("/lesson/$lessonId")({
  loader: ({ params }) => {
    const id = Number(params.lessonId);
    const lesson = lessons.find((l) => l.id === id);
    if (!lesson || lesson.status === "locked" || !lesson.tasks) throw notFound();
    return { lesson };
  },
  component: LessonRoute,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-hanzi text-5xl">课程未解锁</h1>
        <p className="mt-3 text-sm text-muted-foreground">This lesson isn&apos;t available yet.</p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to dashboard
        </a>
      </div>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: [
      { title: `Lesson ${loaderData?.lesson.id} · ${loaderData?.lesson.title} — Digital Chinese` },
      {
        name: "description",
        content: `Practice ${loaderData?.lesson.titleEn} with 8 interactive tasks in Digital Chinese.`,
      },
    ],
  }),
});

function LessonRoute() {
  const { lesson } = Route.useLoaderData();
  return <LessonView lesson={lesson} />;
}

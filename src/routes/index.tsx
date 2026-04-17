import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/Dashboard";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Digital Chinese · 数字化语境中学中文" },
      {
        name: "description",
        content:
          "Interactive Chinese textbook for the digital age. 10 themed lessons, 8-task adaptive engine, contextual learning.",
      },
    ],
  }),
});

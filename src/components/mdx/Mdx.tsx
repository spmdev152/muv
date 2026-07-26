import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (p) => (
    <h2 className="mt-12 text-2xl sm:text-3xl scroll-mt-28" {...p} />
  ),
  h3: (p) => <h3 className="mt-8 text-xl text-olive-700" {...p} />,
  p: (p) => <p className="mt-5 leading-relaxed text-ink-soft" {...p} />,
  ul: (p) => (
    <ul className="mt-5 space-y-2 [&>li]:relative [&>li]:pl-6" {...p} />
  ),
  ol: (p) => <ol className="mt-5 list-decimal space-y-2 pl-5 text-ink-soft" {...p} />,
  li: (p) => (
    <li
      className="text-ink-soft before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-gold-500 [ol_&]:before:hidden"
      {...p}
    />
  ),
  a: ({ href = "#", ...p }) => (
    <Link
      href={href}
      className="font-medium text-olive-700 underline decoration-gold-400 underline-offset-4 transition-colors hover:text-gold-700"
      {...p}
    />
  ),
  blockquote: (p) => (
    <blockquote
      className="mt-6 border-l-2 border-gold-500 pl-5 font-display text-xl italic text-olive-700"
      {...p}
    />
  ),
  strong: (p) => <strong className="font-semibold text-olive-800" {...p} />,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="text-lg">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
          },
        }}
      />
    </div>
  );
}

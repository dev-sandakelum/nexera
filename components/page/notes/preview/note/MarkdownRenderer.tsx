import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";

import "@/components/styles/notes/preview/md.css";
import "@/components/styles/notes/preview/md-code.css";

export async function MarkdownRenderer({ content }: { content: string }) {
  const file = await unified()
    // MARKDOWN
    .use(remarkParse)
    .use(remarkGfm)

    // MARKDOWN → HTML AST
    .use(remarkRehype, { allowDangerousHtml: true })

    // HTML
    .use(rehypeRaw)
    .use(rehypeShiki, {
      theme: "github-dark",
    })
    .use(rehypeStringify)

    .process(content);

  return (
    <div
      className="md-preview"
      dangerouslySetInnerHTML={{ __html: String(file) }}
    />
  );
}

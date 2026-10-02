import type { GuideBlock } from "@/lib/types";

/**
 * Renders guide and blog body content. Blocks map one-to-one onto the
 * structured data emitted for the same page, so markup never contradicts copy.
 */
export function EditorialBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="prose-editorial">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} id={slugify(block.text)} className="scroll-mt-24">
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full min-w-[32rem] border-collapse text-sm">
                  <caption className="sr-only">Comparison table</caption>
                  <thead>
                    <tr className="border-b border-[var(--color-line-strong)] text-left">
                      {block.head.map((h) => (
                        <th key={h} scope="col" className="py-3 pr-4 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-[var(--color-line)]">
                        {row.map((cell, c) => (
                          <td key={c} className="py-3 pr-4 align-top text-[var(--color-ink-soft)]">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "p":
          default:
            return <p key={i}>{block.text}</p>;
        }
      })}
    </div>
  );
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

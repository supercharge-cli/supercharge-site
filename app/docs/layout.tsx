import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { DOCS_CLI_VERSION } from '@/lib/docs-version';

import { AIChat } from "@/components/ai-chat";

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <>
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions()}
        sidebar={{
          banner: (
            <p className="rounded-lg border border-fd-border px-3 py-2 text-xs text-fd-muted-foreground">
              Docs for CLI{' '}
              <span className="font-mono text-fd-foreground">{DOCS_CLI_VERSION}</span>
            </p>
          ),
        }}
      >
        {children}
      </DocsLayout>
      <AIChat />
    </>
  );
}

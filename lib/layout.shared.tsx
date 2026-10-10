import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 text-fd-foreground">
          <img src="/logo.png" alt="" width={28} height={28} className="h-7 w-7 rounded-md object-cover" />
          Supercharge
        </span>
      ),
    },
  };
}

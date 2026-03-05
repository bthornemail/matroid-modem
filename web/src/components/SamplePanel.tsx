import type { ReactNode } from 'react';

type SamplePanelProps = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export default function SamplePanel({ title, subtitle, children }: SamplePanelProps) {
  return (
    <section
      style={{
        border: '1px solid #2a2f3a',
        borderRadius: 12,
        padding: 16,
        background: '#0f131a',
        color: '#d8deea',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>
      <p style={{ margin: '6px 0 14px', fontSize: 12, color: '#8f9bb3' }}>{subtitle}</p>
      {children}
    </section>
  );
}

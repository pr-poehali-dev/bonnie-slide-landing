import AICreator from "./AICreator";

// Светлая тема: кремовый фон, тёмно-бордовый текст, малиновый акцент
const LIGHT_THEME = `
  .ai-creator-light {
    --tw-bg-opacity: 1;
  }
  .ai-creator-light .bg-vibe-dark    { background-color: #f5f0e8 !important; }
  .ai-creator-light .bg-vibe-dark2   { background-color: #ede8df !important; }
  .ai-creator-light .bg-vibe-dark3   { background-color: #e0d9ce !important; }
  .ai-creator-light [class*="bg-vibe-dark3\\/"] { background-color: color-mix(in srgb, #e0d9ce var(--tw-bg-opacity, 100%), transparent) !important; }
  .ai-creator-light [class*="bg-vibe-dark\\/"]  { background-color: color-mix(in srgb, #f5f0e8 var(--tw-bg-opacity, 100%), transparent) !important; }

  .ai-creator-light .text-vibe-light  { color: #1a0a0a !important; }
  .ai-creator-light .text-vibe-muted  { color: #6b4c4c !important; }
  .ai-creator-light [class*="text-vibe-muted\\/"] { color: #6b4c4c !important; opacity: 0.7; }

  .ai-creator-light .border-vibe-dark3 { border-color: #c8bfb0 !important; }
  .ai-creator-light [class*="border-vibe-dark3\\/"] { border-color: #c8bfb0 !important; opacity: 0.6; }

  .ai-creator-light .bg-vibe-dark3\\/80  { background-color: rgba(224,217,206,0.8) !important; }
  .ai-creator-light .bg-vibe-dark3\\/60  { background-color: rgba(224,217,206,0.6) !important; }
  .ai-creator-light .bg-vibe-dark3\\/40  { background-color: rgba(224,217,206,0.4) !important; }
  .ai-creator-light .bg-vibe-dark\\/95   { background-color: rgba(245,240,232,0.95) !important; }

  /* Градиенты hero-карточек */
  .ai-creator-light .from-vibe-dark3  { --tw-gradient-from: #e0d9ce !important; }
  .ai-creator-light .via-vibe-dark3   { --tw-gradient-via: #e0d9ce !important; }
  .ai-creator-light .to-vibe-dark3    { --tw-gradient-to: #e0d9ce !important; }

  /* Бегущая строка */
  .ai-creator-light .border-y { border-color: #c8bfb0 !important; }

  /* placeholder */
  .ai-creator-light input::placeholder { color: rgba(107,76,76,0.5) !important; }

  /* Инпуты */
  .ai-creator-light input[type="text"],
  .ai-creator-light input[type="email"],
  .ai-creator-light input[type="tel"] {
    background-color: #f5f0e8 !important;
    border-color: #c8bfb0 !important;
    color: #1a0a0a !important;
  }

  /* Final CTA секция (bg-vibe-red) — оставить красной, но кнопку внутри перекрасить */
  .ai-creator-light section.bg-vibe-red button.bg-white {
    background-color: #1a0a0a !important;
    color: #ffffff !important;
  }

  /* Попап overlay */
  .ai-creator-light .bg-black\\/70 { background-color: rgba(26,10,10,0.5) !important; }

  /* Hover эффекты */
  .ai-creator-light .hover\\:text-vibe-light:hover { color: #1a0a0a !important; }

  /* Секции section-appear */
  .ai-creator-light .section-appear { }
`;

export default function AICreator2() {
  return (
    <>
      <style>{LIGHT_THEME}</style>
      <div className="ai-creator-light">
        <AICreator />
      </div>
    </>
  );
}

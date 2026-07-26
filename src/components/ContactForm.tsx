import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const TO_EMAIL = "vanshjangid1805@gmail.com";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = name.trim() && email.trim() && message.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const subject = `Portfolio message from ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    const mailto = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
    toast.success("Opening your email app…", {
      description: "Your message is ready to send — just hit send in your mail client.",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Your name">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            data-cursor="type"
            className="w-full border-b border-[var(--border)] bg-transparent py-3 font-display text-lg text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/80 focus:border-[var(--ink)]"
          />
        </Field>
        <Field label="Your email">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            data-cursor="type"
            className="w-full border-b border-[var(--border)] bg-transparent py-3 font-display text-lg text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/80 focus:border-[var(--ink)]"
          />
        </Field>
      </div>

      <Field label="Message">
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me a bit about what you're building…"
          rows={4}
          data-cursor="type"
          className="w-full resize-none border-b border-[var(--border)] bg-transparent py-3 font-display text-lg text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/80 focus:border-[var(--ink)]"
        />
      </Field>

      <div className="mt-2 flex items-center gap-4">
        <motion.button
          type="submit"
          disabled={!canSubmit}
          data-cursor="send"
          whileHover={canSubmit ? { y: -2 } : undefined}
          whileTap={canSubmit ? { scale: 0.97 } : undefined}
          className="inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--paper)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send message ↗
        </motion.button>
        {sent && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]"
          >
            Ready in your mail app ✦
          </motion.span>
        )}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/80">
        {label}
      </span>
      {children}
    </label>
  );
}

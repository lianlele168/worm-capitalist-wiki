"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { Check, CheckCheck, Clipboard, RotateCcw } from "lucide-react";
import { milestones } from "@/data/tasks";

type Filter = "all" | "remaining" | "done";
const storageKey = "worm-capitalist-demo-checklist-v1";

export default function TaskTracker() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
        if (Array.isArray(saved)) setCompleted(saved.filter((id) => Number.isInteger(id) && id >= 1 && id <= milestones.length));
      } catch {
        window.localStorage.removeItem(storageKey);
      }
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, ready]);

  const visibleTasks = useMemo(() => milestones.filter((task) => {
    if (filter === "done") return completed.includes(task.id);
    if (filter === "remaining") return !completed.includes(task.id);
    return true;
  }), [completed, filter]);

  const nextTask = milestones.find((task) => !completed.includes(task.id));
  const percent = Math.round((completed.length / milestones.length) * 100);

  function toggleTask(id: number) {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id].sort((a, b) => a - b));
  }

  async function copyRemaining() {
    const remaining = milestones.filter((task) => !completed.includes(task.id));
    const text = remaining.length
      ? `Worm Capitalist - remaining demo milestones\n${remaining.map((task) => `${task.id}. ${task.title} - ${task.requirement}`).join("\n")}`
      : "Worm Capitalist - all demo milestones checked!";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="tracker-shell">
      <div className="tracker-summary">
        <div>
          <p className="eyebrow">Saved in this browser</p>
          <h2>{completed.length} of {milestones.length} checked</h2>
          <p>{nextTask ? <>Next: <Link href={`/${nextTask.slug}/`}>{nextTask.title}</Link></> : "The demo loop is ready for a cleaner reset."}</p>
        </div>
        <div className="tracker-ring" style={{ "--progress": `${percent * 3.6}deg` } as CSSProperties} aria-label={`${percent}% complete`}>
          <span>{percent}%</span>
        </div>
      </div>

      <div className="progress-track" aria-hidden="true"><span style={{ width: `${percent}%` }} /></div>

      <div className="tracker-toolbar">
        <div className="segmented-control" aria-label="Filter tasks">
          {(["all", "remaining", "done"] as Filter[]).map((value) => (
            <button key={value} type="button" onClick={() => setFilter(value)} className={filter === value ? "active" : ""} aria-pressed={filter === value}>
              {value === "all" ? "All" : value === "remaining" ? "Remaining" : "Done"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setCompleted(milestones.map((task) => task.id))} className="icon-button" aria-label="Mark every milestone complete" title="Mark all complete"><CheckCheck className="h-4 w-4" /></button>
          <button type="button" onClick={() => setCompleted([])} className="icon-button" aria-label="Reset task progress" title="Reset progress"><RotateCcw className="h-4 w-4" /></button>
          <button type="button" onClick={copyRemaining} className="btn-secondary"><Clipboard className="h-4 w-4" />{copied ? "Copied" : "Copy remaining"}</button>
        </div>
      </div>

      <div className="tracker-list">
        {visibleTasks.map((task) => {
          const done = completed.includes(task.id);
          return (
            <div key={task.id} className={`tracker-task ${done ? "done" : ""}`}>
              <button type="button" onClick={() => toggleTask(task.id)} className="task-check" aria-label={`${done ? "Mark incomplete" : "Mark complete"}: ${task.title}`} aria-pressed={done}>
                {done ? <Check className="h-4 w-4" /> : null}
              </button>
              <span className="tracker-index">{String(task.id).padStart(2, "0")}</span>
              <div className="min-w-0">
                <Link href={`/${task.slug}/`}>{task.title}</Link>
                <p>{task.requirement} <span aria-hidden="true">/</span> {task.reward}</p>
              </div>
            </div>
          );
        })}
        {!visibleTasks.length ? <p className="tracker-empty">No milestones in this view.</p> : null}
      </div>
      <span className="sr-only" aria-live="polite">{copied ? "Remaining milestone list copied" : `${completed.length} of ${milestones.length} milestones checked`}</span>
    </div>
  );
}

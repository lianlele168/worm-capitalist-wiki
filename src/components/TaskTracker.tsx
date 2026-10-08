"use client";


import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { Check, CheckCheck, Clipboard, RotateCcw } from "lucide-react";
import { milestones } from "@/data/tasks";

type Filter = "all" | "remaining" | "done";
const storageKey = "worm-capitalist-observation-checklist-v2";

export default function TaskTracker() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [canPersist, setCanPersist] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
        if (!Array.isArray(saved) || saved.some(id => !Number.isInteger(id) || id < 1 || id > milestones.length)) throw new Error("Invalid saved checks");
        setCompleted([...new Set<number>(saved)]);
        setCanPersist(true);
      } catch {
        setStorageError(true);
      }
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (ready && canPersist) {
      const frame = window.requestAnimationFrame(() => {
        try { window.localStorage.setItem(storageKey, JSON.stringify(completed)); }
        catch { setStorageError(true); }
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, [completed, ready, canPersist]);

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
      ? `Worm Capitalist - remaining observation checks\n${remaining.map((task) => `${task.id}. ${task.title} - ${task.requirement}`).join("\n")}`
      : "Worm Capitalist - all observation checks complete!";
    try {
      await navigator.clipboard.writeText(text);
      setCopyError(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setCopyError(true); }
  }

  return (
    <div className="tracker-shell">
      <div className="tracker-summary">
        <div>
          <p className="eyebrow">{!ready ? "Loading saved checks…" : storageError ? "Session-only checks" : "Saved in this browser"}</p>
          <h2>{completed.length} of {milestones.length} checked</h2>
          <p>{nextTask ? <>Next: <strong>{nextTask.title}</strong></> : "All observation checks marked complete."}</p>
        </div>
        <div className="tracker-ring" style={{ "--progress": `${percent * 3.6}deg` } as CSSProperties} aria-label={`${percent}% complete`}>
          <span>{percent}%</span>
        </div>
      </div>

      <div className="progress-track" aria-hidden="true"><span style={{ width: `${percent}%` }} /></div>
      {storageError ? <p role="alert">Browser storage is unavailable or could not be read. Changes may be lost when you leave this page.</p> : null}
      {copyError ? <p role="alert">Copy failed. Select and copy the checklist text manually.</p> : null}

      <div className="tracker-toolbar">
        <div className="segmented-control" aria-label="Filter tasks">
          {(["all", "remaining", "done"] as Filter[]).map((value) => (
            <button key={value} type="button" onClick={() => setFilter(value)} className={filter === value ? "active" : ""} aria-pressed={filter === value}>
              {value === "all" ? "All" : value === "remaining" ? "Remaining" : "Done"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setCompleted(milestones.map((task) => task.id))} className="icon-button" aria-label="Mark every observation complete" title="Mark all complete"><CheckCheck className="h-4 w-4" /></button>
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
                <strong>{task.title}</strong>
                <p>{task.requirement} <span aria-hidden="true">/</span> {task.reward}</p>
              </div>
            </div>
          );
        })}
        {!visibleTasks.length ? <p className="tracker-empty">No observation checks in this view.</p> : null}
      </div>
      <span className="sr-only" aria-live="polite">{copied ? "Remaining observation list copied" : `${completed.length} of ${milestones.length} observation checks complete`}</span>
    </div>
  );
}

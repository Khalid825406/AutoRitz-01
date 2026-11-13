"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
  /** Optional label to identify the failing area in logs. */
  name?: string;
}

/** Catches render errors in its subtree and shows `fallback` instead of crashing the whole page. */
export default class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(`[${this.props.name ?? "ErrorBoundary"}] falling back:`, error.message, info.componentStack);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
